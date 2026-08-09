"use client";

import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { getDictionary } from "@/app/i18n/dictionaries";
import { useLocale } from "@/app/i18n/LocaleProvider";
import type { PostMeta } from "@/lib/posts";

type PostsIndexProps = {
  posts: PostMeta[];
};

function formatDate(iso: string, locale: "en" | "pt"): string {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export default function PostsIndex({ posts }: PostsIndexProps) {
  const { locale, setLocale } = useLocale();
  const copy = getDictionary(locale);
  const visiblePosts = posts.filter(
    (post) => !post.locale || post.locale === locale
  );

  return (
    <div className="relative isolate flex min-h-[100svh] flex-col overflow-x-clip">
      <Nav labels={copy.nav} locale={locale} onLocaleChange={setLocale} />

      <div className="flex-1">
        <section className="posts-shell border-b-2 border-foreground bg-[var(--section-projects)]">
          <div className="mx-auto w-full max-w-[900px] px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-28 lg:px-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
              {"//"} archive.log
            </p>
            <h1 className="m-0 text-3xl font-bold text-primary sm:text-4xl">
              {copy.blog.title}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {copy.blog.subtitle}
            </p>
          </div>
        </section>

        <section className="posts-shell mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {visiblePosts.length === 0 ? (
            <p className="text-muted-foreground">{copy.blog.empty}</p>
          ) : (
            <ul className="space-y-5">
              {visiblePosts.map((post) => (
                <li
                  key={post.slug}
                  className="post-list-card border-2 border-foreground bg-card p-5 sm:p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {copy.blog.publishedOn} {formatDate(post.date, locale)}
                  </p>
                  <h2 className="mb-2 mt-3 text-2xl font-semibold leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <Link
                    className="mt-5 inline-flex border-2 border-primary bg-primary px-3 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground hover:bg-secondary hover:border-secondary"
                    href={`/posts/${post.slug}`}
                  >
                    {copy.blog.readMore} →
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <Footer copy={copy.footer} />
    </div>
  );
}
