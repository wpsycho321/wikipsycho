"use server";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { birimlerQuery } from "@/lib/queries";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

type CmsBirim = {
  _id: string;
  ad: string;
  slug: { current: string } | string;
  slogan?: string;
  hakkinda?: string;
  gorsel?: any;
};

function getSlugValue(slug: CmsBirim["slug"]) {
  return typeof slug === "string" ? slug : slug.current ?? "";
}

export default async function BirimlerPage() {
  const cmsBirimler: CmsBirim[] = await client.fetch(birimlerQuery).catch(() => []);

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* Page header */}
      <header className="w-full px-12 py-20">
        <h1 className="text-6xl font-normal md:text-7xl">Birimlerimiz</h1>
        <p className="mt-4 max-w-2xl font-serif text-xl italic text-gray-600">
          WikiPsycho&apos;nun her birimi, psikolojiyi farklı bir mecrada üretir
          ve paylaşır.
        </p>
        <div className="mt-8 h-1 w-full bg-black" />
      </header>

      {/* Sections from Sanity */}
      {cmsBirimler.map((birim, index) => {
        const isOdd = index % 2 === 0;
        const slug = getSlugValue(birim.slug);
        const aciklama = birim.hakkinda || "";
        const gorselUrl = birim.gorsel?.url ?? "";
        const numara = `${index + 1}`.padStart(2, "0");

        return (
          <section
            key={birim._id}
            className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2"
          >
            {isOdd ? (
              <>
                <div className="flex min-h-[50vh] items-center bg-white px-16 py-20 md:min-h-[70vh]">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.25em] text-gray-400">
                      {numara} —
                    </p>
                    <h2 className="mt-4 text-4xl font-normal md:text-5xl">
                      {birim.ad}
                    </h2>
                    <div className="my-6 h-px w-16 bg-black" />
                    <p className="font-serif text-lg leading-relaxed text-gray-700">
                      {aciklama}
                    </p>
                    {slug && (
                      <Link
                        href={`/projeler?birim=${slug}`}
                        className="mt-6 inline-block font-sans text-sm uppercase tracking-[0.25em] transition hover:text-gray-500"
                      >
                        Birimi Keşfet →
                      </Link>
                    )}
                  </div>
                </div>
                <div className="relative min-h-[40vh] bg-gray-100 md:min-h-[70vh]">
                  {gorselUrl && (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${gorselUrl}')` }}
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="relative min-h-[40vh] bg-gray-100 md:min-h-[70vh]">
                  {gorselUrl && (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${gorselUrl}')` }}
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </>
                  )}
                </div>
                <div className="flex min-h-[50vh] items-center bg-white px-16 py-20 md:min-h-[70vh]">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.25em] text-gray-400">
                      {numara} —
                    </p>
                    <h2 className="mt-4 text-4xl font-normal md:text-5xl">
                      {birim.ad}
                    </h2>
                    <div className="my-6 h-px w-16 bg-black" />
                    <p className="font-serif text-lg leading-relaxed text-gray-700">
                      {aciklama}
                    </p>
                    {slug && (
                      <Link
                        href={`/projeler?birim=${slug}`}
                        className="mt-6 inline-block font-sans text-sm uppercase tracking-[0.25em] transition hover:text-gray-500"
                      >
                        Birimi Keşfet →
                      </Link>
                    )}
                  </div>
                </div>
              </>
            )}
          </section>
        );
      })}

      {/* Join CTA block */}
      <section className="w-full bg-black py-24 text-center text-white">
        <h2 className="text-4xl font-normal md:text-5xl">Sen de Üret</h2>
        <p className="mx-auto mt-4 max-w-xl font-serif text-xl italic text-gray-300">
          WikiPsycho&apos;da her birim yeni sesler arıyor. Psikoloji üzerine
          düşünen, üreten ve paylaşmak isteyen herkese açığız.
        </p>
        <Link
          href="/iletisim"
          className="mt-8 inline-block border border-white px-8 py-3 font-sans text-sm uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
        >
          Başvur →
        </Link>
      </section>
    </div>
  );
}
