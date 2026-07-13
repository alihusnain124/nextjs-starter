import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsApi } from "./services";
import type { Post } from "@/types";

// Async action (Redux Thunk) — dispatch(fetchPosts()) triggers the API call
// and Redux Toolkit auto-generates the pending/fulfilled/rejected action types.
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return postsApi.getAll();
});

export const createPost = createAsyncThunk("posts/createPost", async (post: Omit<Post, "id">) => {
  return postsApi.create(post);
});
