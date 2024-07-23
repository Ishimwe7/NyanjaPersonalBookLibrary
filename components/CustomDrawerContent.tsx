import React from 'react';
import { View, Text, StyleSheet, Switch, Image, } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from './ThemeContext';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {

  const { theme, toggleTheme } = useTheme();

  return (
    <DrawerContentScrollView style={styles[theme].container} {...props}>
      <View style={styles[theme].drawerHeader}>
        <Image
          source={require('../assets/images/new-profile.jpg')} 
          style={styles[theme].profileImage}
        />
        <Text style={styles[theme].nameText}>Eng.Nyanja</Text>
      </View>
      <DrawerItem
        label="All Books"
        icon={({ color, size }) => (
          <Icon name="book-outline" color={styles[theme].iconColor.color} size={size} />
        )}
        onPress={() => props.navigation.navigate('All Books')}
         labelStyle={styles[theme].drawerItemLabel}
      />
      <DrawerItem
        label="Add Book"
        icon={({ color, size }) => (
          <Icon name="add-circle-outline" color={styles[theme].iconColor.color} size={size} />
        )}
        onPress={() => props.navigation.navigate('AddBook')}
         labelStyle={styles[theme].drawerItemLabel}
      />
      <DrawerItem
        label="Settings"
        icon={({ color, size }) => (
          <Icon name="settings-outline" color={styles[theme].iconColor.color} size={size} />
        )}
        onPress={() => props.navigation.navigate('Settings')}
         labelStyle={styles[theme].drawerItemLabel}
      />
      <View style={styles[theme].themeToggler}>
        <Text style={styles[theme].themeText}>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#767577" }} 
          thumbColor={theme === 'dark' ? "#000000" : "#FFFFFF"}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = {
  light: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      zIndex:999
    },
    drawerHeader: {
      backgroundColor: '#f6f6f6',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    drawerItem: {
      color:'fff'
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    drawerItemLabel: {
      color: '#000',
    },
    iconColor: {
      color: '#000',
    },
    profileOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '50%',
      marginTop: 10,
    },
    nameText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    themeToggler: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    themeText: {
      fontSize: 16,
      color: '#000',
    },
  }),
  dark: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333',
    },
    drawerHeader: {
      backgroundColor: '#222',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    profileOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '50%',
      marginTop: 10,
    },
    drawerItem: {
      color:'000'
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    drawerItemLabel: {
      color: '#fff',
    },
    iconColor: {
      color: '#fff',
    },
    nameText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    themeToggler: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    themeText: {
      fontSize: 16,
      color: '#fff',
    },
  }),
};

export default CustomDrawerContent;