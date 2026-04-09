"use server";

import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { eyayinlarQuery } from "@/lib/queries";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

type EYayin = {
  _id: string;
  slug: { current: string } | string;
  baslik: string;
  altBaslik?: string;
  seriNo?: string;
  kapakGorseli?: string | { url?: string } | null;
  hazirlayanlar?: string[];
};

function getSlugValue(slug: EYayin["slug"]) {
  const raw = typeof slug === "string" ? slug : slug?.current;
  return raw ? String(raw).trim() : "";
}

export default async function EYayinlarPage() {
  const eyayinlar: EYayin[] = await client.fetch(eyayinlarQuery).catch(() => []);
  const gorselUrl = (gorsel: EYayin["kapakGorseli"]) => {
    if (typeof gorsel === "string") return gorsel;
    if (gorsel && typeof gorsel === "object") return gorsel.url ?? "";
    return "";
  };

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* Header */}
      <header className="px-12 py-20 md:px-24">
        <p className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
          YAYINLAR / E-YAYINLAR
        </p>
        <h1 className="text-5xl font-bold md:text-6xl">
          WikiPsycho E-Yayınları
        </h1>
        <p className="mt-4 font-serif text-lg italic text-gray-500">
          Derleme raporlar, rehberler ve dijital yayınlar.
        </p>
        <div className="mt-10 h-px w-full bg-black" />
      </header>

      {/* Grid */}
      <section className="grid grid-cols-1 gap-x-12 gap-y-20 px-12 py-16 md:grid-cols-2 md:px-24 lg:grid-cols-3">
        {eyayinlar.length === 0 ? (
          <p className="col-span-full py-16 text-center font-sans text-gray-500">
            Henüz e-yayın eklenmemiş.
          </p>
        ) : (
        eyayinlar.map((yayin) => {
          const slug = getSlugValue(yayin.slug);
          const hazirlayanIlk =
            Array.isArray(yayin.hazirlayanlar) && yayin.hazirlayanlar[0]
              ? yayin.hazirlayanlar[0]
              : undefined;
          const hazirlayanSayisi = Array.isArray(yayin.hazirlayanlar)
            ? yayin.hazirlayanlar.length
            : 0;

          if (!slug) return null;

          return (
            <Link
              key={yayin._id}
              href={`/yayinlar/e-yayinlar/${slug}`}
              className="group flex cursor-pointer flex-col items-center"
            >
            <div className="relative mx-auto w-48">
              {/* Book spine */}
              <div className="absolute left-0 top-0 bottom-0 z-10 w-3 rounded-l bg-gradient-to-r from-gray-300 via-gray-100 to-transparent" />
              {/* Page edge right */}
              <div className="absolute right-[-4px] top-1 bottom-1 flex w-2 flex-col justify-evenly border-r border-gray-200 bg-gradient-to-l from-gray-50 to-white">
                <div className="mx-auto h-px w-full bg-gray-200" />
                <div className="mx-auto h-px w-full bg-gray-200" />
                <div className="mx-auto h-px w-full bg-gray-200" />
                <div className="mx-auto h-px w-full bg-gray-200" />
              </div>
              {/* Main cover */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-[4px_8px_24px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[6px_12px_32px_rgba(0,0,0,0.25)]">
                {gorselUrl(yayin.kapakGorseli) ? (
                  <Image
                    src={gorselUrl(yayin.kapakGorseli)}
                    alt={yayin.baslik}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                ) : null}
              </div>
            </div>

            <div className="mt-6 w-full text-center">
              {yayin.seriNo && (
                <span className="mb-3 inline-block rounded-full border border-gray-200 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  {yayin.seriNo}
                </span>
              )}
              <h2 className="mt-1 text-lg font-bold leading-snug">
                {yayin.baslik}
              </h2>
              <p className="mt-1 font-serif text-sm italic text-gray-500">
                {yayin.altBaslik}
              </p>
              <div className="mx-auto my-4 h-px w-12 bg-gray-200" />
              {hazirlayanIlk && (
                <p className="font-sans text-xs text-gray-400">
                  {hazirlayanIlk}
                  {hazirlayanSayisi > 1 ? " ve diğerleri" : ""}
                </p>
              )}
              <span className="mt-2 block font-sans text-xs uppercase tracking-[0.2em] text-gray-400 transition-colors group-hover:text-black">
                İncele →
              </span>
            </div>
          </Link>
          );
        })
        )}
      </section>
    </div>
  );
}
