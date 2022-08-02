// import {takeEvery} from 'redux-saga/effects';
import { watchPosts } from "./requests/postsSaga";
import { watchSearch } from "./search/search.saga";

// function* workerSaga(action) {
//   yield console.log('is working');
// }

// export function* watchSaga() {
//   yield takeEvery('SUBMIT', workerSaga);
// }

export default function* rootSaga() {
  // yield watchSaga();
  yield watchSearch();
  yield watchPosts();
}
