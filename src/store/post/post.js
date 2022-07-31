import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from '../../api/const';
import {notificationError} from '../notification/notification';

export const postRequestAsync = createAsyncThunk('post/fetch',
  async (id, {getState, dispatch, rejectWithValue}) => {
    const token = getState().token.token;

    if (!token) return;

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

      return {data, comments};
    } catch ({message, response: {status}}) {
      dispatch(notificationError(`Ошибка: ${message}`));

      return rejectWithValue({status, message});
    }
  }
);
