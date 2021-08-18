export const fetchGiphy = async (searchTerm, apiKey = "<API KEY HERE>") => {
  try {
    const giphyUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${searchTerm}`;
    const response = await fetch(giphyUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
