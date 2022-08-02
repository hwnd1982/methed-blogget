import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: {},
  page: "",
  query: "",
  after: "",
  loading: false,
  isLast: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
      state.query = "";
      state.after = "";
      state.data = [];
      state.error = {};
      state.isLast = false;
    },
    setQuery: (state, action) => {
      state.page = "search";
      state.query = action.payload;
      state.after = "";
      state.data = [];
      state.error = {};
      state.isLast = false;
    },
    request: (state) => {
      state.error = {};
      state.loading = true;
    },
    requestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    requestError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;
