import React, { createContext, useContext, useState } from "react";

// Create Context
const SearchContext = createContext();

// Create a provider to wrap your app
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to access the search context
export const useSearch = () => {
  return useContext(SearchContext);
};
