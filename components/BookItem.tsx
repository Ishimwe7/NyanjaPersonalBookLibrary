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
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{book.title}</Text>
          <Paragraph>by {book.author}</Paragraph>
          <View style={styles.ratingContainer}>
            <IconButton icon="star" size={16} />
            <Text>{book.rating}/5</Text>
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
});

export default BookItem;