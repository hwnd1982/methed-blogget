import {NOTIFICATION_SHOW_ERROR, NOTIFICATION_LIFE_END, NOTIFICATION_SHOW_SUCCESS} from './notification';

const initialState = {
  errors: [],
  successes: [],
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_SHOW_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.error],
      };
    case NOTIFICATION_SHOW_SUCCESS:
      return {
        ...state,
        successes: [...state.successes, action.success],
      };
    case NOTIFICATION_LIFE_END:
      return {
        ...state,
        errors: state.errors.filter(({id}) => id !== action.id),
        successes: state.successes.filter(({id}) => id !== action.id),
      };
    default:
      return state;
  }
};
