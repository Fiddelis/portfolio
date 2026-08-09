import { notFound, redirect } from "next/navigation";
import { isLocale } from "../i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  redirect("/");
}
