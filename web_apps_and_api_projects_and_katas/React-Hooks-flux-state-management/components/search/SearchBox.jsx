import React, { useContext } from "react";
import SearchBoxForm from "./SearchBoxForm";
import SearchResults from "./SearchResults";

import { SearchContext } from "../../state/context/search";

import { searchbox } from "./search.css";

const SearchBox = () => {
  const { searchResults } = useContext(SearchContext);

  return (
    <div className={searchbox}>
      <SearchBoxForm />
      {searchResults && <SearchResults />}
    </div>
  );
};

export default SearchBox;
