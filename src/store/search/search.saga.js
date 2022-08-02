import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import {searchRequestError, searchRequestSuccess, SEARCH_REQUEST} from './search';

function* fetchSearch({search}) {
  const token = yield select(store => store.token.token);
  try {
    const response = yield axios(`${URL_API}/search?q=${search}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const {data: {children: posts, after}} = response.data;
    const data = posts.map(({data: {id, title, selftext, thumbnail, author, ups, created}}) =>
      ({
        id,
        title,
        selftext,
        thumbnail: /^https:\/\//.test(thumbnail) ? thumbnail.replace(/\?.*$/, '') : '',
        author,
        ups,
        date: created
      }));

    yield put(searchRequestSuccess({data, after}));
  } catch (error) {
    yield put(searchRequestError(error));
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}
