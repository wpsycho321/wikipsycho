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
      yazar?: {
        isim?: string;
        unvan?: string;
        biyografi?: string;
        slug?: { current: string } | string;
        fotograf?: string;
      };
    } | null>(haberBySlugQuery, { slug })
    .catch(() => null);

  if (!haber) notFound();

  const yazarSlug = haber.yazar?.slug
    ? typeof haber.yazar.slug === "object"
      ? haber.yazar.slug.current
      : String(haber.yazar.slug)
    : null;

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <div className="w-full">
        <div className="mx-auto max-w-3xl px-6 pt-16 md:px-12">
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
        </div>

        <div className="flex w-full">
          <aside className="sticky top-24 hidden w-1/5 flex-shrink-0 px-8 py-16 lg:block">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              KATEGORİLER
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {haber.kategori && (
                <span className="rounded-full border border-gray-300 px-3 py-1 font-sans text-sm">
                  {kategoriLabel(haber.kategori)}
                </span>
              )}
            </div>
            <div className="mt-6 h-px w-full bg-gray-200" />
            {haber.tarih && (
              <p className="mt-4 font-sans text-xs text-gray-500">
                Yayınlanma: {formatTarih(haber.tarih)}
              </p>
            )}
          </aside>

          <div className="w-full flex-1 py-16 lg:w-3/5">
            <div className="mx-auto max-w-2xl px-6">
              {haber.icerik && haber.icerik.length > 0 ? (
                <article className="font-serif [&_p]:mb-6 [&_p]:text-lg [&_p]:leading-relaxed [&_blockquote]:mb-6 [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-gray-50 [&_blockquote]:py-4 [&_blockquote]:pl-6 [&_blockquote]:pr-6 [&_blockquote]:font-serif [&_blockquote]:text-xl [&_blockquote]:italic">
                  <PortableText value={haber.icerik} />
                </article>
              ) : (
                haber.ozet && (
                  <p className="text-lg leading-relaxed text-gray-700">
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

          {haber.yazar && (
            <aside className="sticky top-24 hidden w-1/5 flex-shrink-0 px-8 py-16 lg:block">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                {haber.yazar.fotograf ? (
                  <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={haber.yazar.fotograf}
                      alt={haber.yazar.isim ?? "Yazar"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="mx-auto h-20 w-20 rounded-full bg-gray-200" />
                )}
                <p className="mt-4 font-sans text-xs uppercase tracking-wide text-gray-500">
                  YAZAN
                </p>
                <p className="mt-1 text-lg font-bold">{haber.yazar.isim ?? ""}</p>
                {haber.yazar.unvan && (
                  <p className="text-sm text-gray-600">{haber.yazar.unvan}</p>
                )}
                {yazarSlug && (
                  <Link
                    href={`/ekip/${yazarSlug}`}
                    className="mt-4 block font-sans text-sm underline hover:no-underline"
                  >
                    Profili gör →
                  </Link>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
