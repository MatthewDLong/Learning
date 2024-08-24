import React from "react";
import { searchbox__label } from "./search.css";

const SearchBoxLabel = () => (
  <label
    id="searchbox__label"
    htmlFor="searchbox__input"
    className={searchbox__label}
  >
    Pick-up Location
  </label>
);

export default SearchBoxLabel;
