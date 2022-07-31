import {configureStore} from '@reduxjs/toolkit';
import {tokenReducer} from './token/token.reducer';
import {authReducer} from './auth/auth.reducer';
import {commentReducer} from './comment/comment.reducer';
import {tokenMiddleware} from './token/token';
import postsReducer from './posts/postsSlice';
import postReducer from './post/postSlice';
import {notificationReducer} from './notification/notification.reducer';

const logger = store => next => action => {
  console.log(action);
  next(action);
};

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    comment: commentReducer,
    auth: authReducer,
    posts: postsReducer,
    post: postReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger, tokenMiddleware]),
});
