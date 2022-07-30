import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: {},
  comments: [],
  error: {},
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postRequest: state => {
      state.loading = true;
      state.error = {};
    },
    postRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.comments = action.payload.comments;
      state.error = {};
    },
    postRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export default postSlice.reducer;
