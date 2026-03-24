"use server";

import { Playfair_Display } from "next/font/google";
import { client } from "@/lib/sanity";
import { podcastlarQuery } from "@/lib/queries";

const playfair = Playfair_Display({ subsets: ["latin"] });

type Podcast = {
  _id: string;
  baslik: string;
  altBaslik?: string;
  spotifyUrl: string;
  gorselUrl?: string;
  tarih?: string;
  sure?: string;
  kategori?: string;
  aciklama?: string;
  konuk?: string;
};

function getKategoriler(podcastlar: Podcast[]) {
  const set = new Set<string>();
  podcastlar.forEach((p) => {
    if (p.kategori) set.add(p.kategori);
  });
  return ["Tümü", ...Array.from(set)];
}

export default async function PodcastlarPage() {
  const podcastlar: Podcast[] = await client.fetch(podcastlarQuery).catch(() => []);
  const tumKategoriler = getKategoriler(podcastlar);

  return (
    <main className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* HEADER */}
      <div className="px-12 pb-6 pt-16">
        <h1 className="text-6xl font-bold leading-none tracking-tight md:text-8xl">
          Podcastlar
        </h1>
        <div className="mt-6 h-1 bg-black" />
      </div>

      {/* KATEGORİ SEKMELERİ — sticky */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="flex gap-8 overflow-x-auto px-12 scrollbar-hide">
          {tumKategoriler.map((kategori) => (
            <span
              key={kategori}
              className="border-b-2 border-transparent py-4 text-sm text-gray-400"
            >
              {kategori}
            </span>
          ))}
        </div>
      </div>

      {/* PODCAST LİSTESİ — satırda ~%60 metin / ~%40 görsel */}
      <div className="max-w-7xl px-12 py-12">
        {podcastlar.length === 0 ? (
          <p className="py-16 text-center font-sans text-gray-500">
            Henüz podcast eklenmemiş.
          </p>
        ) : (
        podcastlar.map((podcast) => (
          <a
            key={podcast._id}
            href={podcast.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group -mx-12 grid grid-cols-1 gap-8 border-b border-gray-100 px-12 py-10 transition-colors hover:bg-gray-50 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start md:gap-10 lg:gap-12"
          >
            {/* Sol: metin (~60%) */}
            <div className="order-2 min-w-0 md:order-1">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-400 italic">
                {podcast.kategori}
              </p>
              <h2 className="mb-2 text-2xl font-bold leading-snug underline-offset-4 decoration-1 group-hover:underline">
                {podcast.baslik}
              </h2>
              {podcast.altBaslik && (
                <p className="mb-3 text-base italic text-gray-500">
                  {podcast.altBaslik}
                </p>
              )}
              <p className="mb-4 max-w-none text-sm leading-relaxed text-gray-600">
                {podcast.aciklama}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em] text-gray-400">
                {podcast.konuk && (
                  <span>KONUK: {podcast.konuk.toUpperCase()}</span>
                )}
                <span>{podcast.tarih}</span>
                <span>{podcast.sure}</span>
                <span className="font-medium text-black group-hover:underline">
                  Spotify&apos;da Dinle →
                </span>
              </div>
            </div>

            {/* Sağ: kapak (~40%) — podcast görselleri için kare oran, kırpma yok */}
            <div className="relative order-1 aspect-square w-full min-w-0 overflow-hidden rounded-sm bg-gray-200 md:order-2">
              <img
                src={podcast.gorselUrl ?? ""}
                alt={podcast.baslik}
                className="h-full w-full object-contain object-center grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
          </a>
        )))}
      </div>
    </main>
  );
}

