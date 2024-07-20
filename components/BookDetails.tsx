import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Dialog, Portal, TextInput, Switch } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { deleteBook, readBook, updateBook } from '../redux/slices/bookSlice';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

type BookDetailRouteProp = RouteProp<{ BookDetail: { bookId: number } }, 'BookDetail'>;
const BookDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute<BookDetailRouteProp>();
  const { bookId } = route.params|| {};
  const book = useAppSelector(state => 
    state.books.items.find(book => book.id === bookId)
  );

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [rating, setRating] = useState(book?.rating || 0);
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

  if (rating < 0 || rating > 5) {
    setRatingError('Rating must be between 0 and 5');
    isValid = false;
  } else {
    setRatingError(null);
  }

  return isValid;
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
        dispatch(updateBook({ id: book.id, title, author, rating, isRead }))
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
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}/5</Text>
      <Text style={styles.status}>Status: {book.isRead ? 'Read' : 'Unread'}</Text>
      
      <View style={styles.switchContainer}>
        <Text>{book.isRead ? 'Mark as unread':'Mark as read' }</Text>
        <Switch value={isRead} onValueChange={handleToggleReadStatus} />
      </View>

      <Button mode="contained" onPress={() => setEditDialogVisible(true)} style={styles.button}>
        Edit Book
      </Button>
      <Button mode="outlined" color="red" onPress={() => setDeleteDialogVisible(true)} style={styles.button}>
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
              style={styles.input}
              error={!!titleError}
            />
             {titleError && <Text style={styles.errorText}>{titleError}</Text>}
            <TextInput
              label="Author"
              value={author}
              onChangeText={setAuthor}
              style={styles.input}
               error={!!authorError}
            />
             {authorError && <Text style={styles.errorText}>{authorError}</Text>}
            <TextInput
              label="Rating"
              keyboardType="numeric"
              value={rating.toString()}
              onChangeText={text => setRating(Number(text))}
              style={styles.input}
               error={!!ratingError}
            />
              {ratingError && <Text style={styles.errorText}>{ratingError}</Text>}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleSave}>Save</Button>
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
            <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap:0,
    marginBottom: 16,
  },
   input: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: 'white',
  },
   errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default BookDetail;