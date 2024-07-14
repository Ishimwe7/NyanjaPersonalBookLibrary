import React, { useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeContext';
import { DrawerProvider } from '@/components/drawerContext';
import AppNavigator from '@/components/AppNavigator';
import { useAppDispatch } from '@/redux/hooks/reduxHooks';
import { fetchBooks } from '@/redux/slices/bookSlice';
import { initDatabase } from '@/services/dbService';
import { Provider as PaperProvider } from 'react-native-paper';
export default function App() {

   const dispatch = useAppDispatch();

  useEffect(() => {
    const initApp = async () => {
      await initDatabase();
      dispatch(fetchBooks());
    };

    initApp();
  }, [dispatch]);
  
  return ( 
    <PaperProvider>
       <ThemeProvider> 
       <DrawerProvider>
        <AppNavigator /> 
       </DrawerProvider>
     </ThemeProvider>
     </PaperProvider>
  );
}