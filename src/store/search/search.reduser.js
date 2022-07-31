import {SEARCH_REQUEST, SEARCH_REQUEST_ERROR, SEARCH_REQUEST_SUCCESS} from './search';

const initialState = {
  data: [],
  error: {},
  search: '',
  after: '',
  loading: false,
  isLast: false,
};

export const searchReduser = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        search: action.search,
        error: {},
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        after: action.after,
      };
    case SEARCH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action,
      };
    default: return state;
  }
};
