"use client";

import { raporlar } from "@/data/raporlar";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

export default function ProjeRaporlariPage() {
  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* Page header */}
      <header className="px-12 py-20">
        <h1 className="text-5xl font-normal md:text-6xl">
          Proje <span className="italic">Raporlarımız</span>
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-lg text-gray-500">
          WikiPsycho&apos;nun yürüttüğü projelerin bulgularını ve süreç
          değerlendirmelerini içeren akademik raporlar.
        </p>
        <div className="mt-8 h-1 w-full bg-black" />
      </header>

      {/* Report carousel */}
      <div className="relative overflow-hidden px-12 py-16">
        <div className="flex flex-row gap-8 overflow-x-auto pb-8 scrollbar-hide">
          {raporlar.map((rapor) => (
            <Link
              key={rapor.id}
              href={`/yayinlar/proje-raporlari/${rapor.slug}`}
              className="group flex w-72 flex-shrink-0 flex-col"
            >
            <div
              className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-gray-200 bg-cover bg-center shadow-md transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:grayscale-0 grayscale"
              style={{ backgroundImage: `url('${rapor.kapakGorseli}')` }}
            />
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
              {rapor.yil}
            </p>
            <h2 className="mt-1 text-xl font-bold">{rapor.baslik}</h2>
            <p className="mt-1 font-serif text-sm italic text-gray-500">
              {rapor.altBaslik}
            </p>
            <div className="my-4 h-px bg-gray-200" />
            <p className="font-sans text-xs text-gray-400">
              {rapor.hazirlayanlar[0]?.isim}
              {rapor.hazirlayanlar.length > 1 ? " ve diğerleri" : ""}
            </p>
            <span className="mt-2 inline-block font-sans text-xs uppercase tracking-[0.2em] text-gray-500 transition group-hover:text-black">
              Raporu İncele →
            </span>
          </Link>
        ))}
        </div>
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
