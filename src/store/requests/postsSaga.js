import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { URL_API } from "../../api/const";
import { notificationError } from "../notification/notification";
import postsSlice from "./postsSlice";
import postsReducer from "./postsSlice";

function* workerPosts({ newPage = "", newQuery = "" }) {
  const token = yield select((store) => store.token.token);

  const query = yield newQuery || select((store) => store.posts.query) || "";
  yield newQuery && put(postsSlice.actions.setQuery(newQuery));

  const page = yield newPage || select((store) => store.posts.page) || "";
  yield newPage && put(postsSlice.actions.changePage(newPage));

  try {
    const response = yield axios(
      `${URL_API}/${page}${query ? `?q=${query}` : ""}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    const {
      data: { children: posts, after },
    } = response.data;
    const data = posts.map(
      ({ data: { id, title, selftext, thumbnail, author, ups, created } }) => ({
        id,
        title,
        selftext,
        thumbnail: /^https:\/\//.test(thumbnail)
          ? thumbnail.replace(/\?.*$/, "")
          : "",
        author,
        ups,
        date: created,
      })
    );

    yield put(postsSlice.actions.requestSuccess({ data, after }));
  } catch ({ message, response: { status } }) {
    yield put(notificationError(`Ошибка: ${message}`));
    yield put(postsSlice.actions.requestError({ status, message }));
  }
}

export function* watchPosts() {
  yield console.log(postsReducer);
  yield takeLatest("posts/request", workerPosts);
}
