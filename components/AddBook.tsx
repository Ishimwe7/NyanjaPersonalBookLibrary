import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { TextInput, Button, Switch, Text } from 'react-native-paper';
import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { addBook } from '../redux/slices/bookSlice';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from './ThemeContext';

const AddBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { theme } = useTheme();

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
          image,
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
        setImage(null);
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
    <ScrollView contentContainerStyle={styles[theme].container}>
      <Text style={styles[theme].title}>Add new Book</Text>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        textColor={theme=='light'?'#000':'#fff'}
        style={styles[theme].input}
        theme={{
          colors: {
            primary: theme === 'light' ? '#000' : '#fff',
            text: theme === 'light' ? '#000' : '#fff',
            placeholder: theme === 'light' ? '#000' : '#fff',
            background: theme === 'light' ? '#fff' : '#000',
            outline: theme === 'light' ? '#000' : '#fff',
          }
        }}
      />
      <TextInput
        label="Author"
        value={author}
        onChangeText={setAuthor}
        textColor={theme=='light'?'#000':'#fff'}
        style={styles[theme].input}
        theme={{
          colors: {
            primary: theme === 'light' ? '#000' : '#fff',
            text: theme === 'light' ? '#000' : '#fff',
            placeholder: theme === 'light' ? '#000' : '#fff',
            background: theme === 'light' ? '#fff' : '#000',
            outline: theme === 'light' ? '#000' : '#fff',
          }
        }}
      />
      <TextInput
        label="Rating (1-5)"
        value={rating}
        onChangeText={(text) => setRating(text.replace(/[^1-5]/g, ''))}
        keyboardType="numeric"
        textColor={theme=='light'?'#000':'#fff'}
        style={styles[theme].input}
        theme={{
          colors: {
            primary: theme === 'light' ? '#000' : '#fff',
            text: theme === 'light' ? '#000' : '#fff',
            placeholder: theme === 'light' ? '#000' : '#fff',
            background: theme === 'light' ? '#fff' : '#000',
            outline: theme === 'light' ? '#000' : '#fff',
          }
        }}
      />
      <Button
        mode="contained"
        onPress={handleSelectImage}
        icon={() => <Ionicons name="image" size={20} color={theme === 'light' ? '#fff' : '#000'} />}
        style={styles[theme].button}
        textColor={theme === 'light' ? '#fff' : '#000'} 
      >
        Select Image
      </Button>
      {image && <Image source={{ uri: image }} style={styles[theme].image} />}
      <View style={styles[theme].switchContainer}>
        <Text style={styles[theme].text}>Read</Text>
        <Switch value={isRead} onValueChange={setIsRead} color={theme === 'light' ? '#000' : '#fff'} />
      </View>
      <Button
        mode="contained"
        onPress={handleAddBook}
        style={styles[theme].button}
        textColor={theme === 'light' ? '#fff' : '#000'} 
      >
        Add Book
      </Button>
      <Toast />
    </ScrollView>
  );
};

const styles = {
  light: StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      padding: 16,
      paddingTop:40
    },
    input: {
      marginBottom: 16,
      backgroundColor: '#fff',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    button: {
      marginTop: 16,
      backgroundColor: '#000',
    },
    text: {
      color: '#000',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginVertical: 16,
      alignSelf: 'center',
    },
    title: {
    fontSize: 24, 
    textAlign:'center',
    fontWeight: 'bold', 
    padding:20,
    color:'#000'
     
  },
  }),
  dark: StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#000',
      padding: 16,
      paddingTop:40
    },
    input: {
      marginBottom: 16,
      backgroundColor: '#333',
      color: '#fff',
      borderColor: '#fff',
      borderWidth: 1,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    button: {
      marginTop: 16,
      backgroundColor: '#fff',
      color: '#fff',
    },
    text: {
      color: '#fff',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginVertical: 16,
      alignSelf: 'center',
    },
    title: {
    fontSize: 24, 
    textAlign:'center',
    fontWeight: 'bold', 
    padding:20,
    color:'#fff'
  },
  }),
};

export default AddBook;
