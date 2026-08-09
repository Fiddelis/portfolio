import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/app/i18n/config";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  redirect("/posts");
}
