import { createSlice } from "@reduxjs/toolkit";
import { postsRequestAsync } from "./posts";

const initialState = {
  data: [],
  error: {},
  page: "",
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
      state.after = "";
      state.data = [];
      state.error = {};
      state.isLast = false;
    },
    loading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [postsRequestAsync.pending.type]: (state) => {
      state.error = {};
    },
    [postsRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    [postsRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;
