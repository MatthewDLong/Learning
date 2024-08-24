import React, { useState } from "react";
import { fetchGiphy } from "./services/giphyClient";
import "./Search.css";

const Search = ({ apiKey }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="search__container">
      <header>-------header--------</header>
      <label className="search__label">
        Search Giphy:
        <input
          className={
            searchTerm.length < 5 ? "search__input" : "search__input__blue"
          }
          value={searchTerm}
          type="text"
          data-testid="searchTerm"
          name="searchTerm"
          onKeyPress={async (event) => {
            if (event.key === "Enter" && searchTerm && searchTerm.length > 0) {
              try {
                const giphyData = await fetchGiphy(searchTerm, apiKey);
                if (giphyData.data.fixed_height_downsampled_url) {
                  setImageUrl(giphyData.data.fixed_height_downsampled_url);
                }
              } catch (err) {
                console.error(err.message);
              }
            }

            if ((event.key === "Enter" && searchTerm.length) === 0) {
              setImageUrl("");
            }
          }}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </label>
      {imageUrl && imageUrl.length > 0 && (
        <>
          <img src={imageUrl} alt={searchTerm} title={searchTerm} />
          <a alt={searchTerm} title={searchTerm} href={imageUrl}>
            {imageUrl}
          </a>
        </>
      )}
      <footer>-------footer--------</footer>
    </div>
  );
};

export default Search;
