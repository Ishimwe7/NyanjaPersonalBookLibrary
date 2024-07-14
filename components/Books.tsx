// // ExampleComponent.tsx
// import React, { useEffect } from 'react';
// import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { addBook, updateBook, deleteBook, getBooks } from '../redux/actionCreators'; // Correct path to actionCreators
// import { BookState, Book } from '../redux/types';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useAppSelector } from '../redux/hooks';

// const Books: React.FC = () => {
//   const dispatch = useDispatch();
//   const books = useAppSelector((state: { books: BookState }) => state.books.books);

//   useEffect(() => {
//     const fetchedBooks: Book[] = [
//       { id: '1', title: 'Book 1', author: 'Author 1', rating: 5, read: true },oks
//     ];
//     dispatch(getBooks(fetchedBooks));
//   }, [dispatch]);

//   const handleAddBook = () => {
//     const newBook: Book = { id: '2', title: 'New Book', author: 'New Author', rating: 4, read: false };
//     dispatch(addBook(newBook));
//   };

//   const handleUpdateBook = () => {
//     const updatedBook: Book = { id: '2', title: 'Updated Book', author: 'Updated Author', rating: 5, read: true };
//     dispatch(updateBook(updatedBook));
//   };

//   const handleDeleteBook = () => {
//     dispatch(deleteBook('2'));
//   };

//   const renderItem = ({ item }: { item: Book }) => (
//     <View style={styles.bookItem}>
//       <Icon name="book" size={30} color="#000" />
//       <Text style={styles.bookText}>{item.title} by {item.author}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
//         <Icon name="add" size={30} color="#fff" />
//         <Text style={styles.addButtonText}>Add Book</Text>
//       </TouchableOpacity>
//       <FlatList
//         data={books}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   bookItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   bookText: {
//     marginLeft: 10,
//     fontSize: 18,
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   addButtonText: {
//     color: '#fff',
//     marginLeft: 5,
//     fontSize: 18,
//   },
// });

// export default Books;


// src/components/BookList.tsx
import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, Book } from '../redux/types';
import BookItem from './BookItem';
import { StackNavigationProp } from '@react-navigation/stack';

type BookListProps = {
  navigation: StackNavigationProp<any, any>;
};

const BookList: React.FC<BookListProps> = ({ navigation }) => {
  const books = useSelector((state: RootState) => state.books.items);
  const sortBy = useSelector((state: RootState) => state.settings.sortBy);

  const sortedBooks = [...books].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'author') {
      return a.author.localeCompare(b.author);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });
  console.log(books);
  const renderItem: ListRenderItem<Book> = ({ item }) => (
    <BookItem book={item} onPress={() => navigation.navigate('BookDetail', { bookId: item.id })} />
  );

  return (
    <FlatList
      data={sortedBooks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default BookList;