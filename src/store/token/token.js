import {setToken} from '../../api/token';

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';

export const updateToken = token => ({
  type: UPDATE_TOKEN,
  token,
});

export const deleteToken = () => ({
  type: DELETE_TOKEN,
  token: '',
});

export const tokenMiddleware = strege => next => action => {
  action.type === UPDATE_TOKEN && setToken(action.token);
  action.type === DELETE_TOKEN && setToken('');

  next(action);
};
