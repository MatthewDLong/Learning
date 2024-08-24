# Giphy Search

Giphy Search

Create a very small React application that will search Giphy giphy.com

- Start with a search box that accepts input
- When return/enter (⏎) is hit, we want to fetch https://api.giphy.com/v1/gifs/random?api_key=<API-KEY>&tag=<the-input-of-the-search-box>
- The json response will contain something like data.fixed_height_downsampled_url
- Use the URL returned as an <img> src to display the image
- Also display the imageurl beneath the image
- Hitting return/enter (⏎) again should repeat the search and return a different image
- Add a header and footer
- No styling required
