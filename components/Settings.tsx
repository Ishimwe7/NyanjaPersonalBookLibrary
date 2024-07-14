// src/components/SettingsScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { List, Switch } from 'react-native-paper';
import { setSortBy, setTheme } from '../redux/slices/settingsSlice';
import { RootState } from '../redux/types';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { sortBy, theme } = useSelector((state: RootState) => state.settings);

  const handleSortByChange = (newSortBy: 'title' | 'author' | 'rating') => {
    dispatch(setSortBy(newSortBy));
  };

  const handleThemeChange = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <View>
      <List.Section>
        <List.Subheader>Sort books by</List.Subheader>
        <List.Item
          title="Title"
          left={() => <List.Icon icon="sort-alphabetical-ascending" />}
          onPress={() => handleSortByChange('title')}
          right={() => sortBy === 'title' && <List.Icon icon="check" />}
        />
        <List.Item
          title="Author"
          left={() => <List.Icon icon="account" />}
          onPress={() => handleSortByChange('author')}
          right={() => sortBy === 'author' && <List.Icon icon="check" />}
        />
        <List.Item
          title="Rating"
          left={() => <List.Icon icon="star" />}
          onPress={() => handleSortByChange('rating')}
          right={() => sortBy === 'rating' && <List.Icon icon="check" />}
        />
      </List.Section>
      <List.Item
        title="Dark Mode"
        left={() => <List.Icon icon={theme === 'light' ? 'brightness-5' : 'brightness-3'} />}
        right={() => <Switch value={theme === 'dark'} onValueChange={handleThemeChange} />}
      />
    </View>
  );
};

export default SettingsScreen;