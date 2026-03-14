import { client } from "@/lib/sanity";
import { eyayinBySlugQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import EYayinDetayClient from "./EYayinDetayClient";

export const dynamic = "force-dynamic";

export default async function EYayinDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const yayin = await client
    .fetch<{
      _id: string;
      baslik: string;
      slug: { current: string };
      altBaslik?: string;
      seriNo?: string;
      tur?: string;
      yil?: string;
      tarih?: string;
      kategori?: string;
      ozet?: string;
      hedef?: string;
      bulgular?: string[];
      sayfaSayisi?: number;
      hazirlayanlar?: string[];
      pdfUrl?: string;
      editor?: string;
      danismanlar?: string[];
      yayin?: string;
      kapakGorseli?: string;
    } | null>(eyayinBySlugQuery, { slug })
    .catch(() => null);

  if (!yayin) notFound();

  return <EYayinDetayClient yayin={yayin} />;
}
