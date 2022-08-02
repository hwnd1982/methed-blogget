import {all} from 'redux-saga/effects';
import {watchPosts} from './posts/postsSaga';

export default function* rootSaga() {
  yield all([
    watchPosts(),
  ]);
}
