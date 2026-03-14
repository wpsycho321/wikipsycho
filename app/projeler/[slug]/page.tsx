"use server";

import Image from "next/image";
import { notFound } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { client } from "@/lib/sanity";

export const dynamic = "force-dynamic";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const projeBySlugQuery = `
  *[_type == "proje" && slug.current == $slug][0]{
    _id,
    baslik,
    slug,
    altBaslik,
    aciklama,
    durum,
    yil,
    kategori,
    "gorsel": gorsel.asset->url,
    istatistikler,
    ortaklar
  }
`;

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

export default async function ProjeDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proje = (await client.fetch(projeBySlugQuery, { slug }).catch(
    () => null
  )) as Proje | null;

  if (!proje) {
    notFound();
  }

  return (
    <main className={`${playfair.className} min-h-screen bg-white`}>
      <section className="px-8 py-16 md:px-16 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row">
          {/* Görsel */}
          <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-100 md:h-80 md:w-1/2">
            {proje.gorsel && (
              <Image
                src={proje.gorsel}
                alt={proje.baslik}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Metin */}
          <div className="md:w-1/2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
              {proje.kategori} · {proje.yil}
            </p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              {proje.baslik}
            </h1>
            {proje.altBaslik && (
              <p className="mt-3 font-serif text-lg italic text-gray-500">
                {proje.altBaslik}
              </p>
            )}
            {proje.durum && (
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                Durum: {proje.durum}
              </p>
            )}
            {proje.aciklama && (
              <p className="mt-6 text-sm leading-relaxed text-gray-700">
                {proje.aciklama}
              </p>
            )}

            {proje.istatistikler && proje.istatistikler.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4">
                {proje.istatistikler.map((ist, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 p-4"
                  >
                    <p className="text-2xl font-bold">{ist.sayi}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-400">
                      {ist.aciklama}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {proje.ortaklar && proje.ortaklar.length > 0 && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Proje Ortakları
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {proje.ortaklar.map((ortak, i) => (
                    <span
                      key={i}
                      className="border border-gray-200 px-3 py-1 text-xs text-gray-600"
                    >
                      {ortak}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

