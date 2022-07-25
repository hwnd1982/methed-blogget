import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {tokenReducer} from './token/token.reducer';
import thunk from 'redux-thunk';
import {authReducer} from './auth/auth.reducer';
import {commentReducer} from './comment/comment.reducer';
import {tokenMiddleware} from './token/token';
import {postsReducer} from './posts/posts.reducer';
import {postReducer} from './post/post.reducer';

const logger = store => next => action => {
  console.log(action);
  next(action);
};

const rootReducer = combineReducers({
  token: tokenReducer,
  comment: commentReducer,
  auth: authReducer,
  posts: postsReducer,
  post: postReducer,
});


export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, tokenMiddleware, thunk))
);
