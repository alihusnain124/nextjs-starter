import { createSlice } from "@reduxjs/toolkit";
import { createPost, fetchPosts } from "./thunk";
import type { AsyncStatus } from "@/store/thunk-helpers";
import type { Post } from "@/types";

export interface PostsState {
  items: Post[];
  status: AsyncStatus;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch posts";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default postsSlice.reducer;
