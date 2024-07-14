import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  sortBy: 'title' | 'author' | 'rating';
  theme: 'light' | 'dark';
}

const initialState: SettingsState = {
  sortBy: 'title',
  theme: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<'title' | 'author' | 'rating'>) => {
      state.sortBy = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setSortBy, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;