import {
  UPDATE_SEARCH_TERM,
  UPDATE_SEARCH_RESULTS,
  UPDATE_SEARCH_RESULTS_COUNT,
  CLEAR_SEARCH_RESULTS,
  SET_LOADING,
  SET_ERROR_MESSAGE,
  CLEAR_ERROR_MESSAGE
} from "../constants";

const initialState = {
  searchTerm: "",
  searchResults: [],
  loading: false,
  count: 0,
  error: ""
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm
      };
    case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.searchResults
      };
    case UPDATE_SEARCH_RESULTS_COUNT:
      return {
        ...state,
        count: action.count
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
        count: 0
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.error
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: ""
      };
    default:
      return state;
  }
};

export { searchReducer };
