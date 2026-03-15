"use client";

import { useState } from "react";
import Link from "next/link";

export type Rapor = {
  _id: string;
  slug: { current: string } | string;
  baslik: string;
  altBaslik?: string;
  yil?: string;
  tarih?: string;
  ozet?: string;
  katilimciSayisi?: number;
  yasGrubu?: string;
  mekan?: string;
  kapakGorseli?: string;
  hazirlayanlar?: string[];
};

type Props = {
  raporlar: Rapor[];
};

function getSlugValue(slug: Rapor["slug"]) {
  return typeof slug === "string" ? slug : slug?.current ?? "";
}

export default function ProjeRaporlariClient({ raporlar }: Props) {
  const [aktifRapor, setAktifRapor] = useState<Rapor | null>(null);

  return (
    <>
      <div className="min-h-screen bg-white text-black">
        {/* Page header */}
        <header className="px-12 py-20">
          <h1 className="font-playfair text-5xl font-normal md:text-6xl">
            Proje <span className="italic">Raporlarımız</span>
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-lg text-gray-500">
            WikiPsycho&apos;nun yürüttüğü projelerin bulgularını ve süreç
            değerlendirmelerini içeren akademik raporlar.
          </p>
          <div className="mt-8 h-1 w-full bg-black" />
        </header>

        {/* Report grid */}
        <section className="mx-auto max-w-6xl px-12 py-20 md:px-16">
          {raporlar.length === 0 ? (
            <p className="py-16 text-center font-sans text-gray-500">
              Henüz rapor eklenmemiş.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-16 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
              {raporlar.map((rapor) => {
                const slug = getSlugValue(rapor.slug);
                const hazirlayanIlk =
                  Array.isArray(rapor.hazirlayanlar) && rapor.hazirlayanlar[0];
                const hazirlayanSayisi = Array.isArray(rapor.hazirlayanlar)
                  ? rapor.hazirlayanlar.length
                  : 0;

                if (!slug) return null;

                return (
                  <div
                    key={rapor._id}
                    onClick={() => setAktifRapor(rapor)}
                    className="group flex cursor-pointer flex-col"
                  >
                    <div
                      className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200 bg-cover bg-center shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:grayscale-0 grayscale"
                      style={{
                        backgroundImage: rapor.kapakGorseli
                          ? `url(${rapor.kapakGorseli})`
                          : "none",
                      }}
                    />
                    <div className="mt-6 space-y-2">
                      <p className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                        {rapor.yil}
                      </p>
                      <h2 className="text-xl font-bold leading-snug">
                        {rapor.baslik}
                      </h2>
                      {rapor.altBaslik && (
                        <p className="font-serif text-sm italic text-gray-500">
                          {rapor.altBaslik}
                        </p>
                      )}
                      <div className="h-px w-12 bg-gray-200" />
                      {hazirlayanIlk && (
                        <p className="font-sans text-xs text-gray-400">
                          {hazirlayanIlk}
                          {hazirlayanSayisi > 1 ? " ve diğerleri" : ""}
                        </p>
                      )}
                      <Link
                        href={`/yayinlar/proje-raporlari/${slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-4 inline-block font-sans text-xs uppercase tracking-[0.2em] text-gray-500 transition group-hover:text-black"
                      >
                        Detayları Gör →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Overlay — click outside to close */}
      {aktifRapor && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={() => setAktifRapor(null)}
          aria-hidden
        />
      )}

      {/* Bottom drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white transition-transform duration-500 ease-in-out ${
          aktifRapor ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {aktifRapor && (
          <div className="relative px-8 py-10 md:px-16 md:py-12">
            <button
              onClick={() => setAktifRapor(null)}
              className="absolute right-8 top-6 text-2xl text-gray-400 transition-colors hover:text-black"
              aria-label="Kapat"
            >
              ✕
            </button>

            <div className="mx-auto mb-10 h-1 w-12 rounded-full bg-gray-200" />

            <div className="mx-auto max-w-3xl">
              <p className="mb-2 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                {aktifRapor.yil}
                {aktifRapor.tarih && ` · ${aktifRapor.tarih}`}
              </p>
              <h2 className="font-playfair mb-2 text-4xl font-bold leading-tight">
                {aktifRapor.baslik}
              </h2>
              {aktifRapor.altBaslik && (
                <p className="font-playfair mb-6 text-lg italic text-gray-500">
                  {aktifRapor.altBaslik}
                </p>
              )}

              {aktifRapor.ozet && (
                <p className="mb-6 text-sm leading-relaxed text-gray-700">
                  {aktifRapor.ozet}
                </p>
              )}

              <div className="mb-8 flex flex-wrap gap-4 text-sm text-gray-600">
                {aktifRapor.katilimciSayisi != null && (
                  <span className="border border-gray-200 px-3 py-1">
                    {aktifRapor.katilimciSayisi} katılımcı
                  </span>
                )}
                {aktifRapor.yasGrubu && (
                  <span className="border border-gray-200 px-3 py-1">
                    {aktifRapor.yasGrubu}
                  </span>
                )}
                {aktifRapor.mekan && (
                  <span className="border border-gray-200 px-3 py-1">
                    {aktifRapor.mekan}
                  </span>
                )}
              </div>

              {aktifRapor.hazirlayanlar &&
                aktifRapor.hazirlayanlar.length > 0 && (
                  <p className="mb-8 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                    Hazırlayanlar: {aktifRapor.hazirlayanlar.join(", ")}
                  </p>
                )}

              <Link
                href={`/yayinlar/proje-raporlari/${getSlugValue(aktifRapor.slug)}`}
                className="inline-block w-full bg-black px-8 py-4 text-center font-sans text-sm uppercase tracking-[0.2em] text-white transition hover:bg-gray-800 md:w-auto"
              >
                Detayları Gör →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
