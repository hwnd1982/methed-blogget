import axios from 'axios';
import {URL_API} from '../../api/const';
import {notificationError} from '../notification/notification';
import {postSlice} from './postSlice';

export const postRequestAsync = id => async (dispatch, getState) => {
  const token = getState().token.token;

  dispatch(postSlice.actions.postRequest());

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

    dispatch(postSlice.actions.postRequestSuccess({data, comments}));
  } catch ({response: {data}}) {
    console.warn(data);
    dispatch(postSlice.actions.postRequestError(data));
    dispatch(notificationError(`Ошибка: ${data.message}`));
  }
};
