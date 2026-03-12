"use client";

import { raporlar } from "@/data/raporlar";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useParams } from "next/navigation";
import { forwardRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const Page = forwardRef<
  HTMLDivElement,
  { number: number; raporBaslik: string; isCover?: boolean; kapakGorseli?: string }
>(({ number, raporBaslik, isCover, kapakGorseli }, ref) => (
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
        {/* TODO: CMS bağlandığında gerçek sayfa görselleri buraya gelecek */}
        <span className="text-6xl text-gray-200">{number}</span>
        <span className="mt-2 text-xs text-gray-300">Sayfa {number}</span>
      </>
    )}
  </div>
));

Page.displayName = "Page";

export default function RaporDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const rapor = raporlar.find((r) => r.slug === slug);

  const [flipBookOpen, setFlipBookOpen] = useState(false);

  if (!rapor) {
    return (
      <div className={`${playfair.className} flex min-h-screen items-center justify-center`}>
        <p>Rapor bulunamadı.</p>
      </div>
    );
  }

  const labelClass =
    "font-sans text-xs uppercase tracking-[0.2em] text-gray-400 mb-2";

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* SECTION 1 — Rapor Bilgileri */}
      <section className="bg-[#f5f0eb] px-8 py-16 md:px-16 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left column */}
          <div className="w-full lg:w-2/5">
            <div
              className="aspect-[3/4] w-full overflow-hidden rounded-sm border-4 border-white bg-gray-200 bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: `url('${rapor.kapakGorseli}')` }}
            />
            <a
              href={rapor.pdfUrl}
              className="mt-6 flex w-full items-center justify-center bg-black py-3 font-sans text-sm uppercase tracking-[0.2em] text-white transition hover:bg-gray-800"
            >
              PDF İndir
            </a>
            <button
              type="button"
              onClick={() => setFlipBookOpen(true)}
              className="mt-3 flex w-full items-center justify-center border border-black py-3 font-sans text-sm uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
            >
              Dergiye Göz At
            </button>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-3/5">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
              {rapor.yil} · {rapor.sayfaSayisi} SAYFA
            </p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              {rapor.baslik}
            </h1>
            <p className="mt-3 font-serif text-xl italic text-gray-500">
              {rapor.altBaslik}
            </p>
            <div className="my-6 h-px bg-black md:my-8" />

            <p className={labelClass}>ÖZET</p>
            <p className="font-serif text-base leading-relaxed text-gray-700">
              {rapor.ozet}
            </p>

            <p className={`${labelClass} mt-6`}>HEDEF</p>
            <p className="font-serif text-base leading-relaxed text-gray-700">
              {rapor.hedef}
            </p>

            <p className={`${labelClass} mt-6`}>TEMEL BULGULAR</p>
            <ul className="space-y-2">
              {rapor.bulgular.map((item, i) => (
                <li key={i} className="flex gap-2 font-serif text-base text-gray-700">
                  <span className="text-gray-300">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <p className={`${labelClass} mt-6`}>HAZIRLAYANLAR</p>
            <div className="space-y-1 font-sans text-base text-gray-700">
              {rapor.hazirlayanlar.map((h, i) => (
                <p key={i}>
                  <span className="font-medium">{h.isim}</span> ·{" "}
                  <span className="text-sm text-gray-500">{h.rol}</span>
                </p>
              ))}
            </div>

            <p className={`${labelClass} mt-6`}>PROJE DANIŞMANI</p>
            <p className="font-sans text-base text-gray-700">{rapor.danisman}</p>

            <p className={`${labelClass} mt-6`}>YAYIN</p>
            <p className="font-sans text-base text-gray-700">{rapor.yayin}</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Flip Book Modal */}
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
                {Array.from({ length: rapor.sayfaSayisi }, (_, i) => (
                  <Page
                    key={i}
                    number={i + 1}
                    raporBaslik={rapor.baslik}
                    isCover={i === 0}
                    kapakGorseli={i === 0 ? rapor.kapakGorseli : undefined}
                  />
                ))}
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
