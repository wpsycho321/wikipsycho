"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const KATEGORI_LABEL: Record<string, string> = {
  Arastirma: "Araştırma",
  Klinik: "Klinik",
  Gelisim: "Gelişim",
  Sosyal: "Sosyal",
  Guncel: "Güncel",
};

function kategoriLabel(k: string | undefined) {
  return (k && KATEGORI_LABEL[k]) ?? k ?? "";
}

function formatTarih(tarih: string | undefined) {
  if (!tarih) return "";
  return new Date(tarih).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).toUpperCase();
}

type Yazı = {
  baslik: string;
  slug?: { current: string };
  kategori?: string;
  ozet?: string;
  tarih?: string;
  kapak?: string;
};

type Props = {
  yazilari: Yazı[];
};

export default function EkipTabs({ yazilari }: Props) {
  const [activeTab, setActiveTab] = useState<"Yazılar" | "Videolar">("Yazılar");

  return (
    <section className="w-full bg-white">
      <div className="h-1 w-full bg-black" />
      <nav className="border-b border-gray-200 px-8 py-4 md:px-16">
        <div className="flex gap-8">
          {(["Yazılar", "Videolar"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-sans text-sm transition ${
                activeTab === tab
                  ? "border-b-2 border-black font-bold text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
      <div className="mx-auto max-w-5xl px-8 py-12 md:px-16">
        {activeTab === "Yazılar" && (
          <div className="divide-y divide-black/10">
            {yazilari.length === 0 ? (
              <p className="py-8 font-sans text-sm text-gray-500">
                Henüz yazı bulunmuyor.
              </p>
            ) : (
              yazilari.map((yazi) => (
                <Link
                  key={yazi.baslik}
                  href={`/yazilar/${yazi.slug?.current ?? ""}`}
                  className="group block"
                >
                  <div className="flex gap-8 py-6">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm italic text-gray-500">
                        {kategoriLabel(yazi.kategori)}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold leading-snug transition group-hover:text-gray-500">
                        {yazi.baslik}
                      </h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-gray-600">
                        {yazi.ozet ?? ""}
                      </p>
                      <p className="mt-2 font-sans text-xs uppercase tracking-wide text-gray-500">
                        {formatTarih(yazi.tarih)}
                      </p>
                    </div>
                    <div className="w-40 flex-shrink-0">
                      {yazi.kapak ? (
                        <div className="relative h-40 w-40 overflow-hidden rounded-sm bg-gray-200">
                          <Image
                            src={yazi.kapak}
                            alt={yazi.baslik}
                            fill
                            className="object-cover transition group-hover:scale-105"
                            sizes="160px"
                          />
                        </div>
                      ) : (
                        <div className="h-40 w-40 rounded-sm bg-gray-200" />
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
        {activeTab === "Videolar" && (
          <p className="py-8 font-sans text-sm text-gray-500">
            Henüz video bulunmuyor.
          </p>
        )}
      </div>
    </section>
  );
}
