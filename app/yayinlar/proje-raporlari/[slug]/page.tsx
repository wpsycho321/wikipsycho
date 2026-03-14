import { client } from "@/lib/sanity";
import { projeRaporuBySlugQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import RaporDetayClient from "./RaporDetayClient";

export default async function RaporDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DEBUG: Log slug from params
  console.log("[proje-raporlari/[slug]] params slug:", slug);

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
    } | null>(projeRaporuBySlugQuery, { slug })
    .catch((err) => {
      console.error("[proje-raporlari/[slug]] Sanity fetch error:", err);
      return null;
    });

  // DEBUG: Log query result
  console.log("[proje-raporlari/[slug]] query returned:", rapor ? { _id: rapor._id, baslik: rapor.baslik } : null);

  if (!rapor) notFound();

  return <RaporDetayClient rapor={rapor} />;
}
