import {AUTH_LOGOUT, AUTH_REQUEST, AUTH_REQUEST_ERROR, AUTH_REQUEST_SUCCESS} from './auth';

const initialState = {
  loading: false,
  data: {},
  error: {},
  isAuth: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
        isAuth: false,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        data: {},
        error: {},
        isAuth: false,
      };
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isAuth: true,
      };
    case AUTH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isAuth: false,
      };
    default:
      return state;
  }
};
