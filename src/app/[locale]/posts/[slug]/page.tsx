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
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  const all = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getAllPosts(locale);
      return posts.map((post) => ({ locale, slug: post.slug }));
    })
  );

  return all.flat();
}

function formatDate(iso: string, locale: Locale): string {
  const formatter = new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formatter.format(new Date(iso));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const copy = getDictionary(locale);
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative isolate overflow-hidden">
      <Nav labels={copy.nav} />

      <article className="posts-shell mx-auto w-full max-w-[900px] px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8">
        <Link
          href={`/${locale}/posts`}
          className="inline-block text-xs uppercase tracking-[0.16em] text-primary hover:underline"
        >
          {copy.blog.backToPosts}
        </Link>

        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {copy.blog.publishedOn} {formatDate(post.date, locale)}
        </p>

        <h1 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight">{post.title}</h1>
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
