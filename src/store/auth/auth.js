import axios from 'axios';
import {URL_API} from '../../api/const';
import {deleteToken} from '../token/token';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const authRequestSuccess = data => ({
  type: AUTH_REQUEST_SUCCESS,
  data,
});

export const authRequestError = error => ({
  type: AUTH_REQUEST_ERROR,
  error
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
  data: {},
  error: {},
});

export const authRequestAsync = () => async (dispatch, getState) => {
  const token = getState().token.token;

  dispatch(authRequest());

  try {
    const response = await axios(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`
      },
    });

    const {subreddit: {title: name}, 'icon_img': iconImg} = response.data;
    const img = iconImg.replace(/\?.*$/, '');
    const data = {name, img};

    dispatch(authRequestSuccess(data));
  } catch (error) {
    console.warn(error);
    dispatch(authRequestError(error));
    dispatch(deleteToken());
  }
};
