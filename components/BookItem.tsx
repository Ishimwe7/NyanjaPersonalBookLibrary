// src/components/BookItem.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Paragraph, IconButton } from 'react-native-paper';
import { Book } from '../redux/types';

interface BookItemProps {
  book: Book;
  onPress: () => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, onPress }) => {
    const renderStars = (rating: number) => {
    const stars = [];
     for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={[styles.star, { color: i <= rating ? 'gold' : 'gray' }]} 
        >
          ★
        </Text>
      );
    }
    return stars;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        {book.image && <Card.Cover source={{ uri: book.image }} style={styles.cover} />}
        <Card.Content>
          <Text style={styles.title}>{book.title}</Text>
          <Paragraph>by {book.author}</Paragraph>
          <View style={styles.ratingContainer}>
            {/* <IconButton icon="star" size={16} /> */}
             {renderStars(book.rating)}
            {/* <Text>{book.rating}/5</Text> */}
          </View>
          <Text style={styles.readStatus}>
            {book.isRead ? 'Read' : 'Unread'}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cover: {
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readStatus: {
    marginTop: 8,
    fontStyle: 'italic',
  },
   star: {
     marginHorizontal: 2,
     fontSize: 26
  },
});

export default BookItem;