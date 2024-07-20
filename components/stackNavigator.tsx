import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookDetail from './BookDetails';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
