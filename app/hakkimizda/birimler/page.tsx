"use client";

import { birimler, type Birim, type BirimUye } from "@/data/birimler";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

function LeaderCardMinimal({ lider }: { lider: BirimUye }) {
  return (
    <Link
      href={`/ekip/${lider.slug}`}
      className="group mt-4 flex items-center gap-3"
    >
      <div
        className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200 bg-cover bg-center transition-all duration-300 group-hover:grayscale-0 grayscale"
        style={{ backgroundImage: `url('${lider.foto}')` }}
      />
      <div>
        <p className="font-bold">{lider.isim}</p>
        <p className="font-sans text-sm text-gray-500">{lider.rol}</p>
      </div>
    </Link>
  );
}

function BirimDrawer({
  birim,
  onClose,
}: {
  birim: Birim;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(id);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const labelClass =
    "font-sans text-xs uppercase tracking-[0.2em] text-gray-400 mb-3";

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-4/5 flex-col overflow-y-auto border-l border-gray-200 bg-white shadow-2xl transition-transform duration-300 ease-out md:w-1/2 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-labelledby="drawer-title"
      >
        <div className="flex items-center justify-end border-b border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded p-2 hover:bg-gray-100"
            aria-label="Kapat"
          >
            <svg
              className="h-5 w-5"
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
        <div className="flex-1 px-10 py-12">
          {/* 1. Birim Lideri — EN ÜSTTE */}
          <Link
            href={`/ekip/${birim.lider.slug}`}
            className="group mb-8 flex gap-4"
          >
            <div
              className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-gray-200 bg-cover bg-center transition-all duration-300 group-hover:grayscale-0 grayscale"
              style={{ backgroundImage: `url('${birim.lider.foto}')` }}
            />
            <div>
              <p className={labelClass}>BİRİM LİDERİ</p>
              <p className="text-xl font-bold">{birim.lider.isim}</p>
              <p className="font-sans text-sm text-gray-500">{birim.lider.rol}</p>
              <p className="mt-1 font-sans text-xs text-gray-400 underline transition hover:text-black">
                Profile git →
              </p>
            </div>
          </Link>
          <div className="my-6 h-px bg-gray-200 md:my-8" />

          {/* 2. Birim adı + slogan */}
          <p className={labelClass}>{birim.numara} —</p>
          <h2 id="drawer-title" className="text-4xl font-bold">
            {birim.ad}
          </h2>
          <p className="mt-2 font-serif text-lg italic text-gray-500">
            {birim.slogan}
          </p>
          <div className="my-6 h-px bg-black md:my-8" />

          {/* 3. HAKKINDA */}
          <p className={labelClass}>HAKKINDA</p>
          <div className="space-y-4 font-serif text-base leading-relaxed text-gray-700">
            {birim.detayliAciklama.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* 4. KİMLERİ ARIYORUZ */}
          {birim.kimleriBekleriz.length > 0 && (
            <>
              <p className={`${labelClass} mt-8`}>KİMLERİ ARIYORUZ</p>
              <ul className="space-y-1 font-sans text-base text-gray-700">
                {birim.kimleriBekleriz.map((item, i) => (
                  <li key={i}>— {item}</li>
                ))}
              </ul>
            </>
          )}

          {/* 5. ÇALIŞMA ALANLARI */}
          <p className={`${labelClass} mt-8`}>ÇALIŞMA ALANLARI</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {birim.calismaAlanlari.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-300 px-4 py-1 font-sans text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 6. GEÇMİŞ ÇALIŞMALAR */}
          {birim.gecmisCalismalar.length > 0 && (
            <>
              <p className={`${labelClass} mt-8`}>GEÇMİŞ ÇALIŞMALAR</p>
              <div className="divide-y divide-gray-200">
                {birim.gecmisCalismalar.map((c, i) => (
                  <div key={i} className="py-4 first:pt-0 last:pb-0">
                    {c.link ? (
                      <Link
                        href={c.link}
                        className="font-sans text-base font-bold underline transition hover:text-gray-500"
                      >
                        {c.baslik}
                      </Link>
                    ) : (
                      <p className="font-sans text-base font-bold">{c.baslik}</p>
                    )}
                    <p className="mt-1 font-sans text-xs text-gray-400">
                      {c.tarih}
                    </p>
                    <p className="mt-1 font-sans text-sm text-gray-500">
                      {c.aciklama}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 7. GÖRSEL GALERİ */}
          {birim.gorselGalerisi && birim.gorselGalerisi.length > 0 && (
            <>
              <p className={`${labelClass} mt-8`}>GÖRSELLER</p>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                {birim.gorselGalerisi.map((url, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-lg"
                  >
                    <div
                      className="aspect-video w-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${url}')` }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export default function BirimlerPage() {
  const [drawerBirim, setDrawerBirim] = useState<Birim | null>(null);

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

      {/* Sections from data */}
      {birimler.map((birim, index) => {
        const isOdd = index % 2 === 0;
        return (
          <section
            key={birim.id}
            className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2"
          >
            {isOdd ? (
              <>
                <div className="flex min-h-[50vh] items-center bg-white px-16 py-20 md:min-h-[70vh]">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.25em] text-gray-400">
                      {birim.numara} —
                    </p>
                    <h2 className="mt-4 text-4xl font-normal md:text-5xl">
                      {birim.ad}
                    </h2>
                    <div className="my-6 h-px w-16 bg-black" />
                    <p className="font-serif text-lg leading-relaxed text-gray-700">
                      {birim.kisaAciklama}
                    </p>
                    <p className="mt-8 font-sans text-xs uppercase tracking-[0.25em] text-gray-400">
                      ÇALIŞMA ALANLARI
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {birim.calismaAlanlari.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-gray-300 px-4 py-1 font-sans text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <LeaderCardMinimal lider={birim.lider} />
                    <button
                      type="button"
                      onClick={() => setDrawerBirim(birim)}
                      className="mt-6 inline-block font-sans text-sm uppercase tracking-[0.25em] transition hover:text-gray-500"
                    >
                      Birimi Keşfet →
                    </button>
                  </div>
                </div>
                <div className="relative min-h-[40vh] bg-gray-100 md:min-h-[70vh]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${birim.gorsel}')` }}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </>
            ) : (
              <>
                <div className="relative min-h-[40vh] bg-gray-100 md:min-h-[70vh]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${birim.gorsel}')` }}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="flex min-h-[50vh] items-center bg-white px-16 py-20 md:min-h-[70vh]">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.25em] text-gray-400">
                      {birim.numara} —
                    </p>
                    <h2 className="mt-4 text-4xl font-normal md:text-5xl">
                      {birim.ad}
                    </h2>
                    <div className="my-6 h-px w-16 bg-black" />
                    <p className="font-serif text-lg leading-relaxed text-gray-700">
                      {birim.kisaAciklama}
                    </p>
                    <p className="mt-8 font-sans text-xs uppercase tracking-[0.25em] text-gray-400">
                      ÇALIŞMA ALANLARI
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {birim.calismaAlanlari.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-gray-300 px-4 py-1 font-sans text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <LeaderCardMinimal lider={birim.lider} />
                    <button
                      type="button"
                      onClick={() => setDrawerBirim(birim)}
                      className="mt-6 inline-block font-sans text-sm uppercase tracking-[0.25em] transition hover:text-gray-500"
                    >
                      Birimi Keşfet →
                    </button>
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
          href="#"
          className="mt-8 inline-block border border-white px-8 py-3 font-sans text-sm uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
        >
          Başvur →
        </Link>
      </section>

      {/* Drawer */}
      {drawerBirim && (
        <BirimDrawer birim={drawerBirim} onClose={() => setDrawerBirim(null)} />
      )}
    </div>
  );
}
