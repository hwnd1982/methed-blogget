import {
  CHANGE_PAGE,
  POSTS_REQUEST,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS,
  POSTS_REQUEST_SUCCESS_AFTER
} from './posts';

const initialState = {
  loading: false,
  data: [],
  error: {},
  after: '',
  page: '',
  isLast: false,
};

export const postsReducer = (state = initialState, action) => {
  const postsId = [];

  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        after: action.after,
        isLast: !action.after,
      };
    case POSTS_REQUEST_SUCCESS_AFTER:
      postsId.push(...state.data.map(post => post.id));

      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.data.filter(post => !postsId.includes(post.id))],
        after: action.after,
        isLast: !action.after,
      };
    case POSTS_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
        after: '',
        isLast: false,
        data: [],
        error: {}
      };
    default:
      return state;
  }
};
