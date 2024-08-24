import React, { useContext } from "react";

import { SearchContext } from "../../state/context/search";
import { textarea } from "./search.css";

const SearchResults = () => {
  const { searchResults } = useContext(SearchContext);

  return (
    <div>
      {searchResults &&
        searchResults.map(result => (
          <textarea className={textarea} cols="30" rows="10">
            {JSON.stringify(result, undefined, 4)}
          </textarea>
        ))}
    </div>
  );
};

export default SearchResults;
