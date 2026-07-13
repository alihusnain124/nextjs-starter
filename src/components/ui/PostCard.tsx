import type { Post } from "@/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-border bg-card rounded-xl border p-5 shadow-sm transition hover:shadow-md">
      <h3 className="text-card-foreground font-semibold capitalize">{post.title}</h3>
      <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">{post.body}</p>
    </article>
  );
}
