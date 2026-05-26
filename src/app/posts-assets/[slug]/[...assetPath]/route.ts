import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const postsDirectory = path.join(process.cwd(), "content", "posts");

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function getContentType(filePath: string): string {
  return contentTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; assetPath: string[] }> }
) {
  const { slug, assetPath } = await params;
  const candidatePath = path.join(postsDirectory, slug, ...assetPath);
  const expectedRoot = path.join(postsDirectory, slug);
  const resolvedPath = path.resolve(candidatePath);

  if (!resolvedPath.startsWith(path.resolve(expectedRoot))) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await fs.readFile(resolvedPath);
    return new NextResponse(file, {
      headers: {
        "Content-Type": getContentType(resolvedPath),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      return new NextResponse("Not found", { status: 404 });
    }

    throw error;
  }
}
