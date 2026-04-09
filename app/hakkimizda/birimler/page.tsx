'use client';

import { Playfair_Display } from 'next/font/google';
import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity';
import { birimlerQuery } from '@/lib/queries';

const playfair = Playfair_Display({ subsets: ['latin'] });

type CmsBirim = {
  _id: string;
  ad: string;
  slug: { current: string } | string;
  slogan?: string;
  hakkinda?: string;
  kimleriBuyoruz?: string;
  calismaAlanlari?: string[];
  gecmisCalismalari?: string[];
  gorsel?: unknown;
  galeri?: string[];
  lider?: { _id: string; slug?: string; isim?: string; unvan?: string; fotograf?: string };
};

function getSlugValue(slug: CmsBirim['slug']) {
  return typeof slug === 'string' ? slug : slug.current ?? '';
}

export default function BirimlerPage() {
  const [birimler, setBirimler] = useState<CmsBirim[]>([]);
  const [selected, setSelected] = useState<CmsBirim | null>(null);

  useEffect(() => {
    client.fetch(birimlerQuery).then(setBirimler).catch(() => setBirimler([]));
  }, []);

  const gorselUrl = (gorsel: unknown) => {
    if (typeof gorsel === 'string') return gorsel;
    if (gorsel && typeof gorsel === 'object' && 'url' in gorsel) return (gorsel as { url?: string }).url ?? '';
    return '';
  };

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <header className="w-full px-12 py-20">
        <h1 className="text-6xl font-normal md:text-7xl">Birimlerimiz</h1>
        <p className="mt-4 max-w-2xl font-serif text-xl italic text-gray-600">
          WikiPsycho&apos;nun her birimi, psikolojiyi farklı bir mecrada üretir ve paylaşır.
        </p>
        <div className="mt-8 h-1 w-full bg-black" />
      </header>

      {birimler.length === 0 ? (
        <p className="px-12 py-16 text-center font-sans text-gray-500">Henüz birim eklenmemiş.</p>
      ) : (
        birimler.map((birim, index) => {
          const isOdd = index % 2 === 0;
          const slug = getSlugValue(birim.slug);
          const numara = `${index + 1}`.padStart(2, '0');
          const url = gorselUrl(birim.gorsel);

          const textBlock = (
            <div className="flex min-h-[50vh] items-center bg-white px-8 py-20 md:min-h-[70vh] md:px-16">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-gray-400">{numara} —</p>
                <h2 className="mt-4 text-4xl font-normal md:text-5xl">{birim.ad}</h2>
                <div className="my-6 h-px w-16 bg-black" />
                <p className="font-serif text-lg leading-relaxed text-gray-700">{birim.hakkinda ?? ''}</p>
                {slug && (
                  <button
                    onClick={() => setSelected(birim)}
                    className="mt-6 inline-block font-sans text-sm uppercase tracking-[0.25em] transition hover:text-gray-500"
                  >
                    Birimi Keşfet →
                  </button>
                )}
              </div>
            </div>
          );

          const imageBlock = (
            <div className="relative min-h-[40vh] bg-gray-100 md:min-h-[70vh]">
              {url && (
                <>
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${url}')` }} />
                  <div className="absolute inset-0 bg-black/10" />
                </>
              )}
            </div>
          );

          return (
            <section key={birim._id} className="grid grid-cols-1 md:grid-cols-2">
              {isOdd ? (
                <>
                  {textBlock}
                  {imageBlock}
                </>
              ) : (
                <>
                  {imageBlock}
                  {textBlock}
                </>
              )}
            </section>
          );
        })
      )}

      {/* Backdrop */}
      {selected && <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSelected(null)} />}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-lg bg-white shadow-2xl transition-transform duration-300 overflow-y-auto ${
          selected ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selected && (
          <div className="flex flex-col h-full">
            {gorselUrl(selected.gorsel) && (
              <div
                className="h-64 w-full bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url('${gorselUrl(selected.gorsel)}')` }}
              />
            )}
            <div className="p-10 flex-1">
              <div className="flex items-start justify-between">
                <h2 className="text-4xl font-normal">{selected.ad}</h2>
                <button onClick={() => setSelected(null)} className="ml-4 mt-1 flex-shrink-0 text-gray-400 hover:text-black">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selected.slogan && <p className="mt-3 font-serif text-xl italic text-gray-500">{selected.slogan}</p>}

              <div className="mt-6 h-px w-full bg-black/10" />

              <p className="mt-6 font-serif text-lg leading-relaxed text-gray-700">{selected.hakkinda ?? ''}</p>

              {selected.kimleriBuyoruz && (
                <div className="mt-8">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">Kimlerle Büyüyoruz</h3>
                  <p className="mt-2 font-serif text-base leading-relaxed text-gray-700">{selected.kimleriBuyoruz}</p>
                </div>
              )}

              {selected.calismaAlanlari && selected.calismaAlanlari.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">Çalışma Alanları</h3>
                  <ul className="mt-3 space-y-2">
                    {selected.calismaAlanlari.map((alan, i) => (
                      <li key={i} className="flex items-start gap-2 font-serif text-base text-gray-700">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
                        {alan}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.gecmisCalismalari && selected.gecmisCalismalari.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">Geçmiş Çalışmaları</h3>
                  <ul className="mt-3 space-y-2">
                    {selected.gecmisCalismalari.map((calisma, i) => (
                      <li key={i} className="flex items-start gap-2 font-serif text-base text-gray-700">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
                        {calisma}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.lider && (
                <div className="mt-8">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">Birim Lideri</h3>

                  <a href={`/ekip/${selected.lider.slug ?? ''}`} className="mt-3 flex items-center gap-3 group">
                    {selected.lider.fotograf && (
                      <img src={selected.lider.fotograf} alt={selected.lider.isim} className="h-10 w-10 rounded-full object-cover" />
                    )}
                    <div>
                      <p className="font-bold group-hover:underline">{selected.lider.isim}</p>
                      {selected.lider.unvan && <p className="font-sans text-sm text-gray-500">{selected.lider.unvan}</p>}
                    </div>
                    <span className="ml-auto font-sans text-xs text-gray-400 group-hover:text-black">Profil →</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <section className="w-full bg-black py-24 text-center text-white">
        <h2 className="text-4xl font-normal md:text-5xl">Sen de Üret</h2>
        <p className="mx-auto mt-4 max-w-xl font-serif text-xl italic text-gray-300">
          WikiPsycho&apos;da her birim yeni sesler arıyor. Psikoloji üzerine düşünen, üreten ve paylaşmak isteyen herkese açığız.
        </p>

        <a
          href="/iletisim"
          className="mt-8 inline-block border border-white px-8 py-3 font-sans text-sm uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
        >
          Başvur →
        </a>
      </section>
    </div>
  );
}
