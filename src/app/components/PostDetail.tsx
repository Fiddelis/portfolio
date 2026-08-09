"use client";

import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { getDictionary } from "@/app/i18n/dictionaries";
import { useLocale } from "@/app/i18n/LocaleProvider";
import type { Post } from "@/lib/posts";

type PostDetailProps = {
  post: Post;
};

function formatDate(iso: string, locale: "en" | "pt"): string {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export default function PostDetail({ post }: PostDetailProps) {
  const { locale, setLocale } = useLocale();
  const copy = getDictionary(locale);

  return (
    <div className="relative isolate flex min-h-[100svh] flex-col overflow-x-clip">
      <Nav labels={copy.nav} locale={locale} onLocaleChange={setLocale} />

      <article className="posts-shell mx-auto w-full max-w-[900px] flex-1 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
        <Link
          href="/posts"
          className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-primary hover:underline"
        >
          ← {copy.blog.backToPosts}
        </Link>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {copy.blog.publishedOn} {formatDate(post.date, locale)}
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{post.excerpt}</p>

        <div
          className="post-content mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <Footer copy={copy.footer} />
    </div>
  );
}
