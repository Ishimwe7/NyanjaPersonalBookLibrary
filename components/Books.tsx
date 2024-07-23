// import React, { useEffect, useRef, useContext } from 'react';
// import {
//   FlatList,
//   ListRenderItem,
//   Text,
//   View,
//   StyleSheet,
//   Animated,
//   Easing,
//   Dimensions
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, Book } from '../redux/types';
// import BookItem from './BookItem';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { fetchBooks } from '../redux/slices/bookSlice';
// import { AppDispatch } from '../redux/store';
// import { useTheme } from './ThemeContext';

// type BookListProps = {
//   navigation: StackNavigationProp<any, any>;
// };

// const { width } = Dimensions.get('window');

// const BookList: React.FC<BookListProps> = ({ navigation }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items: books, status, error } = useSelector((state: RootState) => state.books);
//   const sortBy = useSelector((state: RootState) => state.settings.sortBy);
//   const { theme } = useTheme();

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.9)).current;

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchBooks());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1,
//         duration: 500,
//         easing: Easing.bounce,
//         useNativeDriver: true,
//       })
//     ]).start();
//   }, [fadeAnim, scaleAnim]);

//   const sortedBooks = [...books].sort((a, b) => {
//     if (sortBy === 'title') {
//       return a.title.localeCompare(b.title);
//     } else if (sortBy === 'author') {
//       return a.author.localeCompare(b.author);
//     } else if (sortBy === 'rating') {
//       return b.rating - a.rating;
//     }
//     return 0;
//   });
  

//   const renderItem: ListRenderItem<Book> = ({ item }) => (
//     <BookItem book={item} onPress={() => navigation.navigate('Book Details', { bookId: item.id })} />
//   );

//   if (status === 'loading') {
//     return (
//       <View style={styles[theme].centerContainer}>
//         <Animated.View style={[styles[theme].loadingContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
//           <Text style={styles[theme].loadingText}>Loading books...</Text>
//           <View style={styles[theme].bookStack}>
//             {[...Array(3)].map((_, index) => (
//               <Animated.View
//                 key={index}
//                 style={[
//                   styles[theme].fakeBook,
//                   {
//                     transform: [
//                       { translateY: Animated.multiply(scaleAnim, new Animated.Value(-10 * index)) },
//                       { scale: Animated.add(scaleAnim, new Animated.Value(-0.1 * index)) }
//                     ]
//                   }
//                 ]}
//               />
//             ))}
//           </View>
//         </Animated.View>
//       </View>
//     );
//   }

//   if (status === 'failed') {
//     return (
//       <View style={styles[theme].centerContainer}>
//         <Animated.View style={[styles[theme].errorContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
//           <Text style={styles[theme].errorText}>Oops! An error occurred</Text>
//           <Text style={styles[theme].errorMessage}>{error}</Text>
//         </Animated.View>
//       </View>
//     );
//   }

//   if (books.length === 0) {
//     return (
//       <View style={styles[theme].centerContainer}>
//         <Animated.View style={[styles[theme].emptyContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
//           <Text style={styles[theme].emptyText}>No books found</Text>
//           <Text style={styles[theme].emptySubtext}>Try adding some books to your library!</Text>
//         </Animated.View>
//       </View>
//     );
//   }

//   return (
//     <Animated.View style={{ opacity: fadeAnim }}>
//       <FlatList
//         data={sortedBooks}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles[theme].listContainer}
//       />
//     </Animated.View>
//   );
// };

// const styles = {
//   light: StyleSheet.create({
//     centerContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#f5f5f5',
//     },
//     loadingContainer: {
//       alignItems: 'center',
//     },
//     loadingText: {
//       fontSize: 18,
//       marginBottom: 20,
//       color: '#333',
//     },
//     bookStack: {
//       alignItems: 'center',
//     },
//     fakeBook: {
//       width: 100,
//       height: 150,
//       backgroundColor: '#3498db',
//       borderRadius: 10,
//       marginBottom: -130,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.3,
//       shadowRadius: 3,
//       elevation: 5,
//     },
//     errorContainer: {
//       padding: 20,
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     errorText: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       color: '#e74c3c',
//       marginBottom: 10,
//     },
//     errorMessage: {
//       fontSize: 16,
//       color: '#7f8c8d',
//       textAlign: 'center',
//     },
//     emptyContainer: {
//       padding: 20,
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     emptyText: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       color: '#34495e',
//       marginBottom: 10,
//     },
//     emptySubtext: {
//       fontSize: 16,
//       color: '#7f8c8d',
//       textAlign: 'center',
//     },
//     listContainer: {
//       padding: 10,
//     },
//   }),
//   dark: StyleSheet.create({
//     centerContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#1e1e1e',
//     },
//     loadingContainer: {
//       alignItems: 'center',
//     },
//     loadingText: {
//       fontSize: 18,
//       marginBottom: 20,
//       color: '#ccc',
//     },
//     bookStack: {
//       alignItems: 'center',
//     },
//     fakeBook: {
//       width: 100,
//       height: 150,
//       backgroundColor: '#4b4b4b',
//       borderRadius: 10,
//       marginBottom: -130,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.3,
//       shadowRadius: 3,
//       elevation: 5,
//     },
//     errorContainer: {
//       padding: 20,
//       backgroundColor: '#333',
//       borderRadius: 10,
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     errorText: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       color: '#e74c3c',
//       marginBottom: 10,
//     },
//     errorMessage: {
//       fontSize: 16,
//       color: '#bbb',
//       textAlign: 'center',
//     },
//     emptyContainer: {
//       padding: 20,
//       backgroundColor: '#333',
//       borderRadius: 10,
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     emptyText: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       color: '#bbb',
//       marginBottom: 10,
//     },
//     emptySubtext: {
//       fontSize: 16,
//       color: '#888',
//       textAlign: 'center',
//     },
//     listContainer: {
//       padding: 10,
//     },
//   })
// };

// export default BookList;

import React, { useEffect, useRef, useState } from 'react';
import { 
  FlatList, 
  ListRenderItem, 
  Text, 
  View, 
  StyleSheet, 
  Animated, 
  Easing,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Book } from '../redux/types';
import BookItem from './BookItem';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchBooks } from '../redux/slices/bookSlice';
import { AppDispatch } from '../redux/store';
import { useTheme } from './ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

type BookListProps = {
  navigation: StackNavigationProp<any, any>;
};

const { width } = Dimensions.get('window');

const BookList: React.FC<BookListProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: books, status, error } = useSelector((state: RootState) => state.books);
  const sortBy = useSelector((state: RootState) => state.settings.sortBy);
  const { theme } = useTheme();

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.bounce,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, scaleAnim]);

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

  const filteredBooks = sortedBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem: ListRenderItem<Book> = ({ item }) => (
    <BookItem book={item} onPress={() => navigation.navigate('Book Details', { bookId: item.id })} />
  );

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <View style={styles[theme].centerContainer}>
          <Animated.View style={[styles[theme].loadingContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles[theme].loadingText}>Loading books...</Text>
            <View style={styles[theme].bookStack}>
              {[...Array(3)].map((_, index) => (
                <Animated.View 
                  key={index} 
                  style={[
                    styles[theme].fakeBook, 
                    { 
                      transform: [
                        { translateY: Animated.multiply(scaleAnim, new Animated.Value(-10 * index)) },
                        { scale: Animated.add(scaleAnim, new Animated.Value(-0.1 * index)) }
                      ] 
                    }
                  ]} 
                />
              ))}
            </View>
          </Animated.View>
        </View>
      );
    }

    if (status === 'failed') {
      return (
        <View style={styles[theme].centerContainer}>
          <Animated.View style={[styles[theme].errorContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles[theme].errorText}>Oops! An error occurred</Text>
            <Text style={styles[theme].errorMessage}>{error}</Text>
          </Animated.View>
        </View>
      );
    }

    if (filteredBooks.length === 0) {
      return (
        <View style={styles[theme].centerContainer}>
          <Animated.View style={[styles[theme].emptyContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles[theme].emptyText}>No books found</Text>
            <Text style={styles[theme].emptySubtext}>Try adding some books to your library!</Text>
          </Animated.View>
        </View>
      );
    }

    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <FlatList
          data={filteredBooks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles[theme].listContainer}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles[theme].container}>
      <View style={styles[theme].header}>
        <Text style={styles[theme].headerTitle}></Text>
        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
          <Icon name="search" size={24} color={theme === 'light' ? '#000' : '#fff'} />
        </TouchableOpacity>
      </View>
      {searchVisible && (
        <TextInput
          style={styles[theme].searchInput}
          placeholder="Search books..."
          placeholderTextColor={theme === 'light' ? '#aaa' : '#555'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
      {renderContent()}
    </View>
  );
};

const styles = {
  light: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      paddingBottom:60
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    searchInput: {
      padding: 10,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 18,
      marginBottom: 20,
      color: '#333',
    },
    bookStack: {
      alignItems: 'center',
    },
    fakeBook: {
      width: 100,
      height: 150,
      backgroundColor: '#3498db',
      borderRadius: 10,
      marginBottom: -130,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    errorContainer: {
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    errorText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#e74c3c',
      marginBottom: 10,
    },
    errorMessage: {
      fontSize: 16,
      color: '#7f8c8d',
      textAlign: 'center',
    },
    emptyContainer: {
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    emptyText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#34495e',
      marginBottom: 10,
    },
    emptySubtext: {
      fontSize: 16,
      color: '#7f8c8d',
      textAlign: 'center',
    },
    listContainer: {
      padding: 10,
      flexGrow: 1,
    },
  }),
  dark: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e1e1e',
      paddingBottom:60
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#333',
      borderBottomWidth: 1,
      borderBottomColor: '#555',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ccc',
    },
    searchInput: {
      padding: 10,
      backgroundColor: '#333',
      borderBottomWidth: 1,
      borderBottomColor: '#555',
      color: '#ccc',
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1e1e1e',
    },
    loadingContainer: {
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 18,
      marginBottom: 20,
      color: '#ccc',
    },
    bookStack: {
      alignItems: 'center',
    },
    fakeBook: {
      width: 100,
      height: 150,
      backgroundColor: '#4b4b4b',
      borderRadius: 10,
      marginBottom: -130,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    errorContainer: {
      padding: 20,
      backgroundColor: '#333',
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    errorText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#e74c3c',
      marginBottom: 10,
    },
    errorMessage: {
      fontSize: 16,
      color: '#bbb',
      textAlign: 'center',
    },
    emptyContainer: {
      padding: 20,
      backgroundColor: '#333',
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    emptyText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#bbb',
      marginBottom: 10,
    },
    emptySubtext: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
    },
    listContainer: {
      padding: 10,
      flexGrow: 1,
    },
  })
};

export default BookList;
