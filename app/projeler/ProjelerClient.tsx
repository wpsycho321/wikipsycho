"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Proje } from "./page";

type Props = {
  projeler: Proje[];
};

function getSlugValue(slug: Proje["slug"]) {
  return typeof slug === "string" ? slug : slug?.current;
}

export default function ProjelerClient({ projeler }: Props) {
  const [aktifProje, setAktifProje] = useState<Proje | null>(null);

  return (
    <>
      {/* HEADER */}
      <div className="px-12 pb-6 pt-16">
        <h1 className="font-playfair text-6xl font-bold leading-none tracking-tight md:text-8xl">
          Projeler
        </h1>
        <div className="mt-6 h-1 bg-black" />
      </div>

      {/* 3'LÜ GRID */}
      <div className="grid grid-cols-1 gap-8 px-12 py-12 md:grid-cols-2 lg:grid-cols-3">
        {projeler.length === 0 ? (
          <p className="col-span-full py-16 text-center font-sans text-gray-500">
            Henüz proje eklenmemiş.
          </p>
        ) : (
        projeler.map((proje) => {
          const slug = getSlugValue(proje.slug);
          if (!slug) return null;

          return (
            <div
              key={proje._id}
              onClick={() => setAktifProje(proje)}
              className="group cursor-pointer"
            >
              {/* GÖRSEL */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {proje.gorsel && (
                  <Image
                    src={proje.gorsel}
                    alt={proje.baslik}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                )}
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
                <Link
                  href={`/projeler/${slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-gray-400 transition-colors group-hover:text-black"
                >
                  Detayları Gör →
                </Link>
              </div>
            </div>
          );
        })
        )}
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
                            {ist.sayi}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-400">
                            {ist.aciklama}
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
                    <div className="flex flex-wrap items-center gap-3">
                      {aktifProje.ortaklar.map((ortak, i) => (
                        <span
                          key={i}
                          className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600"
                        >
                          {ortak}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

