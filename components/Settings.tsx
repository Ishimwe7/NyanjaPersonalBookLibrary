import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { List, Switch } from 'react-native-paper';
import { setSortBy, setTheme } from '../redux/slices/settingsSlice';
import { RootState } from '../redux/types';
import { useTheme } from './ThemeContext';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state: RootState) => state.settings);

  const handleSortByChange = (newSortBy: 'title' | 'author' | 'rating') => {
    dispatch(setSortBy(newSortBy));
  };

  const handleThemeChange = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
    toggleTheme();
  };

  return (
    <View style={styles[theme].container}>
      <Text style={styles[theme].title}>Settings</Text>
      <List.Section>
        <List.Subheader style={styles[theme].text}>Sort books by</List.Subheader>
        <List.Item
          title="Title"
          titleStyle={styles[theme].listItemText}
          left={() => <List.Icon icon="sort-alphabetical-ascending" color={styles[theme].text.color} />}
          onPress={() => handleSortByChange('title')}
          right={() => sortBy === 'title' && <List.Icon icon="check" color={styles[theme].text.color} />}
        />
        <List.Item
          title="Author"
          titleStyle={styles[theme].listItemText}
          left={() => <List.Icon icon="account" color={styles[theme].text.color} />}
          onPress={() => handleSortByChange('author')}
          right={() => sortBy === 'author' && <List.Icon icon="check" color={styles[theme].text.color} />}
        />
        <List.Item
          title="Rating"
          titleStyle={styles[theme].listItemText}
          left={() => <List.Icon icon="star" color={styles[theme].text.color} />}
          onPress={() => handleSortByChange('rating')}
          right={() => sortBy === 'rating' && <List.Icon icon="check" color={styles[theme].text.color} />}
        />
      </List.Section>

      <View style={styles[theme].themeToggler}>
        <Text style={styles[theme].text}>
          {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
        </Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={handleThemeChange}
          trackColor={{ false: "#767577", true: "#81b0ff" }} 
          thumbColor={theme === 'dark' ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = {
  light: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    themeToggler: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 10,
      marginTop: 16,
    },
    text: {
      color: '#000',
    },
    listItemText: {
      color:'#000',
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
      flex: 1,
      backgroundColor: '#000',
      padding: 16,
    },
    themeToggler: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 10,
      marginTop: 16,
    },
    text: {
      color: '#fff',
    },
    listItemText: {
      color:'#fff',
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
