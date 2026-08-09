import PostsIndex from "@/app/components/PostsIndex";
import { getAllPosts } from "@/lib/posts";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return <PostsIndex posts={posts} />;
}
