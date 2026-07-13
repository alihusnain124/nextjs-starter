import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsApi } from "./services";
import { shouldSkipFetch } from "@/store/thunk-helpers";
import type { RootState } from "@/store/store";
import type { Post } from "@/types";

// Async action (Redux Thunk) — dispatch(fetchPosts()) triggers the API call
// and Redux Toolkit auto-generates the pending/fulfilled/rejected action types.
// `condition` + `shouldSkipFetch` skip the dispatch entirely if posts are already
// loaded or loading, so repeated dispatch(fetchPosts()) calls (e.g. from multiple
// mounted components) don't refetch — every feature's fetch thunk should follow
// this same one-line pattern, see the README.
export const fetchPosts = createAsyncThunk<Post[], void, { state: RootState }>(
  "posts/fetchPosts",
  async () => postsApi.getAll(),
  {
    condition: (_, { getState }) => !shouldSkipFetch(getState().posts.status),
  },
);

export const createPost = createAsyncThunk("posts/createPost", async (post: Omit<Post, "id">) => {
  return postsApi.create(post);
});
