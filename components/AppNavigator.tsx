import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabBasedNavigation from './TabBasedMenu';
import CustomDrawerContent from './CustomDrawerContent';
import { RootDrawerParamList } from './types';
import { ThemeProvider } from './ThemeContext';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
export default function AppNavigator() {

  return (
    //  <NavigationContainer>
    <ThemeProvider>
       <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ drawerStyle: { width: 200 },headerShown: false }}
      >
        <Drawer.Screen
          name="MainTabs"
          component={TabBasedNavigation}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
     </ThemeProvider>
    // </NavigationContainer>
    //   <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    //     <Drawer.Screen name="MainTabs" component={TabBasedNavigation} options={{ headerShown: false,drawerStyle:{width:200} }} />
    // </Drawer.Navigator>
    
  );
}