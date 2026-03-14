"use client";

import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import dynamic from "next/dynamic";
import { forwardRef, useState } from "react";

const HTMLFlipBook = dynamic(
  () => import("react-pageflip").then((m) => m.default),
  { ssr: false }
);

const playfair = Playfair_Display({ subsets: ["latin"] });

const Page = forwardRef<
  HTMLDivElement,
  { number: number; isCover?: boolean; kapakGorseli?: string }
>(function PageInner({ number, isCover, kapakGorseli }, ref) {
  return (
    <div
      ref={ref}
      className="flex h-full w-full flex-col items-center justify-center bg-white"
    >
      {isCover && kapakGorseli ? (
        <div className="relative h-full w-full">
          <Image src={kapakGorseli} alt="Kapak" fill className="object-cover" />
        </div>
      ) : (
        <>
          <span className="font-serif text-6xl text-gray-300">{number}</span>
          <span className="mt-2 text-xs text-gray-400">Sayfa {number}</span>
        </>
      )}
    </div>
  );
});

Page.displayName = "Page";

type Yayin = {
  _id: string;
  baslik: string;
  slug: { current: string };
  altBaslik?: string;
  seriNo?: string;
  tur?: string;
  yil?: string;
  tarih?: string;
  ozet?: string;
  hedef?: string;
  bulgular?: string[];
  sayfaSayisi?: number;
  hazirlayanlar?: string[];
  pdfUrl?: string;
  editor?: string;
  danismanlar?: string[];
  yayin?: string;
  kapakGorseli?: string;
};

export default function EYayinDetayClient({ yayin }: { yayin: Yayin }) {
  const [flipBookOpen, setFlipBookOpen] = useState(false);
  const formatTarih = (t: string | undefined) =>
    t ? new Date(t).toLocaleDateString("tr-TR", { month: "long", year: "numeric" }) : "";

  return (
    <main className={`${playfair.className} min-h-screen bg-white text-black`}>
      <section className="bg-[#f5f0eb] px-8 py-16 md:px-24 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex w-full flex-shrink-0 flex-col items-center gap-4 lg:w-64">
            <div className="relative aspect-[3/4] w-full max-w-[16rem] overflow-hidden rounded-lg border-4 border-white shadow-[6px_10px_32px_rgba(0,0,0,0.2)]">
              {yayin.kapakGorseli ? (
                <Image
                  src={yayin.kapakGorseli}
                  alt={yayin.baslik}
                  fill
                  className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                  Kapak
                </div>
              )}
            </div>
            {yayin.pdfUrl && (
              <a
                href={yayin.pdfUrl}
                download
                className="w-full bg-black px-6 py-3 text-center font-sans text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gray-800"
              >
                PDF İndir
              </a>
            )}
            <button
              type="button"
              onClick={() => setFlipBookOpen(true)}
              className="w-full border-2 border-black px-6 py-3 text-center font-sans text-xs uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
            >
              Dergiye Göz At
            </button>
          </div>

          <div className="flex-1">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {yayin.seriNo && (
                <span className="rounded-full border border-gray-300 px-4 py-1 font-sans text-xs uppercase tracking-[0.2em] text-gray-500">
                  {yayin.seriNo}
                </span>
              )}
              {yayin.tur && (
                <span className="rounded-full border border-gray-300 px-4 py-1 font-sans text-xs uppercase tracking-[0.2em] text-gray-500">
                  {yayin.tur}
                </span>
              )}
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                {formatTarih(yayin.tarih) || yayin.yil}
              </span>
              {yayin.sayfaSayisi != null && (
                <span className="font-sans text-xs text-gray-400">
                  {yayin.sayfaSayisi} sayfa
                </span>
              )}
            </div>

            <h1 className="mb-3 text-4xl font-bold leading-tight md:text-5xl">
              {yayin.baslik}
            </h1>
            {yayin.altBaslik && (
              <p className="mb-10 font-serif text-xl italic text-gray-500">
                {yayin.altBaslik}
              </p>
            )}

            {yayin.ozet && (
              <div className="mb-8">
                <p className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                  ÖZET
                </p>
                <p className="font-sans text-sm leading-relaxed text-gray-700">
                  {yayin.ozet}
                </p>
              </div>
            )}

            {yayin.hedef && (
              <div className="mb-8">
                <p className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                  HEDEF
                </p>
                <p className="font-sans text-sm leading-relaxed text-gray-700">
                  {yayin.hedef}
                </p>
              </div>
            )}

            {yayin.bulgular && yayin.bulgular.length > 0 && (
              <div className="mb-8">
                <p className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                  TEMEL BULGULAR
                </p>
                <ul className="space-y-2">
                  {yayin.bulgular.map((bulgu, i) => (
                    <li key={i} className="flex gap-3 font-sans text-sm text-gray-700">
                      <span className="mt-0.5 text-gray-300">—</span>
                      <span>{bulgu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {yayin.hazirlayanlar && yayin.hazirlayanlar.length > 0 && (
              <div className="mb-6">
                <p className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                  HAZIRLAYANLAR
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {yayin.hazirlayanlar.map((h, i) => (
                    <span key={i} className="font-sans text-sm text-gray-700">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {yayin.editor && (
              <div className="mb-6">
                <p className="mb-2 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                  EDİTÖR
                </p>
                <p className="font-sans text-sm text-gray-700">{yayin.editor}</p>
              </div>
            )}

            {yayin.danismanlar && yayin.danismanlar.length > 0 && (
              <div className="mb-6">
                <p className="mb-2 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                  DANIŞMANLAR
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {yayin.danismanlar.map((d, i) => (
                    <p key={i} className="font-sans text-sm text-gray-700">
                      {d}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {yayin.yayin && (
              <div>
                <p className="mb-2 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
                  YAYIN
                </p>
                <p className="font-sans text-sm text-gray-700">{yayin.yayin}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {flipBookOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
          onClick={() => setFlipBookOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <HTMLFlipBook
              width={400}
              height={566}
              showCover
              mobileScrollSupport
              size="fixed"
              minWidth={0}
              maxWidth={0}
              minHeight={0}
              maxHeight={0}
              drawShadow
              flippingTime={600}
              usePortrait
              startZIndex={0}
              autoSize
              maxShadowOpacity={0.5}
              showPageCorners
              startPage={0}
              clickEventForward
              useMouseEvents
              swipeDistance={30}
              disableFlipByClick={false}
              className="shadow-2xl"
              style={{}}
            >
              <Page number={1} isCover kapakGorseli={yayin.kapakGorseli} />
              {Array.from(
                { length: Math.max(0, (yayin.sayfaSayisi ?? 1) - 1) },
                (_, i) => <Page key={i} number={i + 2} />
              )}
            </HTMLFlipBook>
          </div>
          <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-white/40">
            ← → tuşları veya sayfaya tıklayarak gezinebilirsiniz · ESC veya dışarı tıkla kapat
          </p>
          <button
            type="button"
            onClick={() => setFlipBookOpen(false)}
            className="absolute right-8 top-8 text-2xl text-white/50 transition-colors hover:text-white"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>
      )}
    </main>
  );
}
