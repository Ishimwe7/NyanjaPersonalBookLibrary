import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/bookSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;