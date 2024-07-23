import React, { useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeContext';
import { DrawerProvider } from '@/components/drawerContext';
import AppNavigator from '@/components/AppNavigator';
import { useAppDispatch } from '@/redux/hooks/reduxHooks';
import { fetchBooks } from '@/redux/slices/bookSlice';
import { getDBConnection } from '@/data-persistance/sqliteconfig';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
export default function App() {

   const dispatch = useAppDispatch();
  useEffect(() => {
  const initDB = async () => {
    try {
      console.log("Starting database initialization");
      await getDBConnection();
      console.log("Database initialized successfully");
      dispatch(fetchBooks());
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
  };

  initDB();
}, [dispatch]);
  
  return ( 
    <PaperProvider>
       <ThemeProvider> 
       <DrawerProvider>
          <AppNavigator /> 
           <Toast/>
       </DrawerProvider>
     </ThemeProvider>
     </PaperProvider>
  );
}