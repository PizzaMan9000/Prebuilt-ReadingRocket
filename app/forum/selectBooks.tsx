import BookCard from '@/components/forum/BookCard';
import { getSearchResults } from '@/services/bookApi';
import useSelectBooksState from '@/store/selectBooks';
import useDebounce from '@/utils/useDebounce';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Spinner } from 'tamagui';
import { ScrollView } from 'tamagui';
import { View, Text, useTheme, Input } from 'tamagui';

const SelectBooks = () => {
  const {searchValue, setSearchValue} = useSelectBooksState();
  const plusedSearchValue = searchValue.replace(' ', '+');
  const debouncedSearchValue = useDebounce(plusedSearchValue, 300);

  const searchQuery = useQuery({
    queryKey: ['search', debouncedSearchValue],
    queryFn: () => getSearchResults(debouncedSearchValue),
    enabled: debouncedSearchValue.length > 0
  })

  const theme = useTheme() as {
    primaryColor: string;
    secondaryColorOne: string;
    secondaryColorTwo: string;
    complementaryColor: string;
  };

  return (
    <View flex={1} paddingHorizontal={20}>
      <View flexDirection='row' width="90%" height={40} borderWidth={0.5} borderColor="#E0E0E0" mt={120} alignSelf='center' borderRadius={5} alignItems='center' >
        <Input value={searchValue} onChangeText={setSearchValue} borderWidth={0} placeholder='Lord of the rings' placeholderTextColor="#C4C4C4" fontSize={10} fontWeight={400} lineHeight={16} width="90%" />
        <Ionicons name="search" size={24} color="#6247AA" />
      </View>
      <ScrollView mt={50}>
        {searchQuery.isLoading && (
          <Spinner size='large' color="#6247AA" />
        )}
        {searchQuery.data?.docs && (
          <View flexDirection='row' flexWrap='wrap'>{searchQuery.data?.docs.slice(0, 2).map((item) => <BookCard book={item} key={item.title} />)}</View>
        )}
      </ScrollView>
    </View>
  );
};

export default SelectBooks;
