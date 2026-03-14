"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const KATEGORI_DISPLAY: Record<string, string> = {
  Arastirma: "Araştırma",
  Klinik: "Klinik",
  Gelisim: "Gelişim",
  Sosyal: "Sosyal",
  Guncel: "Güncel",
};

const KATEGORI_ORDER = ["Arastirma", "Klinik", "Gelisim", "Sosyal", "Guncel"];

export type Yazi = {
  _id: string;
  baslik: string;
  slug: { current: string };
  tarih?: string;
  kategori?: string;
  ozet?: string;
  kapakGorseli?: string;
  yazar?: { isim?: string; unvan?: string };
};

export type Haber = {
  _id: string;
  baslik: string;
  slug: { current: string };
  ozet?: string;
  tarih?: string;
  kategori?: string;
  kapakGorseli?: string;
  kaynak?: string;
};

type Props = {
  yazilar: Yazi[];
  haberler: Haber[];
};

function kategoriLabel(k: string | undefined) {
  return (k && KATEGORI_DISPLAY[k]) ?? k ?? "";
}

function formatTarih(tarih: string | undefined) {
  if (!tarih) return "";
  return new Date(tarih).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getUniqueKategoriler(yazilar: Yazi[]): string[] {
  const set = new Set<string>();
  yazilar.forEach((y) => {
    if (y.kategori) set.add(y.kategori);
  });
  return KATEGORI_ORDER.filter((k) => set.has(k));
}

export default function YazilarClient({ yazilar, haberler }: Props) {
  const kategoriler = useMemo(() => getUniqueKategoriler(yazilar), [yazilar]);
  const tabs = ["Tümü", ...kategoriler.map((k) => KATEGORI_DISPLAY[k] ?? k)];

  const [seciliTab, setSeciliTab] = useState("Tümü");

  const seciliKategoriValue =
    seciliTab === "Tümü"
      ? null
      : Object.entries(KATEGORI_DISPLAY).find(([, v]) => v === seciliTab)?.[0];

  const filtreliYazilar = useMemo(() => {
    if (!seciliKategoriValue) return yazilar;
    return yazilar.filter((y) => y.kategori === seciliKategoriValue);
  }, [yazilar, seciliKategoriValue]);

  const sonHaberler = haberler.slice(0, 5);
  const haberlerVar = sonHaberler.length > 0;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="px-6 py-16 md:px-12">
        <h1 className="font-playfair text-6xl font-bold leading-tight md:text-8xl">
          Yazılar
        </h1>
        <div className="mt-6 h-1 w-full bg-black" />
      </header>

      {/* Sticky category tabs */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="flex gap-8 overflow-x-auto px-6 py-4 md:px-12 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSeciliTab(tab)}
              className={`whitespace-nowrap border-b-2 pb-1 font-sans text-sm transition-colors ${
                seciliTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main
        className={`px-6 py-12 md:px-12 ${
          haberlerVar ? "lg:grid lg:grid-cols-[7fr_3fr] lg:gap-16" : ""
        }`}
      >
        {/* Left column - Articles */}
        <div className={haberlerVar ? "min-w-0" : ""}>
          {yazilar.length === 0 ? (
            <p className="py-16 text-center font-sans text-gray-500">
              Henüz yazı eklenmemiş.
            </p>
          ) : filtreliYazilar.length === 0 ? (
            <p className="py-16 text-center font-sans text-gray-500">
              Bu kategoride henüz yazı yok.
            </p>
          ) : (
            <div className="space-y-10">
              {filtreliYazilar.map((yazi) => (
                <Link
                  key={yazi._id}
                  href={`/yazilar/${yazi.slug?.current ?? ""}`}
                  className="group block"
                >
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-sm italic text-gray-500">
                        {kategoriLabel(yazi.kategori)}
                      </p>
                      <h2 className="mt-2 font-playfair text-2xl font-bold leading-snug transition group-hover:text-gray-500">
                        {yazi.baslik}
                      </h2>
                      <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-gray-600">
                        {yazi.ozet ?? ""}
                      </p>
                      <p className="mt-3 font-sans text-xs text-gray-500">
                        {yazi.yazar?.isim ?? ""}
                        {yazi.tarih && ` · ${formatTarih(yazi.tarih)}`}
                      </p>
                    </div>
                    <div className="w-full flex-shrink-0 md:w-48 lg:w-56">
                      {yazi.kapakGorseli ? (
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                          <Image
                            src={yazi.kapakGorseli}
                            alt={yazi.baslik}
                            fill
                            className="object-cover transition group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 224px"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] w-full bg-gray-200" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right column - Haberler */}
        {haberlerVar && (
          <aside className="flex-shrink-0 lg:min-w-[320px]">
            <h2 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
              PSİKOLOJİ HABERLERİ
            </h2>
            <div className="mt-6 h-px w-full bg-gray-200" />
            <div className="mt-6 space-y-6">
              {sonHaberler.map((haber) => {
                const slug = haber.slug?.current ?? "";
                const content = (
                  <>
                    <p className="font-sans text-xs text-gray-400">
                      {formatTarih(haber.tarih)}
                    </p>
                    {haber.kategori && (
                      <span className="mt-1 inline-block border border-gray-200 px-2 py-0.5 font-sans text-[10px] uppercase tracking-wide text-gray-500">
                        {kategoriLabel(haber.kategori)}
                      </span>
                    )}
                    <h3 className="mt-2 font-playfair text-base font-bold leading-snug transition group-hover:text-gray-500">
                      {haber.baslik}
                    </h3>
                    {haber.ozet && (
                      <p className="mt-1 line-clamp-1 font-sans text-sm text-gray-600">
                        {haber.ozet}
                      </p>
                    )}
                  </>
                );

                if (haber.kaynak) {
                  return (
                    <a
                      key={haber._id}
                      href={haber.kaynak}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      {content}
                    </a>
                  );
                }
                return (
                  <Link
                    key={haber._id}
                    href={`/haberler/${slug}`}
                    className="group block"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
