import React, { useState, useEffect } from "react";

const Articles = () => {
  const [data, setData] = useState({ hits: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchArticles = async (query) => {
    setIsLoading(true);
    try {
      let response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      response = await response.json();
      setData(response);
      setIsLoading(false);
    } catch (err) {
      setData({ hits: [] });
      setErrorMessage("Failed to load articles");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <label>
        Search Hacker News:
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              fetchArticles(searchTerm);
            }
          }}
        />
      </label>
      <button
        onClick={() => {
          fetchArticles(searchTerm);
        }}
      >
        Search
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.hits &&
            data.hits.length > 0 &&
            data.hits.map((item) => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Articles;
