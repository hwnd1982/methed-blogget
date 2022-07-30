import axios from 'axios';
import {URL_API} from '../../api/const';
import {notificationError} from '../notification/notification';

export const POST_REQUEST = 'POST_REQUEST';
export const POST_REQUEST_SUCCESS = 'POST_REQUEST_SUCCESS';
export const POST_REQUEST_ERROR = 'POST_REQUEST_ERROR';

export const postRequest = () => ({
  type: POST_REQUEST,
});

export const postRequestSuccess = (data, comments) => ({
  type: POST_REQUEST_SUCCESS,
  data,
  comments,
});

export const postRequestError = error => ({
  type: POST_REQUEST_ERROR,
  error,
});

export const postRequestAsync = id => async (dispatch, getState) => {
  const token = getState().token.token;

  dispatch(postRequest());

  try {
    const response = await axios(`${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const [{data: {children: [{data: post}]}}, {data: {children: commentsData}}] = response.data;
    const data = {
      id: post.id,
      title: post.title,
      selftext: post.selftext,
      thumbnail: /^https:\/\//.test(post.thumbnail) ? post.thumbnail.replace(/\?.*$/, '') : '',
      author: post.author,
      ups: post.ups,
      date: post.created
    };
    const comments = commentsData
      .map(({data: {id, author, body, created, ups}}) => ({id, author, body, date: created, ups}))
      .filter(comment => comment.author && comment.author !== '[deleted]' && comment.body !== '[removed]');

    dispatch(postRequestSuccess(data, comments));
  } catch ({response: {data}}) {
    console.warn(data);
    dispatch(postRequestError(data));
    dispatch(notificationError(`Ошибка: ${data.message}`));
  }
};
