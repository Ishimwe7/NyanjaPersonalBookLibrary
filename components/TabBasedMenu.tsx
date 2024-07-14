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

const Tab = createBottomTabNavigator<TabParamList>();

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
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (route.name === 'AddBook') {
            iconName = focused ? 'log-in' : 'log-in-outline';
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
        // tabBarActiveTintColor: theme ? '#ff6347' : '#0066FF', // Tomato or Blue
        // tabBarInactiveTintColor: theme.dark ? '#b0c4de' : '#b0c4de', // LightSteelBlue
        // tabBarStyle: {
        //   backgroundColor: theme.dark ? '#333' : '#f5f5f5', // Dark or Light background color
        // },
        headerShown: true,
        headerTitle: '',
        headerLeft: () => <CustomHeader />,
      })}
    >
      <Tab.Screen
        name="Books"
        component={Books}
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