import React, { useEffect, useRef } from 'react';
import { 
  FlatList, 
  ListRenderItem, 
  Text, 
  View, 
  StyleSheet, 
  Animated, 
  Easing,
  Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Book } from '../redux/types';
import BookItem from './BookItem';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchBooks } from '../redux/slices/bookSlice';
import { AppDispatch } from '../redux/store';

type BookListProps = {
  navigation: StackNavigationProp<any, any>;
};

const { width } = Dimensions.get('window');

const BookList: React.FC<BookListProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: books, status, error } = useSelector((state: RootState) => state.books);
  const sortBy = useSelector((state: RootState) => state.settings.sortBy);

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

  const renderItem: ListRenderItem<Book> = ({ item }) => (
    <BookItem book={item} onPress={() => navigation.navigate('Book Details', { bookId: item.id })} />
  );

  if (status === 'loading') {
    return (
      <View style={styles.centerContainer}>
        <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.loadingText}>Loading books...</Text>
          <View style={styles.bookStack}>
            {[...Array(3)].map((_, index) => (
              <Animated.View 
                key={index} 
                style={[
                  styles.fakeBook, 
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
      <View style={styles.centerContainer}>
        <Animated.View style={[styles.errorContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.errorText}>Oops! An error occurred</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </Animated.View>
      </View>
    );
  }

  if (books.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Animated.View style={[styles.emptyContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.emptyText}>No books found</Text>
          <Text style={styles.emptySubtext}>Try adding some books to your library!</Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <FlatList
        data={sortedBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default BookList;