import axios from 'axios';
import {URL_API} from '../../api/const';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_SUCCESS_AFTER = 'POSTS_REQUEST_SUCCESS_AFTER';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

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

export const postsRequestAsync = () => async (dispatch, getState) => {
  try {
    const token = getState().token.token;
    const loading = getState().posts.loading;
    let after = getState().posts.after;
    const isLast = getState().posts.isLast;

    if (loading || isLast) return;

    dispatch(postsRequest());
    const response = await axios(`${URL_API}/best?limit=10${after ? `&after=${after}` : ''}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const {data: {children: posts}} = response.data;
    after = response.data.data.after;
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

    // console.log(posts);
    after ?
      dispatch(postsRequestSuccessAfter({data, after})) :
      dispatch(postsRequestSuccess({data, after}));
  } catch (error) {
    console.warn(error);
    dispatch(postsRequestError(error));
  }
};
