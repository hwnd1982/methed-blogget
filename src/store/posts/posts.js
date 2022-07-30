import axios from 'axios';
import {URL_API} from '../../api/const';
import {notificationError} from '../notification/notification';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_SUCCESS_AFTER = 'POSTS_REQUEST_SUCCESS_AFTER';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsRequestSuccess = ({data, after}) => ({
  type: POSTS_REQUEST_SUCCESS,
  data,
  after,
});

export const postsRequestSuccessAfter = ({data, after}) => ({
  type: POSTS_REQUEST_SUCCESS_AFTER,
  data,
  after,
});

export const postsRequestError = error => ({
  type: POSTS_REQUEST_ERROR,
  error
});

export const changePage = page => ({
  type: CHANGE_PAGE,
  page,
});

export const postsRequestAsync = (newPage) => async (dispatch, getState) => {
  try {
    let page = getState().posts.page;

    if (newPage) {
      page = newPage;
      dispatch(changePage(page));
    }

    const token = getState().token.token;
    const loading = getState().posts.loading;
    const after = getState().posts.after;
    const isLast = getState().posts.isLast;

    if (loading || isLast) return;

    dispatch(postsRequest());
    const response = await axios(`${URL_API}/${page}?limit=10${after ? `&after=${after}` : ''}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const {data: {children: posts}} = response.data;
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

    if (after) {
      dispatch(postsRequestSuccessAfter({data, after: response.data.data.after}));
    } else {
      dispatch(postsRequestSuccess({data, after: response.data.data.after}));
    }
  } catch ({response: {data}}) {
    console.warn(data);
    dispatch(postsRequestError(data));
    dispatch(notificationError(`Ошибка: ${data.message}`));
  }
};
