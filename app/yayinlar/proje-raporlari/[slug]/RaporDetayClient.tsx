"use client";

import { Playfair_Display } from "next/font/google";
import { forwardRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

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
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${kapakGorseli}')` }}
        />
      ) : (
        <>
          <span className="text-6xl text-gray-200">{number}</span>
          <span className="mt-2 text-xs text-gray-300">Sayfa {number}</span>
        </>
      )}
    </div>
  );
});

Page.displayName = "Page";

type Rapor = {
  _id: string;
  baslik: string;
  slug: { current: string };
  altBaslik?: string;
  yil?: string;
  tarih?: string;
  ozet?: string;
  bulgular?: string[];
  sayfaSayisi?: number;
  hazirlayanlar?: string[];
  pdfUrl?: string;
  kapakGorseli?: string;
};

export default function RaporDetayClient({ rapor }: { rapor: Rapor }) {
  const [flipBookOpen, setFlipBookOpen] = useState(false);
  const labelClass = "font-sans text-xs uppercase tracking-[0.2em] text-gray-400 mb-2";

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <section className="bg-[#f5f0eb] px-8 py-16 md:px-16 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-2/5">
            <div
              className="aspect-[3/4] w-full overflow-hidden rounded-sm border-4 border-white bg-gray-200 bg-cover bg-center shadow-2xl"
              style={{
                backgroundImage: rapor.kapakGorseli
                  ? `url('${rapor.kapakGorseli}')`
                  : "none",
              }}
            />
            {rapor.pdfUrl && (
              <a
                href={rapor.pdfUrl}
                className="mt-6 flex w-full items-center justify-center bg-black py-3 font-sans text-sm uppercase tracking-[0.2em] text-white transition hover:bg-gray-800"
              >
                PDF İndir
              </a>
            )}
            <button
              type="button"
              onClick={() => setFlipBookOpen(true)}
              className="mt-3 flex w-full items-center justify-center border border-black py-3 font-sans text-sm uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
            >
              Dergiye Göz At
            </button>
          </div>

          <div className="w-full lg:w-3/5">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
              {rapor.yil}
              {rapor.sayfaSayisi != null && ` · ${rapor.sayfaSayisi} SAYFA`}
            </p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">{rapor.baslik}</h1>
            {rapor.altBaslik && (
              <p className="mt-3 font-serif text-xl italic text-gray-500">
                {rapor.altBaslik}
              </p>
            )}
            <div className="my-6 h-px bg-black md:my-8" />

            {rapor.ozet && (
              <>
                <p className={labelClass}>ÖZET</p>
                <p className="font-serif text-base leading-relaxed text-gray-700">
                  {rapor.ozet}
                </p>
              </>
            )}

            {rapor.bulgular && rapor.bulgular.length > 0 && (
              <>
                <p className={`${labelClass} mt-6`}>TEMEL BULGULAR</p>
                <ul className="space-y-2">
                  {rapor.bulgular.map((item, i) => (
                    <li key={i} className="flex gap-2 font-serif text-base text-gray-700">
                      <span className="text-gray-300">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {rapor.hazirlayanlar && rapor.hazirlayanlar.length > 0 && (
              <>
                <p className={`${labelClass} mt-6`}>HAZIRLAYANLAR</p>
                <div className="space-y-1 font-sans text-base text-gray-700">
                  {rapor.hazirlayanlar.map((h, i) => (
                    <p key={i}>{typeof h === "string" ? h : (h as { isim?: string; rol?: string }).isim}</p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {flipBookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            type="button"
            onClick={() => setFlipBookOpen(false)}
            className="fixed right-4 top-4 p-4 text-3xl text-white transition hover:text-gray-300"
            aria-label="Kapat"
          >
            ×
          </button>
          <div className="flex flex-col items-center">
            <div className="shadow-2xl">
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
                disableFlipByClick={false}
                swipeDistance={30}
                clickEventForward
                useMouseEvents
                startPage={0}
                className="shadow-2xl"
                style={{}}
              >
                {Array.from(
                  { length: Math.max(1, rapor.sayfaSayisi ?? 1) },
                  (_, i) => (
                    <Page
                      key={i}
                      number={i + 1}
                      isCover={i === 0}
                      kapakGorseli={i === 0 ? rapor.kapakGorseli : undefined}
                    />
                  )
                )}
              </HTMLFlipBook>
            </div>
            <p className="mt-4 text-xs text-white/50">
              ← → tuşları veya sayfaya tıklayarak gezinebilirsiniz
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
