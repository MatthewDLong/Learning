import {
  UPDATE_SEARCH_TERM,
  UPDATE_SEARCH_RESULTS,
  UPDATE_SEARCH_RESULTS_COUNT,
  CLEAR_SEARCH_RESULTS,
  SET_LOADING,
  SET_ERROR_MESSAGE,
  CLEAR_ERROR_MESSAGE
} from "../constants";

import { get } from "../../services/search";

const clearSearchResults = dispatch => {
  dispatch({
    type: CLEAR_SEARCH_RESULTS
  });
};

const fetchSearchResults = async (searchTerm, maxResults, dispatch) => {
  await get(searchTerm, maxResults)
    .then(response => {
      const {
        results: { docs }
      } = response;
      return docs;
    })
    .then(searchResults => {
      dispatch({
        type: UPDATE_SEARCH_RESULTS,
        searchResults
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR_MESSAGE,
        error: err.message
      });
    });
};

const updateSearchTerm = (searchTerm, dispatch) => {
  dispatch({
    type: UPDATE_SEARCH_TERM,
    searchTerm
  });
};

export { clearSearchResults, fetchSearchResults, updateSearchTerm };
