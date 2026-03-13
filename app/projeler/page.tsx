"use server";

import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { client } from "@/lib/sanity";
import { projelerQuery } from "@/lib/queries";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

type Proje = {
  _id: string;
  baslik: string;
  slug: { current: string } | string;
  altBaslik?: string;
  aciklama?: string;
  durum?: string;
  yil?: string;
  kategori?: string;
  gorsel?: string;
  istatistikler?: { sayi?: string; aciklama?: string }[];
  ortaklar?: string[];
};

function getSlugValue(slug: Proje["slug"]) {
  return typeof slug === "string" ? slug : slug?.current;
}

export default async function ProjelerPage() {
  const projeler: Proje[] = await client.fetch(projelerQuery).catch(() => []);

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
        {projeler.map((proje) => {
          const slug = getSlugValue(proje.slug);
          if (!slug) return null;

          return (
            <div key={proje._id} className="group cursor-pointer">
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
                className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-gray-400 transition-colors group-hover:text-black"
              >
                Detayları Gör →
              </Link>
            </div>
          </div>
          );
        })}
      </div>
    </main>
  );
}

