import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabBasedNavigation from './TabBasedMenu';
import CustomDrawerContent from './CustomDrawerContent';
import { RootDrawerParamList } from './types';
import { useTheme } from './ThemeContext';
import { createStackNavigator } from '@react-navigation/stack';
import BookList from './Books';
import AddBook from './AddBook';
import EditBook from './EditBook';
import BookDetail from './BookDetails';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createStackNavigator();

const BookStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Books" component={BookList} options={{ title: 'My Books' }} />
    <Stack.Screen name="AddBook" component={AddBook} options={{ title: 'Add New Book' }} />
    <Stack.Screen name="EditBook" component={EditBook} options={{ title: 'Edit Book' }} />
    <Stack.Screen name="BookDetail" component={BookDetail} options={{ title: 'Book Details' }} />
  </Stack.Navigator>
);

export default function AppNavigator() {

  const { theme } = useTheme();
  return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="MainTabs" component={TabBasedNavigation} options={{ headerShown: false,drawerStyle:{width:200} }} />
      </Drawer.Navigator>
  );
}