import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { isLocale } from "@/app/i18n/config";

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  redirect(`/posts/${slug}`);
}
