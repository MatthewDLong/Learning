import React, { useContext } from "react";

import {
  clearSearchResults,
  fetchSearchResults,
  updateSearchTerm
} from "../../state/actions/search";

import { SearchContext } from "../../state/context/search";
import { searchbox__input } from "./search.css";

const SearchBoxInput = ({ maxResults }) => {
  const { searchTerm, dispatch } = useContext(SearchContext);

  const handleInput = event => {
    event.preventDefault();
    clearSearchResults(dispatch);
    const searchTerm = event.target.value;
    updateSearchTerm(searchTerm, dispatch);

    searchTerm.length >= 2 &&
      fetchSearchResults(searchTerm, maxResults, dispatch);
  };

  return (
    <input
      id="searchbox__input"
      className={searchbox__input}
      type="text"
      value={searchTerm}
      onChange={handleInput}
      name="name"
      placeholder="city, airport, station, region and district..."
    />
  );
};

export default SearchBoxInput;
