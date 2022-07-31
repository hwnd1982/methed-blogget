import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import {searchRequestSuccess, SEARCH_REQUEST} from './search';

const fetchSearch = async (token, search) => {
  const response = await axios(`${URL_API}/search?q=${search}`, {
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

  return {data, after};
};

const getToken = state => state.token.token;

function* workerSearch(action) {
  const token = yield select(getToken);
  const data = yield fetchSearch(token, action);
  yield put(searchRequestSuccess(data));

  console.log('data', data);
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, workerSearch);
}
