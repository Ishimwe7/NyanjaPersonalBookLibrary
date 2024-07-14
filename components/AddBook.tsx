import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Switch, Text, Snackbar } from 'react-native-paper';
import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { addBook } from '../redux/slices/bookSlice'
import { useNavigation } from '@react-navigation/native';

const AddBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const [isRead, setIsRead] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleAddBook = () => {
    if (title && author && rating) {
      dispatch(addBook({
        title,
        author,
        rating: parseInt(rating, 10),
        isRead,
      }));
      setSnackbarVisible(true);
      // Reset form
      setTitle('');
      setAuthor('');
      setRating('');
      setIsRead(false);
    }
  };

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
      <Button mode="contained" onPress={handleAddBook} style={styles.button}>
        Add Book
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
        Book added successfully!
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

export default AddBook;