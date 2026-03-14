import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { yaziBySlugQuery, yazilarListQuery } from "@/lib/queries";
import { type PortableTextBlock, PortableText } from "@portabletext/react";

const playfair = Playfair_Display({ subsets: ["latin"] });

function kategoriLabel(k: string | undefined) {
  const map: Record<string, string> = {
    Arastirma: "Araştırma",
    Klinik: "Klinik Psikoloji",
    Gelisim: "Gelişim Psikolojisi",
    Sosyal: "Toplum & Kültür",
    Guncel: "Güncel",
  };
  return (k && map[k]) ?? k ?? "";
}

function formatTarih(tarih: string | undefined) {
  if (!tarih) return "";
  return new Date(tarih).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Yazi = {
  _id: string;
  baslik: string;
  slug: { current: string };
  tarih?: string;
  kategori?: string;
  ozet?: string;
  icerik?: unknown[];
  birim?: string;
  kapakGorseli?: string;
  sesUrl?: string;
  sesDosyasiUrl?: string;
  yazar?: {
    isim?: string;
    unvan?: string;
    biyografi?: string;
    fotograf?: string;
    slug?: { current: string } | string;
    sosyalMedya?: unknown;
  };
};

export default async function YazıDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const yazi = (await client
    .fetch<Yazi | null>(yaziBySlugQuery, { slug })
    .catch(() => null)) as Yazi | null;

  if (!yazi) {
    return (
      <div
        className={`${playfair.className} flex min-h-screen items-center justify-center p-24`}
      >
        <p className="text-center text-gray-500">Yazı bulunamadı.</p>
      </div>
    );
  }

  const ilgiliYazilar = await client
    .fetch<
      { _id: string; baslik: string; slug: { current: string }; kategori?: string; kapakGorseli?: string; yazar?: { isim?: string } }[]
    >(yazilarListQuery)
    .then((list) => list.filter((y) => y._id !== yazi._id).slice(0, 3))
    .catch(() => []);

  const yazarSlug = yazi.yazar?.slug
    ? typeof yazi.yazar.slug === "object"
      ? yazi.yazar.slug.current
      : String(yazi.yazar.slug)
    : null;

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* Hero */}
      <section className="flex min-h-screen w-full">
        <div className="flex w-1/2 items-center bg-[#e8e4dc] px-16">
          <div className="max-w-xl space-y-6">
            <p className="text-xs italic uppercase tracking-wide text-gray-600">
              {kategoriLabel(yazi.kategori)}
            </p>
            <h1 className="text-4xl font-normal leading-tight md:text-5xl">
              {yazi.baslik}
            </h1>
            {yazi.ozet && (
              <p className="text-xl italic leading-relaxed text-gray-600">
                {yazi.ozet}
              </p>
            )}
            <p className="font-sans text-sm text-gray-700">
              by {yazi.yazar?.isim ?? "Bilinmiyor"}
              {yazi.yazar?.unvan ? `, ${yazi.yazar.unvan}` : ""}
            </p>
          </div>
        </div>
        <div
          className="h-screen w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: yazi.kapakGorseli
              ? `url('${yazi.kapakGorseli}')`
              : "url('https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1200')",
          }}
        />
      </section>

      {/* Article body */}
      <section className="w-full bg-white">
        <div className="flex w-full">
          <aside className="sticky top-24 hidden w-1/5 flex-shrink-0 px-8 py-16 lg:block">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              KATEGORİLER
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {yazi.kategori && (
                <span className="rounded-full border border-gray-300 px-3 py-1 font-sans text-sm">
                  {kategoriLabel(yazi.kategori)}
                </span>
              )}
            </div>
            <div className="mt-6 h-px w-full bg-gray-200" />
            {yazi.tarih && (
              <p className="mt-4 font-sans text-xs text-gray-500">
                Yayınlanma: {formatTarih(yazi.tarih)}
              </p>
            )}
          </aside>

          <div className="w-full flex-1 py-16 lg:w-3/5">
            <div className="mx-auto max-w-2xl px-6">
              {(yazi.sesUrl || yazi.sesDosyasiUrl) && (
                <div className="mb-10 bg-black px-6 py-4 text-white">
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/80">
                    Dinle
                  </p>
                  {yazi.sesUrl ? (
                    <audio
                      controls
                      className="w-full"
                      src={yazi.sesUrl}
                      preload="metadata"
                    >
                      Tarayıcınız ses oynatmayı desteklemiyor.
                    </audio>
                  ) : yazi.sesDosyasiUrl ? (
                    <a
                      href={yazi.sesDosyasiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-sm underline underline-offset-2 hover:no-underline"
                    >
                      Dinle →
                    </a>
                  ) : null}
                </div>
              )}
              {yazi.icerik && yazi.icerik.length > 0 ? (
                <article className="font-serif [&_p]:mb-8 [&_p]:text-lg [&_p]:leading-relaxed [&_blockquote]:mb-8 [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-gray-50 [&_blockquote]:py-6 [&_blockquote]:pl-6 [&_blockquote]:pr-6 [&_blockquote]:font-serif [&_blockquote]:text-2xl [&_blockquote]:italic">
                  <PortableText value={yazi.icerik as PortableTextBlock[]} />
                </article>
              ) : (
                yazi.ozet && (
                  <p className="text-lg leading-relaxed text-gray-800">
                    {yazi.ozet}
                  </p>
                )
              )}
            </div>
          </div>

          {yazi.yazar && (
            <aside className="sticky top-24 hidden w-1/5 flex-shrink-0 px-8 py-16 lg:block">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                {yazi.yazar.fotograf ? (
                  <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={yazi.yazar.fotograf}
                      alt={yazi.yazar.isim ?? "Yazar"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="mx-auto h-20 w-20 rounded-full bg-gray-200" />
                )}
                <p className="mt-4 text-xs uppercase tracking-wide text-gray-500">
                  Yazan
                </p>
                <p className="mt-1 text-lg font-bold">{yazi.yazar.isim ?? ""}</p>
                {yazi.yazar.unvan && (
                  <p className="text-sm text-gray-600">{yazi.yazar.unvan}</p>
                )}
                {yazi.yazar.biyografi && (
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {yazi.yazar.biyografi}
                  </p>
                )}
                {yazarSlug && (
                  <Link
                    href={`/ekip/${yazarSlug}`}
                    className="mt-4 block text-sm underline hover:no-underline"
                  >
                    Profili gör →
                  </Link>
                )}
              </div>
            </aside>
          )}
        </div>
      </section>

      {ilgiliYazilar.length > 0 && (
        <section className="w-full bg-gray-50 px-12 py-16">
          <h2 className="text-2xl font-normal">İlgili Yazılar</h2>
          <div className="mt-4 h-px w-full bg-black/10" />
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ilgiliYazilar.map((article) => (
              <Link
                key={article._id}
                href={`/yazilar/${article.slug?.current ?? ""}`}
                className="group block"
              >
                {article.kapakGorseli ? (
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
                    <Image
                      src={article.kapakGorseli}
                      alt={article.baslik}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full bg-gray-200" />
                )}
                <p className="mt-3 text-sm italic text-gray-500">
                  {kategoriLabel(article.kategori)}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug transition group-hover:text-gray-500">
                  {article.baslik}
                </h3>
                <p className="mt-2 font-sans text-xs uppercase tracking-wide text-gray-600">
                  by {article.yazar?.isim ?? ""}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
