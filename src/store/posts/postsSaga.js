import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import {notificationError} from '../notification/notification';
import {postsSlice} from './postsSlice';

function* workerPosts({payload: {page: newPage = '', query: newQuery = ''} = {}}) {
  try {
    const token = yield select((store) => store.token.token);

    const query = yield newQuery || select((store) => store.posts.query) || '';
    yield newQuery && put(postsSlice.actions.setQuery(newQuery));

    const page = yield newPage || select((store) => store.posts.page) || '';
    yield newPage && put(postsSlice.actions.changePage(newPage));

    const state = yield select((store) => store.posts);
    const {data: prevData, isLast, after: prevAfter} = state;

    if (isLast) return;

    const response = yield axios(
      `${URL_API}/${page}?limit=10${prevAfter ? `&after=${prevAfter}` : ''}${query ? `&q=${query}` : ''}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    const {
      data: {children: posts, after},
    } = response.data;
    const nextData = posts.map(
      ({data: {id, title, selftext, thumbnail, author, ups, created}}) => ({
        id,
        title,
        selftext,
        thumbnail: /^https:\/\//.test(thumbnail) ?
          thumbnail.replace(/\?.*$/, '') :
          '',
        author,
        ups,
        date: created,
      })
    );

    const data = prevAfter ? [...prevData] : [...nextData];
    if (prevAfter) {
      const postsId = prevData.map(post => post.id);

      data.push(...nextData.filter(post => !postsId.includes(post.id)));
    }


    yield put(postsSlice.actions.requestSuccess({data, after}));
  } catch ({message, response: {status}}) {
    yield put(notificationError(`Ошибка: ${message}`));
    yield put(postsSlice.actions.requestError({status, message}));
  }
}

export function* watchPosts() {
  yield takeLatest('posts/request', workerPosts);
}
