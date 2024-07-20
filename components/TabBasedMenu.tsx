import React, { useState } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TabParamList, NavigationProps } from './types';
import { useTheme } from '@react-navigation/native';
import Books from './Books';
import AddBook from './AddBook';
import SettingsScreen from './Settings';
import { createStackNavigator } from '@react-navigation/stack';
import BookDetail from './BookDetails';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator();

const BookStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Books" component={Books} />
      <Stack.Screen name="Book Details" component={BookDetail} />
    </Stack.Navigator>
  );
};

const CustomHeader: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{ marginLeft: 10 }}
    >
      <Icon name={Platform.OS === 'ios' ? 'ios-menu' : 'menu'} size={30} color={'#222'} />
    </TouchableOpacity>
  );
};

export default function TabBasedNavigation() {
 // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  // const handleLogout = (navigation: NavigationProps) => {
  //   setIsLoggedIn(false);
  //   navigation.navigate('Login');
  // };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Books') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'AddBook') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }else if (route.name === 'Settings') {
            iconName = focused ? 'settings-outline' : 'settings-outline';
          }
          else {
            iconName = 'alert';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        headerTitle: '',
        headerLeft: () => <CustomHeader />,
      })}
    >
      <Tab.Screen
        name="Books"
        component={BookStack}
        options={{ tabBarLabel: 'Books' }}
      />
      <Tab.Screen
        name="AddBook"
        component={AddBook}
        options={{ tabBarLabel: 'AddBook' }}
      >
      </Tab.Screen>
       <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      >
      </Tab.Screen>
    </Tab.Navigator>
  );
}