import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Searchbar
      placeholder="Search books"
      onChangeText={handleSearch}
      value={searchQuery}
    />
  );
};

export default SearchBar;