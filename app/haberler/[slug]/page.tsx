import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { haberBySlugQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import { type PortableTextBlock, PortableText } from "@portabletext/react";

export const dynamic = "force-dynamic";

const playfair = Playfair_Display({ subsets: ["latin"] });

const KATEGORI_DISPLAY: Record<string, string> = {
  Arastirma: "Araştırma",
  Klinik: "Klinik",
  Gelisim: "Gelişim",
  Sosyal: "Sosyal",
  Guncel: "Güncel",
};

function kategoriLabel(k: string | undefined) {
  return (k && KATEGORI_DISPLAY[k]) ?? k ?? "";
}

function formatTarih(tarih: string | undefined) {
  if (!tarih) return "";
  return new Date(tarih).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function HaberDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const haber = await client
    .fetch<{
      _id: string;
      baslik: string;
      slug: { current: string };
      ozet?: string;
      icerik?: PortableTextBlock[];
      tarih?: string;
      kategori?: string;
      kaynak?: string;
      kapakGorseli?: string;
    } | null>(haberBySlugQuery, { slug })
    .catch(() => null);

  if (!haber) notFound();

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-12">
        <Link
          href="/yazilar"
          className="mb-8 inline-block font-sans text-xs uppercase tracking-[0.2em] text-gray-500 transition hover:text-black"
        >
          ← Yazılar ve Haberler
        </Link>

        <p className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
          {kategoriLabel(haber.kategori)} · {formatTarih(haber.tarih)}
        </p>

        <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
          {haber.baslik}
        </h1>

        {haber.ozet && (
          <p className="mt-6 text-xl italic leading-relaxed text-gray-600">
            {haber.ozet}
          </p>
        )}

        {haber.kapakGorseli && (
          <div className="relative mt-10 aspect-video w-full overflow-hidden bg-gray-200">
            <Image
              src={haber.kapakGorseli}
              alt={haber.baslik}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
        )}

        {haber.icerik && haber.icerik.length > 0 ? (
          <article className="mt-10 font-serif [&_p]:mb-6 [&_p]:text-lg [&_p]:leading-relaxed [&_blockquote]:mb-6 [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-gray-50 [&_blockquote]:py-4 [&_blockquote]:pl-6 [&_blockquote]:pr-6 [&_blockquote]:font-serif [&_blockquote]:text-xl [&_blockquote]:italic">
            <PortableText value={haber.icerik} />
          </article>
        ) : (
          haber.ozet && (
            <p className="mt-10 text-lg leading-relaxed text-gray-700">
              {haber.ozet}
            </p>
          )
        )}

        {haber.kaynak && (
          <a
            href={haber.kaynak}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block border border-black px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
          >
            Kaynağa Git →
          </a>
        )}
      </div>
    </div>
  );
}
