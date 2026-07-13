import type { Post } from "@/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-semibold text-slate-900 capitalize dark:text-slate-100">{post.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{post.body}</p>
    </article>
  );
}
