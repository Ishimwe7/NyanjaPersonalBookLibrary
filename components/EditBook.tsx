// src/components/EditBook.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Switch, Text, Snackbar } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { updateBook } from '../redux/slices/bookSlice';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

const EditBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId } = route.params as { bookId: number };

  const book = useAppSelector(state => 
    state.books.items.find(book => book.id === bookId)
  );

  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [rating, setRating] = useState(book?.rating.toString() || '');
  const [isRead, setIsRead] = useState(book?.isRead || false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    if (!book) {
      navigation.goBack();
    }
  }, [book, navigation]);

  const handleUpdateBook = () => {
    if (book && title && author && rating) {
      dispatch(updateBook({
        id: book.id,
        title,
        author,
        rating: parseInt(rating, 10),
        isRead,
      }));
      setSnackbarVisible(true);
    }
  };

  if (!book) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Author"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
      />
      <TextInput
        label="Rating (1-5)"
        value={rating}
        onChangeText={(text) => setRating(text.replace(/[^1-5]/g, ''))}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.switchContainer}>
        <Text>Read</Text>
        <Switch value={isRead} onValueChange={setIsRead} />
      </View>
      <Button mode="contained" onPress={handleUpdateBook} style={styles.button}>
        Update Book
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => navigation.goBack(),
        }}
      >
        Book updated successfully!
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default EditBook;