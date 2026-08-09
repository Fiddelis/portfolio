import { notFound } from "next/navigation";
import PostDetail from "@/app/components/PostDetail";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} />;
}
