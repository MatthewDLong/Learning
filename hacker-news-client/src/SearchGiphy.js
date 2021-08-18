import React, { useState } from "react";

const SearchGipgy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [giphyUrl, setGiphyUrl] = useState("");

  const fetchGiphy = async () => {
    const apiKey = "U2YAk0lxhD8UEoSCpXqcskUTDZjxVGvD";
    try {
      let response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${searchTerm}`
      );
      response = await response.json();
      if (response.data) {
        setGiphyUrl(response.data.fixed_height_downsampled_url);
      }
    } catch (err) {
      // console.error(err.message);
      throw err;
    }
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchGiphy();
        }}
      >
        <label>
          Search giphy:
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </form>
      {giphyUrl && giphyUrl.length > 0 && (
        <div>
          <img src={giphyUrl} title={searchTerm} alt={searchTerm} />
          <a href={giphyUrl} alt={searchTerm}>
            {giphyUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default SearchGipgy;
