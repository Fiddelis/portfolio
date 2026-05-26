import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import {
  isLocale,
  locales,
  type Locale,
} from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { getAllPosts } from "@/lib/posts";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function formatDate(iso: string, locale: Locale): string {
  const formatter = new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formatter.format(new Date(iso));
}

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const copy = getDictionary(locale);
  const posts = await getAllPosts(locale);

  return (
    <div className="relative isolate overflow-hidden">
      <Nav labels={copy.nav} />

      <section className="posts-shell mx-auto w-full max-w-[900px] px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">{copy.blog.title}</h1>
        <p className="text-muted-foreground mt-2">{copy.blog.subtitle}</p>
      </section>

      <section className="posts-shell mx-auto w-full max-w-[900px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">{copy.blog.empty}</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border border-border/60 bg-background/90 p-5 sm:p-6"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {copy.blog.publishedOn} {formatDate(post.date, locale)}
                </p>
                <h2 className="mt-2 mb-2 text-2xl font-semibold leading-tight">
                  {post.title}
                </h2>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <Link
                  className="mt-4 inline-block text-sm uppercase tracking-[0.16em] text-primary hover:underline"
                  href={`/${locale}/posts/${post.slug}`}
                >
                  {copy.blog.readMore}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Footer copy={copy.footer} />
    </div>
  );
}
