import {UPDATE_COMMENT} from './comment';

const initialState = {
  comment: '',
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        comment: action.comment,
      };
    default: return state;
  }
};
