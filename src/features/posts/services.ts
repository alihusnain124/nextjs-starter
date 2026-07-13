import { apiClient } from "@/lib/axios";
import type { Post } from "@/types";

// Dummy endpoints backed by JSONPlaceholder. Swap NEXT_PUBLIC_API_URL in .env.local
// and adjust these paths once your real backend is ready — the thunks in
// this feature never need to change.
export const postsApi = {
  getAll: () => apiClient.get<Post[]>("/posts", { params: { _limit: 10 } }),
  getById: (id: number) => apiClient.get<Post>(`/posts/${id}`),
  create: (post: Omit<Post, "id">) => apiClient.post<Post>("/posts", post),
};
