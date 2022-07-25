import axios from 'axios';
import {URL_API} from '../../api/const';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsRequestSuccess = data => ({
  type: POSTS_REQUEST_SUCCESS,
  data,
});

export const postsRequestError = error => ({
  type: POSTS_REQUEST_ERROR,
  error
});

export const postsRequestAsync = () => async (dispatch, getState) => {
  const token = getState().token.token;

  dispatch(postsRequest());

  try {
    const response = await axios(`${URL_API}/best`, {
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

    // console.log(postsData);
    dispatch(postsRequestSuccess(data));
  } catch (error) {
    console.warn(error);
    dispatch(postsRequestError(error));
  }
};
