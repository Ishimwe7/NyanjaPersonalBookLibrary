import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image , Button as RNButton} from 'react-native';
import { TextInput, Button, Switch, Text} from 'react-native-paper';
import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { addBook } from '../redux/slices/bookSlice'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const [isRead, setIsRead] = useState(false);
  const [image, setImage] = useState<string | null>(null);
 
  const handleAddBook = async () => {
    if (title && author && rating) {
      try {
        await dispatch(addBook({
          title,
          author,
          rating: parseInt(rating, 10),
          isRead,
          image
        })).unwrap();
        Toast.show({
          type: 'success',
          text1: 'Book added successfully!',
          position: 'bottom',
          onHide: () => navigation.goBack(),
        });
        setTitle('');
        setAuthor('');
        setRating('');
        setIsRead(false);
      } catch (error) {
        console.error('Failed to add book:', error);
        Toast.show({
          type: 'error',
          text1: 'Failed to add book',
          position: 'bottom',
        });
      }
    }
  };
    const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
       <Button
        mode="contained"
        onPress={handleSelectImage}
        icon={() => <Ionicons name="image" size={20} color="white" />}
        
      >
        Select Image
      </Button>
      {image&& <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.switchContainer}>
        <Text>Read</Text>
        <Switch value={isRead} onValueChange={setIsRead} />
      </View>
      <Button mode="contained" onPress={handleAddBook} style={styles.button}>
        Add Book
      </Button>
      <Toast />
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
    image: {
    width: 100,
    height: 100,
    borderRadius:50,
    marginVertical: 16,
    alignSelf: 'center',
  },
});

export default AddBook;