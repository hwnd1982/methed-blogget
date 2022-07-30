export const NOTIFICATION_LIFE_END = 'NOTIFICATION_LIFE_END';
export const NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE';
export const NOTIFICATION_SHOW_ERROR = 'NOTIFICATION_SHOW_ERROR';
export const NOTIFICATION_SHOW_SUCCESS = 'NOTIFICATION_SHOW_SUCCESS';


export const notificationLifeEnd = id => ({
  type: NOTIFICATION_LIFE_END,
  id,
});

export const notificationShowError = (id, message) => ({
  type: NOTIFICATION_SHOW_ERROR,
  error: {id, message},
});

export const notificationShowSuccess = (id, message) => ({
  type: NOTIFICATION_SHOW_SUCCESS,
  success: {id, message},
});

export const notificationError = message => dispatch => {
  const id = setTimeout(() => dispatch(notificationLifeEnd(id)), 3000);
  dispatch(notificationShowError(id, message));
};

export const notificationSuccess = message => dispatch => {
  const id = setTimeout(() => dispatch(notificationLifeEnd(id)), 3000);
  dispatch(notificationShowSuccess(id, message));
};

export const notificationClose = id => dispatch => {
  clearTimeout(id);
  dispatch(notificationLifeEnd(id));
};
