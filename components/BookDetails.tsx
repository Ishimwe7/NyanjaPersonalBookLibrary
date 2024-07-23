import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Button, Dialog, Portal, TextInput, Switch } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { deleteBook, readBook, updateBook } from '../redux/slices/bookSlice';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useTheme } from './ThemeContext';

type BookDetailRouteProp = RouteProp<{ BookDetail: { bookId: number } }, 'BookDetail'>;

const BookDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute<BookDetailRouteProp>();
  const { bookId } = route.params || {};
  const book = useAppSelector(state => state.books.items.find(book => book.id === bookId));
  const { theme } = useTheme();

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [rating, setRating] = useState(book?.rating.toString() || '0');
  const [image, setImage] = useState(book?.image || '');
  const [isRead, setIsRead] = useState(book?.isRead || false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [authorError, setAuthorError] = useState<string | null>(null);
  const [ratingError, setRatingError] = useState<string | null>(null);

  const validateInputs = () => {
    let isValid = true;

    if (title.trim() === '') {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (author.trim() === '') {
      setAuthorError('Author is required');
      isValid = false;
    } else {
      setAuthorError(null);
    }

    const ratingNumber = parseInt(rating, 10);
    if (ratingNumber < 0 || ratingNumber > 5 || isNaN(ratingNumber)) {
      setRatingError('Rating must be between 0 and 5');
      isValid = false;
    } else {
      setRatingError(null);
    }

    return isValid;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={[ { color: i <= rating ? 'gold' : 'gray' }]}
        >
          ★
        </Text>
      );
    }
    return stars;
  };

  const handleDelete = () => {
    if (book) {
      dispatch(deleteBook(book.id));
      navigation.goBack();
    }
  };

  const handleSave = () => {
    if (validateInputs()) {
      if (book) {
        dispatch(updateBook({ id: book.id, title, author, rating: parseInt(rating, 10), isRead, image }))
          .unwrap()
          .then(() => {
            Toast.show({
              type: 'success',
              position: 'bottom',
              text1: 'Update Successful',
              text2: 'The book details have been updated successfully.',
            });
            setEditDialogVisible(false);
          })
          .catch(() => {
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: 'Update Failed',
              text2: 'Failed to update the book details.',
            });
          });
      }
    }
  };

  const handleToggleReadStatus = () => {
    if (book) {
      const updatedBook = { ...book, isRead: !book.isRead };
      dispatch(readBook(updatedBook));
      setIsRead(updatedBook.isRead);
    }
  };

  if (!book) return null;

  return (
    <ScrollView contentContainerStyle={styles[theme].container}>
      {book.image && <Image source={{ uri: book.image }} style={styles[theme].image} />}
      <Text style={styles[theme].title}>{book.title}</Text>
      <Text style={styles[theme].author}>by {book.author}</Text>
      <Text style={styles[theme].rating}>Rating: {book.rating}/5</Text>
      <Text>{renderStars(book.rating)}</Text>
      <Text style={styles[theme].status}>Status: {book.isRead ? 'Read' : 'Unread'}</Text>

      <View style={styles[theme].switchContainer}>
        <Text style={styles[theme].text}>{book.isRead ? 'Mark as unread' : 'Mark as read'}</Text>
        <Switch
          value={isRead}
          onValueChange={handleToggleReadStatus}
          color={theme === 'light' ? '#000' : '#fff'}
        />
      </View>

      <Button
        mode="contained"
        onPress={() => setEditDialogVisible(true)}
        style={styles[theme].button}
      >
        Edit Book
      </Button>
      <Button
        mode="outlined"
        onPress={() => setDeleteDialogVisible(true)}
        style={[styles[theme].button, styles[theme].deleteButton]}
      >
        Delete Book
      </Button>

      <Portal>
        <Dialog visible={editDialogVisible} onDismiss={() => setEditDialogVisible(false)}>
          <Dialog.Title>Edit Book</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              style={styles[theme].input}
              textColor={theme=='light'?'#000':'#fff'}
              theme={{
                colors: {
                  primary: theme === 'light' ? '#000' : '#fff',
                  text: theme === 'light' ? '#000' : '#fff',
                  placeholder: theme === 'light' ? '#000' : '#fff',
                  background: theme === 'light' ? '#fff' : '#000',
                  outline: theme === 'light' ? '#000' : '#fff',
                }
              }}
              error={!!titleError}
            />
            {titleError && <Text style={styles[theme].errorText}>{titleError}</Text>}
            <TextInput
              label="Author"
              value={author}
              onChangeText={setAuthor}
              style={styles[theme].input}
              textColor={theme=='light'?'#000':'#fff'}
              theme={{
                colors: {
                  primary: theme === 'light' ? '#000' : '#fff',
                  text: theme === 'light' ? '#000' : '#fff',
                  placeholder: theme === 'light' ? '#000' : '#fff',
                  background: theme === 'light' ? '#fff' : '#000',
                  outline: theme === 'light' ? '#000' : '#fff',
                }
              }}
              error={!!authorError}
            />
            {authorError && <Text style={styles[theme].errorText}>{authorError}</Text>}
            <TextInput
              label="Rating"
              keyboardType="numeric"
              value={rating}
              textColor={theme=='light'?'#000':'#fff'}
              onChangeText={(text) => setRating(text.replace(/[^0-5]/g, ''))}
              style={styles[theme].input}
              theme={{
                colors: {
                  primary: theme === 'light' ? '#000' : '#fff',
                  text: theme === 'light' ? '#000' : '#fff',
                  placeholder: theme === 'light' ? '#000' : '#fff',
                  background: theme === 'light' ? '#fff' : '#000',
                  outline: theme === 'light' ? '#000' : '#fff',
                }
              }}
              error={!!ratingError}
            />
            {ratingError && <Text style={styles[theme].errorText}>{ratingError}</Text>}
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor={theme=='light'?'#fff':'#000'} onPress={() => setEditDialogVisible(false)}>Cancel</Button>
            <Button textColor={theme=='light'?'#fff':'#000'} onPress={handleSave}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>Delete Book</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this book?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor={theme=='light'?'#fff':'#000'} onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
            <Button textColor={theme=='light'?'#fff':'#000'} onPress={handleDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = {
  light: StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#000',
    },
    author: {
      fontSize: 18,
      marginBottom: 8,
      color: '#000',
    },
    rating: {
      fontSize: 16,
      marginBottom: 8,
      color: '#000',
    },
    status: {
      fontSize: 16,
      marginBottom: 16,
      color: '#000',
    },
    star: {
      marginHorizontal: 2,
      fontSize: 20,
    },
    button: {
      marginTop: 16,
    },
    deleteButton: {
      borderColor: 'red',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    input: {
      marginBottom: 12,
      padding: 8,
      backgroundColor: '#fff',
    },
    errorText: {
      color: 'red',
      marginBottom: 8,
    },
    image: {
      width: 100,
      height: 100,
      marginVertical: 16,
      alignSelf: 'center',
      borderRadius:50
    },
    text: {
      color: '#000',
    },
    starContainer: {
      flexDirection: 'row',
      marginBottom: 8,
    },
  }),
  dark: StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#000',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#fff',
    },
    author: {
      fontSize: 18,
      marginBottom: 8,
      color: '#fff',
    },
    rating: {
      fontSize: 16,
      marginBottom: 8,
      color: '#fff',
    },
    status: {
      fontSize: 16,
      marginBottom: 16,
      color: '#fff',
    },
    star: {
      marginHorizontal: 2,
      fontSize: 20,
    },
    button: {
      marginTop: 16,
    },
    deleteButton: {
      borderColor: 'red',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    input: {
      marginBottom: 12,
      padding: 8,
      backgroundColor: '#000',
    },
    errorText: {
      color: 'red',
      marginBottom: 8,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginVertical: 16,
      alignSelf: 'center',
    },
    text: {
      color: '#fff',
    },
    starContainer: {
      flexDirection: 'row',
      marginBottom: 8,
    },
  }),
};

export default BookDetail;
