import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Paragraph } from 'react-native-paper';
import { Book } from '../redux/types';
import { useTheme } from './ThemeContext';

interface BookItemProps {
  book: Book;
  onPress: () => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, onPress }) => {
  const { theme } = useTheme();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={[styles[theme].star, { color: i <= rating ? 'gold' : 'gray' }]}
        >
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles[theme].card}>
        {book.image && <Card.Cover source={{ uri: book.image }} style={styles[theme].cover} />}
        <Card.Content>
          <Text style={styles[theme].title}>{book.title}</Text>
          <Paragraph style={styles[theme].paragraph}>by {book.author}</Paragraph>
          <View style={styles[theme].ratingContainer}>
            {renderStars(book.rating)}
          </View>
          <Text style={styles[theme].readStatus}>
            {book.isRead ? 'Read' : 'Unread'}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = {
  light: StyleSheet.create({
    card: {
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: '#fff',
    },
    cover: {
      height: 150,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    paragraph: {
      color: '#000',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    readStatus: {
      marginTop: 8,
      fontStyle: 'italic',
      color: '#000',
    },
    star: {
      marginHorizontal: 2,
      fontSize: 20,
    },
  }),
  dark: StyleSheet.create({
    card: {
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: '#333',
    },
    cover: {
      height: 150,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    paragraph: {
      color: '#fff',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    readStatus: {
      marginTop: 8,
      fontStyle: 'italic',
      color: '#ccc',
    },
    star: {
      marginHorizontal: 2,
      fontSize: 20,
    },
  })
};

export default BookItem;
