import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { Locale } from "@/app/i18n/config";
import rehypeSlug from "rehype-slug";

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
const sanitizeSchema = {
  ...defaultSchema,
  clobberPrefix: "",
  tagNames: [...(defaultSchema.tagNames ?? []), "details", "summary", "mark"],
  attributes: {
    ...defaultSchema.attributes,
    details: [...(defaultSchema.attributes?.details ?? []), "open"],
    summary: [...(defaultSchema.attributes?.summary ?? [])],
  },
};

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
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  return processed.toString();
}

function toSlug(fileName: string): string {
  return fileName.replace(/\.md$/, "");
}

type PostFile = {
  slug: string;
  fullPath: string;
};

function rewriteRelativeAssetUrls(html: string, slug: string): string {
  return html.replace(/(<img\b[^>]*\bsrc=")([^"]+)(")/g, (match, prefix, src, suffix) => {
    if (!src.startsWith("./") && !src.startsWith("../")) {
      return match;
    }

    const normalized = path.posix.normalize(src).replace(/^(\.\.\/)+/, "");
    const assetPath = normalized.replace(/^\.?\//, "");

    return `${prefix}/posts-assets/${slug}/${assetPath}${suffix}`;
  });
}

async function collectMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectMarkdownFiles(fullPath);
      }

      return entry.name.endsWith(".md") ? [fullPath] : [];
    })
  );

  return files.flat();
}

async function readPostFiles(): Promise<PostFile[]> {
  try {
    const files = await collectMarkdownFiles(postsDirectory);
    return files.map((fullPath) => ({
      slug: toSlug(path.basename(fullPath)),
      fullPath,
    }));
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function getPostFileBySlug(slug: string): Promise<PostFile | null> {
  const files = await readPostFiles();
  return files.find((file) => file.slug === slug) ?? null;
}

export async function getAllPosts(locale?: Locale): Promise<PostMeta[]> {
  const files = await readPostFiles();

  const posts = (
    await Promise.all(
      files.map(async ({ slug, fullPath }): Promise<PostMeta | null> => {
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
  const postFile = await getPostFileBySlug(slug);

  if (!postFile) {
    return null;
  }

  try {
    const raw = await fs.readFile(postFile.fullPath, "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as Frontmatter;
    const postLocale = frontmatter.locale;

    if (!shouldIncludePost(postLocale, locale)) {
      return null;
    }

    const html = rewriteRelativeAssetUrls(await markdownToHtml(content), slug);
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
