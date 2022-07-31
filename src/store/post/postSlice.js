import {createSlice} from '@reduxjs/toolkit';
import {postRequestAsync} from './post';

const initialState = {
  loading: false,
  data: {},
  comments: [],
  error: {},
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [postRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = {};
    },
    [postRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.comments = action.payload.comments;
      state.error = {};
    },
    [postRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export default postSlice.reducer;
