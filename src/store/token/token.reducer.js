import {DELETE_TOKEN, UPDATE_TOKEN} from './token';

const initialState = {
  token: '',
  options: {},
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.token,
        options: {
          headers: {
            Authorization: `bearer ${action.token}`,
          },
        },
      };
    case DELETE_TOKEN:
      return initialState;
    default:
      return state;
  }
};
