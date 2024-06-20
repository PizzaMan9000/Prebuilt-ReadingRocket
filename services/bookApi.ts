import { SearchedBook } from "@/interfaces/bookApiResults";

export const getSearchResults = async (query: string) : Promise<SearchedBook> => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  );

  const json = await response.json();

  return json;
}