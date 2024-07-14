import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Dialog, Portal } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { deleteBook } from '../redux/slices/bookSlice';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type BookDetailRouteProp = RouteProp<{ BookDetail: { bookId: number } }, 'BookDetail'>;
const BookDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute<BookDetailRouteProp>();;
  const { bookId } = route.params as { bookId: number };
    
  const book = useAppSelector(state => 
    state.books.items.find(book => book.id === bookId)
  );

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const handleDelete = () => {
    if (book) {
      dispatch(deleteBook(book.id));
      navigation.goBack();
    }
  };

  if (!book) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}/5</Text>
      <Text style={styles.status}>Status: {book.isRead ? 'Read' : 'Unread'}</Text>
      
      {/* <Button mode="contained" onPress={() => navigation.navigate('EditBook', { bookId: book.id })} style={styles.button}>
        Edit Book
      </Button> */}
      
      <Button mode="outlined" color="red" onPress={() => setDeleteDialogVisible(true)} style={styles.button}>
        Delete Book
      </Button>

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
});

export default BookDetail;