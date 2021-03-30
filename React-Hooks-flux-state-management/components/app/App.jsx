import React, { useContext, useReducer } from "react";
import SearchBox from "../search/SearchBox";
import { SearchContext } from "../../state/context/search";
import { searchReducer } from "../../state/reducers/search";

import "./app.css";
import "./normalize.min.css";

const App = () => {
  const initialState = useContext(SearchContext);

  const [
    { searchTerm, searchResults, loading, count, error },
    dispatch
  ] = useReducer(searchReducer, {
    searchTerm: "",
    searchResults: [],
    loading: false,
    count: 0,
    error: ""
  });

  return (
    <SearchContext.Provider
      value={{ searchTerm, searchResults, loading, count, error, dispatch }}
    >
      <SearchBox />
    </SearchContext.Provider>
  );
};

export default App;
