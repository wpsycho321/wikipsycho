"use server";

import { Playfair_Display } from "next/font/google";
import { client } from "@/lib/sanity";
import { videolarQuery } from "@/lib/queries";

const playfair = Playfair_Display({ subsets: ["latin"] });

type Video = {
  _id: string;
  baslik: string;
  altBaslik?: string;
  youtubeUrl: string;
  thumbnail?: string;
  tarih?: string;
  sure?: string;
  kategori?: string;
  aciklama?: string;
  yazar?: string;
};

function getKategoriler(videolar: Video[]) {
  const set = new Set<string>();
  videolar.forEach((v) => {
    if (v.kategori) set.add(v.kategori);
  });
  return ["Tümü", ...Array.from(set)];
}

export default async function VideolarPage() {
  const videolar: Video[] = await client.fetch(videolarQuery).catch(() => []);
  const tumKategoriler = getKategoriler(videolar);

  return (
    <main className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* HEADER */}
      <div className="px-12 pb-6 pt-16">
        <h1 className="text-6xl font-bold leading-none tracking-tight md:text-8xl">
          Videolar
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

      {/* VİDEO LİSTESİ */}
      <div className="max-w-6xl px-12 py-12">
        {videolar.length === 0 ? (
          <p className="py-16 text-center font-sans text-gray-500">
            Henüz video eklenmemiş.
          </p>
        ) : (
        videolar.map((video) => (
          <a
            key={video._id}
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group -mx-12 flex flex-col-reverse gap-8 border-b border-gray-100 px-12 py-10 transition-colors hover:bg-gray-50 md:flex-row md:items-start md:gap-10 lg:gap-12"
          >
            {/* Sol: metin */}
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-400 italic">
                {video.kategori}
              </p>
              <h2 className="mb-2 text-2xl font-bold leading-snug underline-offset-4 decoration-1 group-hover:underline">
                {video.baslik}
              </h2>
              {video.altBaslik && (
                <p className="mb-3 text-base italic text-gray-500">
                  {video.altBaslik}
                </p>
              )}
              <p className="mb-4 max-w-xl text-sm leading-relaxed text-gray-600">
                {video.aciklama}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em] text-gray-400">
                {video.yazar && <span>BY {video.yazar.toUpperCase()}</span>}
                <span>{video.tarih}</span>
                <span>{video.sure}</span>
                <span className="font-medium text-black group-hover:underline">
                  YouTube&apos;da İzle →
                </span>
              </div>
            </div>

            {/* Sağ: thumbnail — geniş 16:9 alan, kırpma yok (object-contain) */}
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-sm bg-gray-200 md:w-[min(100%,28rem)] lg:w-[min(100%,34rem)]">
              <img
                src={video.thumbnail ?? ""}
                alt={video.baslik}
                className="h-full w-full object-contain object-center grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
          </a>
        )))}
      </div>
    </main>
  );
}

