import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import type { Locale } from "@/app/i18n/config";

type Frontmatter = {
  title?: string;
  excerpt?: string;
  date?: string;
  locale?: Locale;
};

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  locale?: Locale;
};

export type Post = PostMeta & {
  html: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

function resolveDate(input?: string): string {
  if (!input) {
    return new Date(0).toISOString();
  }

  const parsed = Date.parse(input);
  if (Number.isNaN(parsed)) {
    return new Date(0).toISOString();
  }

  return new Date(parsed).toISOString();
}

function buildExcerpt(content: string, fallback: string): string {
  const firstParagraph = content
    .split("\n")
    .map((line) => line.trim())
    .find((line) => Boolean(line) && !line.startsWith("#"));

  if (!firstParagraph) return fallback;

  return firstParagraph.length > 180
    ? `${firstParagraph.slice(0, 177)}...`
    : firstParagraph;
}

function shouldIncludePost(postLocale: Locale | undefined, locale?: Locale): boolean {
  if (!postLocale) return true;
  if (!locale) return true;
  return postLocale === locale;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  return processed.toString();
}

function toSlug(fileName: string): string {
  return fileName.replace(/\.md$/, "");
}

async function readPostFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(postsDirectory);
    return files.filter((file) => file.endsWith(".md"));
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function getAllPosts(locale?: Locale): Promise<PostMeta[]> {
  const files = await readPostFiles();

  const posts = (
    await Promise.all(
      files.map(async (fileName): Promise<PostMeta | null> => {
        const slug = toSlug(fileName);
        const fullPath = path.join(postsDirectory, fileName);
        const raw = await fs.readFile(fullPath, "utf8");
        const { data, content } = matter(raw);
        const frontmatter = data as Frontmatter;
        const postLocale = frontmatter.locale;

        if (!shouldIncludePost(postLocale, locale)) {
          return null;
        }

        const title = frontmatter.title?.trim() || slug;
        const excerpt =
          frontmatter.excerpt?.trim() || buildExcerpt(content, title);
        const date = resolveDate(frontmatter.date);

        return {
          slug,
          title,
          excerpt,
          date,
          locale: postLocale,
        };
      })
    )
  ).filter((post): post is PostMeta => post !== null);

  return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getPostBySlug(slug: string, locale?: Locale): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as Frontmatter;
    const postLocale = frontmatter.locale;

    if (!shouldIncludePost(postLocale, locale)) {
      return null;
    }

    const html = await markdownToHtml(content);
    const title = frontmatter.title?.trim() || slug;
    const excerpt = frontmatter.excerpt?.trim() || buildExcerpt(content, title);

    return {
      slug,
      title,
      excerpt,
      date: resolveDate(frontmatter.date),
      locale: postLocale,
      html,
    };
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}
