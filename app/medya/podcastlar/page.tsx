"use client";

import { useMemo, useState } from "react";
import { podcastlar } from "@/data/medya";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const tumKategoriler = [
  "Tümü",
  ...Array.from(new Set(podcastlar.map((p) => p.kategori))),
];

export default function PodcastlarPage() {
  const [aktifKategori, setAktifKategori] = useState("Tümü");

  const filtreliPodcastlar = useMemo(
    () =>
      aktifKategori === "Tümü"
        ? podcastlar
        : podcastlar.filter((p) => p.kategori === aktifKategori),
    [aktifKategori]
  );

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
            <button
              key={kategori}
              onClick={() => setAktifKategori(kategori)}
              className={`-mb-px whitespace-nowrap border-b-2 py-4 text-sm transition-colors ${
                aktifKategori === kategori
                  ? "border-black font-semibold text-black"
                  : "border-transparent text-gray-400 hover:text-black"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>
      </div>

      {/* PODCAST LİSTESİ */}
      <div className="max-w-5xl px-12 py-12">
        {filtreliPodcastlar.map((podcast) => (
          <a
            key={podcast.id}
            href={podcast.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="-mx-12 flex gap-8 border-b border-gray-100 px-12 py-10 transition-colors hover:bg-gray-50 group"
          >
            {/* Sol: metin */}
            <div className="flex-1">
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
              <p className="mb-4 max-w-xl text-sm leading-relaxed text-gray-600">
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

            {/* Sağ: görsel */}
            <div className="h-36 w-36 flex-shrink-0 overflow-hidden">
              <img
                src={podcast.gorselUrl}
                alt={podcast.baslik}
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}

