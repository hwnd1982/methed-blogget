import {POST_REQUEST, POST_REQUEST_ERROR, POST_REQUEST_SUCCESS} from './post';

const initialState = {
  loading: false,
  data: {},
  comments: [],
  error: {},
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case POST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        comments: action.comments,
      };
    case POST_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
