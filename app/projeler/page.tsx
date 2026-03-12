"use client";

import { useState } from "react";
import { projeler, type Proje } from "@/data/projeler";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

export default function ProjelerPage() {
  const [aktifProje, setAktifProje] = useState<Proje | null>(null);

  return (
    <main className={`${playfair.className} min-h-screen bg-white`}>
      {/* HEADER */}
      <div className="px-12 pb-6 pt-16">
        <h1 className="font-playfair text-6xl font-bold leading-none tracking-tight md:text-8xl">
          Projeler
        </h1>
        <div className="mt-6 h-1 bg-black" />
      </div>

      {/* 3'LÜ GRID */}
      <div className="grid grid-cols-1 gap-8 px-12 py-12 md:grid-cols-2 lg:grid-cols-3">
        {projeler.map((proje) => (
          <div
            key={proje.id}
            onClick={() => setAktifProje(proje)}
            className="group cursor-pointer"
          >
            {/* GÖRSEL */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={proje.gorsel}
                alt={proje.baslik}
                fill
                className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              {/* Durum badge — üstte */}
              <div className="absolute left-4 top-4">
                <span
                  className={`px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${
                    proje.durum === "Devam Ediyor"
                      ? "bg-black text-white"
                      : proje.durum === "Tamamlandı"
                      ? "bg-white text-black"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {proje.durum}
                </span>
              </div>
            </div>

            {/* METİN */}
            <div className="pb-2 pt-5">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-400">
                {proje.kategori} · {proje.yil}
              </p>
              <h2 className="font-playfair mb-2 text-2xl font-bold leading-snug underline-offset-4 decoration-1 group-hover:underline">
                {proje.baslik}
              </h2>
              <p className="font-playfair mb-3 text-sm italic text-gray-500">
                {proje.altBaslik}
              </p>
              <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                {proje.aciklama}
              </p>
              <button className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-400 transition-colors group-hover:text-black">
                Detayları Gör →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* OVERLAY */}
      {aktifProje && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={() => setAktifProje(null)}
        />
      )}

      {/* BOTTOM DRAWER */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white transition-transform duration-500 ease-in-out ${
          aktifProje ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "85vh", overflowY: "auto" }}
      >
        {aktifProje && (
          <div className="px-8 py-10 md:px-16 md:py-12">
            {/* Kapat butonu */}
            <button
              onClick={() => setAktifProje(null)}
              className="absolute right-8 top-6 text-2xl text-gray-400 transition-colors hover:text-black"
              aria-label="Kapat"
            >
              ✕
            </button>

            {/* Drag handle */}
            <div className="mx-auto mb-10 h-1 w-12 rounded-full bg-gray-200" />

            {/* İÇERİK — 2 kolon */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
              {/* Sol kolon */}
              <div>
                {/* Durum + kategori */}
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className={`border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${
                      aktifProje.durum === "Devam Ediyor"
                        ? "border-black bg-black text-white"
                        : "border-black bg-white text-black"
                    }`}
                  >
                    {aktifProje.durum}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    {aktifProje.kategori} · {aktifProje.yil}
                  </span>
                </div>

                <h2 className="font-playfair mb-2 text-4xl font-bold leading-tight">
                  {aktifProje.baslik}
                </h2>
                <p className="font-playfair mb-6 text-lg italic text-gray-500">
                  {aktifProje.altBaslik}
                </p>
                <p className="mb-8 text-sm leading-relaxed text-gray-700">
                  {aktifProje.aciklama}
                </p>

                {/* Detay maddeleri */}
                <ul className="mb-8 space-y-3">
                  {aktifProje.detay.map((madde, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-gray-600"
                    >
                      <span className="mt-1 flex-shrink-0 text-gray-300">
                        —
                      </span>
                      <span>{madde}</span>
                    </li>
                  ))}
                </ul>

                {/* Butonlar */}
                <div className="flex flex-wrap gap-4">
                  {aktifProje.raporSlug && (
                    <Link
                      href={`/yayinlar/proje-raporlari/${aktifProje.raporSlug}`}
                      className="bg-black px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-gray-800"
                    >
                      Proje Raporunu İncele
                    </Link>
                  )}
                  {aktifProje.kitapcikUrl && (
                    <a
                      href={aktifProje.kitapcikUrl}
                      className="border-2 border-black px-6 py-3 text-xs uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white"
                    >
                      Kitapçığı İndir
                    </a>
                  )}
                </div>
              </div>

              {/* Sağ kolon */}
              <div>
                {/* İSTATİSTİKLER */}
                {aktifProje.istatistikler &&
                  aktifProje.istatistikler.length > 0 && (
                    <div className="mb-8 grid grid-cols-2 gap-4">
                      {aktifProje.istatistikler.map((ist, i) => (
                        <div
                          key={i}
                          className="border border-gray-100 p-5"
                        >
                          <p className="font-playfair text-3xl font-bold">
                            {ist.deger}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-400">
                            {ist.etiket}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                {/* ORTAKLAR */}
                {aktifProje.ortaklar && aktifProje.ortaklar.length > 0 && (
                  <div className="mb-8">
                    <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-400">
                      Proje Ortakları
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                      {aktifProje.ortaklar.map((ortak, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3"
                        >
                          {ortak.logo ? (
                            <img
                              src={ortak.logo}
                              alt={ortak.isim}
                              className="h-8 object-contain grayscale"
                            />
                          ) : (
                            <span className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600">
                              {ortak.isim}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GALERİ */}
                {aktifProje.galeri && aktifProje.galeri.length > 1 && (
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-400">
                      Galeri
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {aktifProje.galeri.map((img, i) => (
                        <div
                          key={i}
                          className="relative aspect-video overflow-hidden"
                        >
                          <Image
                            src={img}
                            alt={`Görsel ${i + 1}`}
                            fill
                            className="object-cover grayscale transition-all duration-300 hover:grayscale-0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

