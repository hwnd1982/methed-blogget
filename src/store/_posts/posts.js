import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from '../../api/const';
import {notificationError} from '../notification/notification';
import {postsSlice} from './postsSlice';

export const postsRequestAsync = createAsyncThunk('posts/fetch',
  async (newPage, {getState, dispatch, rejectWithValue}) => {
    try {
      const token = getState().token.token;
      const page = newPage || getState().posts.page || '';

      newPage && dispatch(postsSlice.actions.changePage(page));

      const state = getState().posts;
      const {data: prevData, loading, isLast, after: prevAfter} = state;

      if (!page || loading || isLast) return state;

      dispatch(postsSlice.actions.loading());
      const response = await axios(`${URL_API}/${page}?limit=10${prevAfter ? `&after=${prevAfter}` : ''}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      const {data: {children: posts, after}} = response.data;
      const nextData = posts.map(({data: {id, title, selftext, thumbnail, author, ups, created}}) =>
        ({
          id,
          title,
          selftext,
          thumbnail: /^https:\/\//.test(thumbnail) ? thumbnail.replace(/\?.*$/, '') : '',
          author,
          ups,
          date: created
        }));

      const data = prevAfter ? [...prevData] : [...nextData];
      if (prevAfter) {
        const postsId = prevData.map(post => post.id);

        data.push(...nextData.filter(post => !postsId.includes(post.id)));
      }

      return {data, after};
    } catch ({message, response: {status}}) {
      dispatch(notificationError(`Ошибка: ${message}`));

      return rejectWithValue({status, message});
    }
  });
