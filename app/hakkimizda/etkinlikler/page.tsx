'use client';

import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { etkinliklerQuery } from '@/lib/queries';

const playfair = Playfair_Display({ subsets: ['latin'] });

type Etkinlik = {
  _id: string;
  baslik: string;
  slug: { current: string };
  tarih?: string;
  konum?: string;
  kategori?: string;
  aciklama?: string;
  gorsel?: string;
  durum?: string;
  sorumlular?: {
    _id: string;
    isim?: string;
    unvan?: string;
    slug?: string;
    fotograf?: string;
  }[];
};

function formatTarih(tarih: string | undefined) {
  if (!tarih) return '';
  return new Date(tarih).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function kategoriLabel(k: string | undefined) {
  const map: Record<string, string> = {
    Atolye: 'Atölye',
    Konferans: 'Konferans',
    Webinar: 'Webinar',
    Diger: 'Diğer',
  };
  return (k && map[k]) ?? k ?? '';
}

function durumLabel(d: string | undefined) {
  const map: Record<string, string> = {
    yaklasan: 'Yaklaşan',
    'devam-ediyor': 'Devam ediyor',
    tamamlandi: 'Tamamlandı',
  };
  return (d && map[d]) ?? d ?? '';
}

export default function EtkinliklerPage() {
  const [etkinlikler, setEtkinlikler] = useState<Etkinlik[]>([]);
  const [selected, setSelected] = useState<Etkinlik | null>(null);

  useEffect(() => {
    client.fetch(etkinliklerQuery).then(setEtkinlikler).catch(() => []);
  }, []);

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <header className="py-20 text-center">
        <h1 className="text-5xl font-normal md:text-6xl">Etkinlikler</h1>
        <p className="mt-4 font-sans text-sm text-gray-600">
          WikiPsycho etkinliklerini keşfedin
        </p>
        <div className="mx-auto mt-6 h-px max-w-xs bg-black" />
      </header>

      <main className="px-6 pb-20 md:px-12">
        {etkinlikler.length === 0 ? (
          <p className="py-16 text-center font-sans text-gray-500">
            Henüz etkinlik eklenmemiş.
          </p>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {etkinlikler.map((etkinlik) => (
              <article
                key={etkinlik._id}
                onClick={() => setSelected(etkinlik)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-black/10 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {etkinlik.gorsel ? (
                    <Image
                      src={etkinlik.gorsel}
                      alt={etkinlik.baslik}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200 font-sans text-sm text-gray-400">
                      Görsel yok
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded bg-black px-2 py-1 text-xs font-sans text-white">
                    {kategoriLabel(etkinlik.kategori)}
                  </span>
                  {etkinlik.durum && (
                    <span className="absolute right-3 top-3 rounded border border-white/80 bg-black/60 px-2 py-1 text-xs font-sans text-white">
                      {durumLabel(etkinlik.durum)}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    {formatTarih(etkinlik.tarih)}
                  </p>
                  <h2 className="mt-2 text-xl font-bold leading-snug">
                    {etkinlik.baslik}
                  </h2>
                  {etkinlik.konum && (
                    <p className="mt-2 font-sans text-sm text-gray-600">
                      {etkinlik.konum}
                    </p>
                  )}
                  {etkinlik.aciklama && (
                    <p className="mt-3 line-clamp-3 font-sans text-sm text-gray-600">
                      {etkinlik.aciklama}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSelected(null)}
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          selected ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selected && (
          <div className="flex flex-col">
            {selected.gorsel && (
              <div className="relative h-64 w-full flex-shrink-0">
                <Image
                  src={selected.gorsel}
                  alt={selected.baslik}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                    {formatTarih(selected.tarih)}
                  </p>
                  <h2 className="mt-2 text-3xl font-normal">
                    {selected.baslik}
                  </h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="ml-4 mt-1 flex-shrink-0 text-gray-400 hover:text-black"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-4 flex gap-2">
                {selected.kategori && (
                  <span className="rounded border border-gray-200 px-3 py-1 font-sans text-xs text-gray-600">
                    {kategoriLabel(selected.kategori)}
                  </span>
                )}
                {selected.durum && (
                  <span className="rounded border border-gray-200 px-3 py-1 font-sans text-xs text-gray-600">
                    {durumLabel(selected.durum)}
                  </span>
                )}
              </div>

              {selected.konum && (
                <div className="mt-6">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                    Konum
                  </h3>
                  <p className="mt-1 font-sans text-sm text-gray-700">
                    {selected.konum}
                  </p>
                </div>
              )}

              <div className="mt-6 h-px w-full bg-black/10" />

              {selected.aciklama && (
                <p className="mt-6 font-serif text-base leading-relaxed text-gray-700">
                  {selected.aciklama}
                </p>
              )}

              {selected.sorumlular && selected.sorumlular.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                    Etkinlik Sorumluları
                  </h3>
                  <div className="mt-3 space-y-3">
                    {selected.sorumlular.map((kisi) => (
                      <Link
                        key={kisi._id}
                        href={`/ekip/${kisi.slug ?? ''}`}
                        className="flex items-center gap-3 group"
                      >
                        {kisi.fotograf ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={kisi.fotograf}
                            alt={kisi.isim ?? 'Sorumlu'}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-sans text-sm text-gray-500">
                            {kisi.isim?.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-bold group-hover:underline">
                            {kisi.isim}
                          </p>
                          {kisi.unvan && (
                            <p className="font-sans text-xs text-gray-500">
                              {kisi.unvan}
                            </p>
                          )}
                        </div>
                        <span className="ml-auto font-sans text-xs text-gray-400 group-hover:text-black">
                          Profil →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
