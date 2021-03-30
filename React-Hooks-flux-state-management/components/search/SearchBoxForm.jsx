import React from "react";
import SearchBoxHeading from "./SearchBoxHeading";
import SearchBoxLabel from "./SearchBoxLabel";
import SearchBoxInput from "./SearchBoxInput";

import { searchbox__form } from "./search.css";

const SearchBoxForm = () => (
  <form role="search" id="searchbox" className={searchbox__form}>
    <SearchBoxHeading />
    <SearchBoxLabel />
    <SearchBoxInput maxResults={6} />
  </form>
);

export default SearchBoxForm;
