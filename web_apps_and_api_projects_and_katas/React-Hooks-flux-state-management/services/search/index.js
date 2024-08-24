const fetch = require("node-fetch");
import { getSearchEndPoint } from "../../config";

const buildSearchEndPoint = (searchTerm, maxResults) => {
  const searchEndPoint = getSearchEndPoint();
  const endPoint = new URL(searchEndPoint);
  endPoint.searchParams.append("solrIndex", "fts_en");
  endPoint.searchParams.append("solrRows", maxResults);
  endPoint.searchParams.append("solrTerm", searchTerm);
  return endPoint.toString();
};

const get = async (searchTerm, maxResults) => {
  if (!searchTerm || !maxResults) {
    throw new Error("Not enough arguments supplied");
  }

  const endPoint = buildSearchEndPoint(searchTerm, maxResults);

  return await fetch(endPoint)
    .then(response => response.json())
    .catch(err => err);
};

export { get };
