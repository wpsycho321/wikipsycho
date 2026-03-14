import { client } from "@/lib/sanity";
import { raporBySlugQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import RaporDetayClient from "./RaporDetayClient";

export default async function RaporDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rapor = await client
    .fetch<{
      _id: string;
      baslik: string;
      slug: { current: string };
      altBaslik?: string;
      yil?: string;
      tarih?: string;
      ozet?: string;
      bulgular?: string[];
      sayfaSayisi?: number;
      hazirlayanlar?: string[];
      pdfUrl?: string;
      kapakGorseli?: string;
    } | null>(raporBySlugQuery, { slug })
    .catch(() => null);

  if (!rapor) notFound();

  return <RaporDetayClient rapor={rapor} />;
}
