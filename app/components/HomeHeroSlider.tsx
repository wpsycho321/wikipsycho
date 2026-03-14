"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type FeaturedCard = {
  tag: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  href: string;
};

export default function HomeHeroSlider({
  cards,
}: {
  cards: FeaturedCard[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (cards.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cards.length]);

  if (cards.length === 0) return null;

  return (
    <div className="relative flex w-full flex-1 items-stretch overflow-hidden bg-[#111111] text-white">
      {cards.map((card, index) => (
        <Link
          key={`${card.title}-${index}`}
          href={card.href}
          className={`absolute inset-0 z-0 block cursor-pointer transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative flex h-full w-full flex-col justify-between">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.image})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative flex h-full flex-col justify-between px-10 py-10">
              <div className="flex items-start justify-between text-xs uppercase tracking-[0.22em]">
                <span>{card.tag}</span>
              </div>
              <div className="mt-auto max-w-xl">
                <h2 className="mb-3 text-3xl font-bold leading-tight md:text-4xl">
                  {card.title}
                </h2>
                <p className="mb-4 font-sans text-sm leading-relaxed text-white/80">
                  {card.description}
                </p>
                <p className="text-xs uppercase tracking-[0.18em]">
                  {card.meta}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <button
        type="button"
        aria-label="Önceki içerik"
        onClick={() =>
          setActiveIndex((activeIndex - 1 + cards.length) % cards.length)
        }
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 p-2 hover:bg-black/70"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Sonraki içerik"
        onClick={() => setActiveIndex((activeIndex + 1) % cards.length)}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 p-2 hover:bg-black/70"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {cards.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full border border-white transition ${
              i === activeIndex ? "bg-white" : "bg-transparent opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
