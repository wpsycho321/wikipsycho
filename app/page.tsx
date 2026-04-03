import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { client } from "@/lib/sanity";
import {
  duyurularQuery,
  ayinTemasiQuery,
  oncuYazarQuery,
  yazilarHomepageQuery,
  haberlerHomepageQuery,
  eyayinlarHomepageQuery,
  videolarQuery,
  podcastlarQuery,
  projelerQuery,
  etkinliklerQuery,
} from "@/lib/queries";
import HomeHeroSlider from "./components/HomeHeroSlider";

const playfair = Playfair_Display({ subsets: ["latin"] });

function formatTarih(tarih: string | undefined) {
  if (!tarih) return "";
  return new Date(tarih).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).toUpperCase();
}

function kategoriLabel(kategori: string | undefined) {
  const map: Record<string, string> = {
    Arastirma: "Araştırma",
    Klinik: "Klinik Psikoloji",
    Gelisim: "Gelişim Psikolojisi",
    Sosyal: "Toplum & Kültür",
    Guncel: "Güncel",
  };
  return (kategori && map[kategori]) ?? kategori ?? "";
}

export default async function Home() {
  const [
    duyurular,
    yazilarRes,
    haberlerRes,
    videolarRes,
    podcastlarRes,
    oncuYazar,
    ayinTemasi,
    eyayinlarRes,
    projelerRes,
    etkinliklerRes,
  ] = await Promise.all([
    client.fetch<{ _id: string; metin: string; link?: string }[]>(duyurularQuery),
    client.fetch<
      {
        _id: string;
        baslik: string;
        slug: { current: string };
        tarih?: string;
        kategori?: string;
        ozet?: string;
        "kapakGorseli"?: string;
        yazar?: { isim?: string };
      }[]
    >(yazilarHomepageQuery),
    client.fetch<
      {
        _id: string;
        baslik: string;
        slug: { current: string };
        ozet?: string;
        tarih?: string;
        kategori?: string;
        kaynak?: string;
        kapakGorseli?: string;
        yazar?: { isim?: string; foto?: string };
      }[]
    >(haberlerHomepageQuery),
    client.fetch<
      {
        _id: string;
        baslik: string;
        altBaslik?: string;
        youtubeUrl?: string;
        thumbnailUrl?: string;
        sure?: string;
        aciklama?: string;
        kategori?: string;
        yazar?: string;
      }[]
    >(videolarQuery),
    client.fetch<
      {
        _id: string;
        baslik: string;
        altBaslik?: string;
        spotifyUrl?: string;
        gorselUrl?: string;
        sure?: string;
        aciklama?: string;
        konuk?: string;
      }[]
    >(podcastlarQuery),
    client.fetch<{
      _id: string;
      isim?: string;
      slug?: { current: string };
      unvan?: string;
      fotograf?: string;
      yazilari?: {
        baslik: string;
        slug: { current: string };
        ozet?: string;
        kapakGorseli?: string;
      }[];
    } | null>(oncuYazarQuery),
    client.fetch<{
      ay?: string;
      tema?: string;
      aciklama?: string;
      gorsel?: string;
    } | null>(ayinTemasiQuery),
    client.fetch<
      {
        _id: string;
        baslik: string;
        slug: { current: string };
        altBaslik?: string;
        ozet?: string;
        hazirlayanlar?: string[];
        kapakGorseli?: string;
      }[]
    >(eyayinlarHomepageQuery),
    client.fetch(projelerQuery),
    client.fetch(etkinliklerQuery),
  ]);

  const yazilar = yazilarRes ?? [];
  const haberler = haberlerRes ?? [];
  const sonVideo = videolarRes?.[0];
  const sonPodcast = podcastlarRes?.[0];
  const sonEyayin = Array.isArray(eyayinlarRes) ? eyayinlarRes[0] : eyayinlarRes;
  const guncelYazilar = yazilar.slice(0, 4);

  const sonEyayinCard = Array.isArray(eyayinlarRes) ? eyayinlarRes[0] : eyayinlarRes;
  const sonProje = Array.isArray(projelerRes) ? projelerRes[0] : null;
  const sonEtkinlik = Array.isArray(etkinliklerRes) ? etkinliklerRes[0] : null;

  function getSlug(slug: { current: string } | string | undefined) {
    return typeof slug === "string" ? slug : slug?.current ?? "";
  }

  const featuredCards = [
    sonEyayinCard && {
      tag: "E-YAYIN",
      title: sonEyayinCard.baslik,
      description: sonEyayinCard.ozet ?? "",
      meta: (sonEyayinCard.hazirlayanlar ?? []).join(", "),
      image:
        (sonEyayinCard as { kapakGorseli?: string }).kapakGorseli ??
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
      href: `/yayinlar/e-yayinlar/${getSlug(sonEyayinCard.slug)}`,
    },
    sonProje && {
      tag: "PROJE",
      title: sonProje.baslik,
      description: sonProje.aciklama ?? "",
      meta: sonProje.yil ?? "",
      image:
        sonProje.gorsel ??
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      href: `/projeler/${getSlug(sonProje.slug)}`,
    },
    sonEtkinlik && {
      tag: "ETKİNLİK",
      title: sonEtkinlik.baslik,
      description: sonEtkinlik.aciklama ?? "",
      meta: (formatTarih(sonEtkinlik.tarih) || sonEtkinlik.konum) ?? "",
      image:
        sonEtkinlik.gorsel ??
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
      href: `/hakkimizda/etkinlikler/${getSlug(sonEtkinlik.slug)}`,
    },
  ].filter(Boolean) as { tag: string; title: string; description: string; meta: string; image: string; href: string }[];

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* Duyuru ticker */}
      {duyurular && duyurular.length > 0 && (
        <div className="overflow-hidden border-b border-black/10 bg-[#f9f9f9] py-2">
          <div
            className="flex gap-8 whitespace-nowrap text-xs uppercase tracking-[0.2em] text-gray-600 [&>a]:inline-block [&>a]:shrink-0 [&>span]:inline-block [&>span]:shrink-0"
            style={{ animation: "marquee 25s linear infinite" }}
          >
            {[...duyurular, ...duyurular].map((d, i) =>
              d.link ? (
                <Link
                  key={`${d._id}-${i}`}
                  href={d.link}
                  className="hover:underline"
                >
                  {d.metin} →
                </Link>
              ) : (
                <span key={`${d._id}-${i}`}>{d.metin}</span>
              )
            )}
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="flex min-h-[80vh] w-full flex-col md:flex-row">
        <div className="flex w-full items-center bg-white py-10 md:w-1/2 md:py-0">
          <div className="px-6 md:px-16">
            <p className="mb-4 text-xs tracking-[0.25em]">PSİKOLOJİ TOPLULUĞU</p>
            <h1 className="mb-6 text-5xl leading-tight md:text-6xl">
              Psikolojiyi Anlat, Paylaş, Dönüştür!
            </h1>
            <p className="max-w-xl font-sans text-sm leading-relaxed">
              WikiPsycho, psikoloji alanında merak eden, üreten ve paylaşan
              insanları bir araya getiren bağımsız bir içerik platformudur.
              Araştırmadan sanata, klinik bilgiden gündelik yaşama kadar
              psikolojiyi herkes için erişilebilir kılıyoruz.
            </p>
          </div>
        </div>
        {featuredCards.length > 0 && (
          <div className="flex min-h-[50vw] w-full md:min-h-0 md:w-1/2">
            <HomeHeroSlider cards={featuredCards} />
          </div>
        )}
      </section>

      <main className="flex w-full flex-col gap-16 px-0 pb-12 pt-10">
        {/* Three-column editorial */}
        <section className="w-full border-t border-black/10 bg-white">
          <div className="flex flex-col md:flex-row">
            {/* Güncel Yazılar */}
            <div className="w-full border-b border-black/10 px-6 py-10 md:w-1/4 md:border-b-0 md:border-r">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                GÜNCEL YAZILAR
              </p>
              <div className="mt-3 h-px w-full bg-black/10" />
              <div className="mt-6 space-y-6">
                {guncelYazilar.map((yazi, i) => (
                  <article key={yazi._id} className="space-y-3">
                    <Link href={`/yazilar/${yazi.slug?.current ?? ""}`}>
                      <div
                        className="w-full rounded-sm bg-gray-200 bg-cover bg-center pb-[66%]"
                        style={{
                          backgroundImage: yazi.kapakGorseli
                            ? `url(${yazi.kapakGorseli})`
                            : "none",
                        }}
                      />
                      <p className="mt-3 text-sm italic text-gray-500">
                        {kategoriLabel(yazi.kategori)}
                      </p>
                      <h3 className="text-xl font-bold leading-snug">
                        {yazi.baslik}
                      </h3>
                      <p className="font-sans text-sm leading-relaxed text-gray-600">
                        {yazi.ozet ?? ""}
                      </p>
                      <p className="font-sans text-xs uppercase tracking-wide text-gray-800">
                        by {yazi.yazar?.isim ?? ""}
                      </p>
                    </Link>
                    {i < guncelYazilar.length - 1 && (
                      <div className="h-px w-full bg-black/10" />
                    )}
                  </article>
                ))}
              </div>
            </div>

            {/* Video & Podcast */}
            <div className="w-full border-b border-black/10 px-6 py-10 md:w-2/4 md:border-b-0 md:border-r">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                VİDEO &amp; PODCAST
              </p>
              <div className="mt-3 h-px w-full bg-black/10" />
              <div className="mt-6 space-y-8">
                {sonPodcast && (
                  <article className="space-y-4">
                    <a
                      href={sonPodcast.spotifyUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div
                        className="relative w-full overflow-hidden rounded-sm bg-gray-300 bg-cover bg-center pb-[56.25%]"
                        style={{
                          backgroundImage: sonPodcast.gorselUrl
                            ? `url(${sonPodcast.gorselUrl})`
                            : "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200')",
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
                            <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-black" />
                          </div>
                        </div>
                        {sonPodcast.sure && (
                          <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 font-sans text-xs uppercase tracking-wide text-black">
                            {sonPodcast.sure}
                          </div>
                        )}
                      </div>
                    </a>
                    <p className="text-sm italic text-gray-500">Podcast</p>
                    <h3 className="text-3xl font-bold leading-snug">
                      {sonPodcast.baslik}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-gray-600">
                      {sonPodcast.aciklama ?? ""}
                    </p>
                    <p className="font-sans text-xs uppercase tracking-wide text-gray-800">
                      with {sonPodcast.konuk ?? ""}
                    </p>
                  </article>
                )}
                {sonPodcast && sonVideo && (
                  <div className="h-px w-full bg-black/10" />
                )}
                {sonVideo && (
                  <article className="space-y-3">
                    <a
                      href={sonVideo.youtubeUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div
                        className="w-full rounded-sm bg-gray-300 bg-cover bg-center pb-[40%]"
                        style={{
                          backgroundImage: sonVideo.thumbnailUrl
                            ? `url(${sonVideo.thumbnailUrl})`
                            : "url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900')",
                        }}
                      />
                    </a>
                    <p className="text-sm italic text-gray-500">Video</p>
                    <h3 className="text-xl font-bold leading-snug">
                      {sonVideo.baslik}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-wide text-gray-800">
                      with {sonVideo.yazar ?? ""}
                    </p>
                  </article>
                )}
                {!sonPodcast && !sonVideo && (
                  <p className="font-sans text-sm text-gray-500">
                    Henüz video veya podcast eklenmemiş.
                  </p>
                )}
              </div>
            </div>

            {/* Psikoloji Haberleri — only show when haberler exist */}
            {haberler.length > 0 && (
              <div className="w-full px-6 py-10 md:w-1/4">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                  PSİKOLOJİ HABERLERİ
                </p>
                <div className="mt-3 h-px w-full bg-black/10" />
                <div className="mt-6 space-y-6">
                  {haberler.map((haber, i) => {
                    const slug = haber.slug?.current ?? "";
                    const haberyazar = haber.yazar as { isim?: string; foto?: string } | undefined;
                    const haberImg = haber.kapakGorseli || haberyazar?.foto;
                    return (
                      <article key={haber._id}>
                        <Link href={`/haberler/${slug}`} className="flex gap-4">
                          <div className="min-w-0 flex-1">
                            {haber.kategori && (
                              <span className="inline-block border border-gray-200 px-2 py-0.5 font-sans text-[10px] uppercase tracking-wide text-gray-500">
                                {kategoriLabel(haber.kategori)}
                              </span>
                            )}
                            <h3 className="mt-2 text-lg font-bold leading-snug">
                              {haber.baslik}
                            </h3>
                            <p className="mt-1 font-sans text-xs text-gray-400">
                              {formatTarih(haber.tarih)}
                            </p>
                            {haber.ozet && (
                              <p className="mt-2 line-clamp-1 font-sans text-sm text-gray-600">
                                {haber.ozet}
                              </p>
                            )}
                            {haberyazar?.isim && (
                              <p className="mt-2 font-sans text-xs text-gray-500">
                                {haberyazar.isim}
                              </p>
                            )}
                          </div>
                          {haberImg && (
                            <div className="w-20 flex-shrink-0 sm:w-24">
                              <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-gray-200">
                                <Image
                                  src={haberImg}
                                  alt={haber.baslik}
                                  fill
                                  className="object-cover"
                                  sizes="96px"
                                />
                              </div>
                            </div>
                          )}
                        </Link>
                        {i < haberler.length - 1 && (
                          <div className="mt-6 h-px w-full bg-black/10" />
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* E-Yayın banner */}
        {sonEyayin && (
          <section className="flex min-h-[70vh] w-full flex-col md:flex-row">
            <Link
              href={`/yayinlar/e-yayinlar/${sonEyayin.slug?.current ?? ""}`}
              className="flex w-full md:w-[30%]"
            >
              <div className="flex w-full items-center justify-center bg-black px-8 py-10 text-center text-white">
                <div className="max-w-md space-y-4">
                  <p className="text-sm italic text-gray-300">E-Yayın</p>
                  <h2 className="text-3xl md:text-4xl">{sonEyayin.baslik}</h2>
                  <p className="font-sans text-sm leading-relaxed text-gray-300">
                    {sonEyayin.ozet ?? ""}
                  </p>
                  <p className="font-sans italic uppercase tracking-wide text-white">
                    by {(sonEyayin.hazirlayanlar ?? []).join(", ")}
                  </p>
                </div>
              </div>
            </Link>
            <div
              className="hidden w-full bg-cover bg-center md:block md:w-[70%]"
              style={{
                backgroundImage: sonEyayin.kapakGorseli
                  ? `url(${sonEyayin.kapakGorseli})`
                  : "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200')",
              }}
            />
          </section>
        )}

        {/* Köşe Yazısı — Big Think: solda 1 büyük öne çıkan, sağda 3 küçük alt alta */}
        {oncuYazar && (() => {
          const yazilar = oncuYazar.yazilari ?? [];
          const buyukYazi = yazilar[0];
          const kucukYazilar = yazilar.slice(1, 4);
          return (
            <section className="w-full bg-white">
              <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="text-center">
                  <h2 className="text-3xl tracking-wide">
                    <span className="font-bold">KÖŞE</span>
                    <span className="font-normal"> YAZARI</span>
                  </h2>
                  <p className="mt-2 font-serif italic text-gray-600">
                    Psikoloji üzerine düşünen, sorgulayan ve yazan bir ses.
                  </p>
                  <p className="mt-1 font-sans text-sm text-gray-500">
                    with {oncuYazar.isim ?? ""}
                  </p>
                </div>
                <div className="mt-10 flex flex-col gap-6 border-t border-black/10 pt-10 lg:flex-row">
                  {/* Sol: tek büyük öne çıkan yazı */}
                  {buyukYazi && (
                    <div className="min-w-0 flex-1 lg:max-w-[58%]">
                      <Link
                        href={`/yazilar/${buyukYazi.slug?.current ?? ""}`}
                        className="block"
                      >
                        <div
                          className="w-full overflow-hidden rounded-sm bg-gray-200 bg-cover bg-center pb-[56%]"
                          style={{
                            backgroundImage: buyukYazi.kapakGorseli
                              ? `url(${buyukYazi.kapakGorseli})`
                              : "none",
                          }}
                        />
                        <h3 className="mt-4 text-2xl font-bold leading-snug lg:text-3xl">
                          {buyukYazi.baslik}
                        </h3>
                        {buyukYazi.ozet && (
                          <p className="mt-2 line-clamp-2 font-sans text-sm text-gray-500">
                            {buyukYazi.ozet}
                          </p>
                        )}
                        <p className="mt-2 font-sans text-xs uppercase tracking-wide text-gray-600">
                          by {oncuYazar.isim ?? ""}
                        </p>
                      </Link>
                    </div>
                  )}
                  {/* Sağ: 3 küçük yazı alt alta */}
                  <div className="flex w-full flex-col gap-6 lg:w-[42%] lg:min-w-0">
                    {kucukYazilar.map((yazi) => (
                      <article key={yazi.baslik} className="flex gap-4">
                        <Link
                          href={`/yazilar/${yazi.slug?.current ?? ""}`}
                          className="flex min-w-0 flex-1 gap-4"
                        >
                          <div className="min-w-0 flex-1 space-y-1">
                            <h3 className="font-bold leading-snug text-gray-900">
                              {yazi.baslik}
                            </h3>
                            {yazi.ozet && (
                              <p className="line-clamp-2 font-sans text-sm italic text-gray-500">
                                {yazi.ozet}
                              </p>
                            )}
                            <p className="font-sans text-xs uppercase tracking-wide text-gray-600">
                              by {oncuYazar.isim ?? ""}
                            </p>
                          </div>
                          {yazi.kapakGorseli && (
                            <div
                              className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-200 bg-cover bg-center"
                              style={{
                                backgroundImage: `url(${yazi.kapakGorseli})`,
                              }}
                            />
                          )}
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* Ayın Teması */}
        {ayinTemasi && (
          <section className="w-full bg-white">
            <div className="mx-auto max-w-4xl px-6 py-12 text-center">
              <h2 className="text-3xl tracking-wide">
                <span className="font-bold">AY&apos;IN</span>
                <span className="font-normal"> TEMASI</span>
              </h2>
              <p className="mt-3 italic">
                Bu ay: {ayinTemasi.tema ?? ""}
              </p>
              <div className="mt-6 h-px w-full bg-black/10" />
            </div>
            <div className="flex flex-col border-t border-black/5 md:flex-row">
              <div className="w-full md:w-2/5 border-b border-black/10 md:border-b-0 md:border-r">
                <div className="px-6 py-6">
                  <p className="font-sans text-sm leading-relaxed text-gray-600">
                    {ayinTemasi.aciklama ?? ""}
                  </p>
                  <p className="mt-2 font-sans text-xs italic uppercase tracking-wide">
                    {ayinTemasi.ay ?? ""}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-3/5">
                <div className="flex h-full flex-col">
                  {ayinTemasi.gorsel && (
                    <div
                      className="w-full bg-cover bg-center pb-[56.25%]"
                      style={{
                        backgroundImage: `url(${ayinTemasi.gorsel})`,
                      }}
                    />
                  )}
                  <div className="px-6 py-6">
                    <h3 className="text-3xl font-bold leading-snug">
                      {ayinTemasi.tema ?? ""}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-gray-600">
                      {ayinTemasi.aciklama ?? ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Podcast discovery - keep hardcoded layout, can be made dynamic later */}
        <section className="w-full bg-[#f5f0eb] py-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
            <div className="max-w-4xl">
              <h2 className="leading-none">
                <span className="block text-6xl md:text-8xl">Keşfet</span>
                <span className="mt-2 inline-block text-3xl italic md:text-4xl">
                  bizim{" "}
                </span>
                <span className="inline-block align-middle font-sans text-3xl font-bold uppercase tracking-[0.3em] md:text-4xl">
                  PODCASTLARIMIZI
                </span>
              </h2>
              <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-gray-600">
                Psikoloji üzerine derinlemesine sohbetler. Araştırmacılar,
                klinisyenler ve düşünürlerle.
              </p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {(podcastlarRes ?? []).slice(0, 5).map((p) => (
                <article
                  key={p._id}
                  className="flex w-72 flex-shrink-0 flex-col"
                >
                  <a
                    href={p.spotifyUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div
                      className="relative aspect-square w-full bg-cover bg-center"
                      style={{
                        backgroundImage: p.gorselUrl
                          ? `url(${p.gorselUrl})`
                          : "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400')",
                      }}
                    >
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-black/0" />
                      <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 font-sans text-xs text-white">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black">
                          <div className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-black" />
                        </span>
                        {p.sure && (
                          <span className="rounded-full bg-black/80 px-3 py-1 text-[11px] uppercase tracking-wide">
                            {p.sure}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                  <div className="bg-black px-4 py-4 text-white">
                    <h3 className="text-lg font-bold leading-snug">
                      {p.baslik}
                    </h3>
                    <p className="mt-2 text-sm font-bold">{p.konuk ?? ""}</p>
                    <p className="mt-1 font-sans text-sm italic text-gray-400">
                      {p.altBaslik ?? ""}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
