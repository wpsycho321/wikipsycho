"use client";

import { Figtree, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

// Menü yazıları: küçük boyda net okunan sade tip. Logo Playfair'de kalır.
const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

type Oge = { label: string; href: string; dropdown?: { label: string; href: string }[] };

const navItems: Oge[] = [
  {
    label: "Hakkımızda",
    href: "#",
    dropdown: [
      { label: "Biz Kimiz", href: "/hakkimizda/biz-kimiz" },
      { label: "Ekibimiz", href: "/hakkimizda/ekibimiz" },
      { label: "Birimler", href: "/hakkimizda/birimler" },
      { label: "Etkinlikler", href: "/hakkimizda/etkinlikler" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
  {
    label: "Yayınlar",
    href: "#",
    dropdown: [
      { label: "Yazılar", href: "/yazilar" },
      { label: "Proje Raporları", href: "/yayinlar/proje-raporlari" },
      { label: "E-Yayınlar", href: "/yayinlar/e-yayinlar" },
    ],
  },
  {
    label: "Medya",
    href: "#",
    dropdown: [
      { label: "Videolar", href: "/medya/videolar" },
      { label: "Podcastlar", href: "/medya/podcastlar" },
    ],
  },
  { label: "Haberler", href: "/haberler" },
  { label: "Projeler", href: "/projeler" },
  { label: "İlanlar", href: "/ilanlar" },
];

const EKIP_GIRISI = "https://panel.wikipsycho.org.tr";

function Ok({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-3 w-3 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function AraSimge({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <circle cx="11" cy="11" r="7" strokeWidth={2.2} />
      <path strokeLinecap="round" strokeWidth={2.2} d="m20 20-3.5-3.5" />
    </svg>
  );
}

/** Menü öğesinin arkasında, üzerine gelince büyüyerek beliren siyah kapsül */
function Kapsul({ aktif }: { aktif: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute inset-0 -z-10 rounded-full bg-black transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
        aktif ? "scale-100 opacity-100" : "scale-75 opacity-0 group-hover/oge:scale-100 group-hover/oge:opacity-100"
      }`}
    />
  );
}

/** WikiSosyal: sitenin siyah-beyazından bilerek ayrılan, renkli ve hareketli düğme */
function WikiSosyalDugmesi({ tam = false, onClick }: { tam?: boolean; onClick?: () => void }) {
  return (
    <Link
      href="/wikisosyal"
      onClick={onClick}
      className={`ws-dugme group/ws relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-4 py-2.5 text-[14px] font-semibold text-white shadow-[0_8px_22px_-10px_rgba(91,71,200,.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(210,105,30,.85)] ${
        tam ? "w-full" : ""
      }`}
    >
      <span aria-hidden className="ws-parilti pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/35 blur-[2px]" />
      <span aria-hidden className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      <span className="relative">WikiSosyal</span>
      <span className="relative rounded-full bg-white/20 px-1.5 py-0.5 text-[9.5px] font-bold tracking-[0.08em]">YAKINDA</span>
    </Link>
  );
}

export default function Navbar() {
  const yol = usePathname() ?? "/";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [kaydi, setKaydi] = useState(false);

  // Sayfa kaydırılınca bar hafif gölge alır
  useEffect(() => {
    const f = () => setKaydi(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const aktifMi = (o: Oge) =>
    o.dropdown ? o.dropdown.some((s) => yol === s.href || yol.startsWith(s.href + "/")) : yol === o.href || yol.startsWith(o.href + "/");

  const kapat = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav
      className={`${figtree.className} sticky top-0 z-50 border-b bg-white/90 text-[#111] backdrop-blur-md transition-shadow duration-300 ${
        kaydi ? "border-black/10 shadow-[0_6px_24px_-16px_rgba(0,0,0,.35)]" : "border-black/[0.07]"
      }`}
    >
      <style>{`
        .ws-dugme{background:linear-gradient(110deg,#5B47C8 0%,#7B5CE6 35%,#D2691E 70%,#5B47C8 100%);background-size:220% 100%;animation:ws-akis 6s ease-in-out infinite}
        .ws-parilti{animation:ws-parla 3.6s ease-in-out infinite}
        @keyframes ws-akis{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes ws-parla{0%,55%{transform:translateX(0) skewX(-20deg)}100%{transform:translateX(560%) skewX(-20deg)}}
        @media (prefers-reduced-motion: reduce){.ws-dugme,.ws-parilti{animation:none}}
      `}</style>

      <div className="relative z-[55] mx-auto flex h-[92px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group/logo flex shrink-0 items-center" aria-label="WikiPsycho ana sayfa">
          <Image
            src="/logo-wikipsycho.svg"
            alt="WikiPsycho"
            width={172}
            height={37}
            priority
            className="h-[37px] w-auto transition-opacity duration-300 group-hover/logo:opacity-70"
          />
        </Link>

        {/* Masaüstü menü */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const aktif = aktifMi(item);
            const renk = aktif ? "text-white" : "text-[#2B2B2B] group-hover/oge:text-white";
            return item.dropdown ? (
              <div key={item.label} className="group/oge relative isolate">
                <button
                  type="button"
                  className={`relative flex items-center gap-1 rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors duration-300 ${renk}`}
                >
                  <Kapsul aktif={aktif} />
                  {item.label}
                  <Ok className="transition-transform duration-300 group-hover/oge:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover/oge:visible group-hover/oge:opacity-100">
                  <div className="min-w-[210px] translate-y-1 rounded-2xl border border-black/[0.08] bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,.35)] transition-transform duration-300 group-hover/oge:translate-y-0">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className={`block rounded-xl px-3.5 py-2.5 text-[14.5px] font-medium transition-colors duration-200 hover:bg-black hover:text-white ${
                          yol === sub.href ? "bg-black/[0.06]" : "text-[#2B2B2B]"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`group/oge relative isolate rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors duration-300 ${renk}`}
              >
                <Kapsul aktif={aktif} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Masaüstü sağ: arama · ekip girişi · WikiSosyal (en sağda) */}
        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          {isSearchOpen ? (
            <div className="flex items-center gap-1 rounded-full border border-black/15 bg-white pl-3 pr-1">
              <AraSimge className="h-4 w-4 text-black/50" />
              <input
                type="search"
                placeholder="Ara..."
                className="w-40 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-black/40"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsSearchOpen(false);
                }}
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="rounded-full p-1.5 text-black/60 transition hover:bg-black hover:text-white"
                aria-label="Aramayı kapat"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.05] text-[#2B2B2B] transition-all duration-300 hover:bg-black hover:text-white"
              aria-label="Ara"
            >
              <AraSimge />
            </button>
          )}
          <Link
            href={EKIP_GIRISI}
            className="rounded-full border border-black px-4 py-2.5 text-[14px] font-semibold transition-all duration-300 hover:bg-black hover:text-white"
          >
            Ekip Girişi
          </Link>
          <WikiSosyalDugmesi />
        </div>

        {/* Mobil: arama + menü */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black hover:text-white"
            aria-label="Ara"
          >
            <AraSimge />
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
            aria-label="Menü"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobil arama */}
      {isSearchOpen && (
        <div className="relative z-[55] border-t border-black/[0.07] bg-white px-4 py-3 lg:hidden">
          <input
            type="search"
            placeholder="Ara..."
            className="w-full rounded-full border border-black/15 px-4 py-2.5 text-sm outline-none placeholder:text-black/40 focus:border-black"
            autoFocus
          />
        </div>
      )}

      {/* Arka perde */}
      {isMobileMenuOpen && <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden" onClick={kapat} aria-hidden />}

      {/* Mobil çekmece */}
      <div
        className={`fixed right-0 top-0 z-[60] flex h-full w-[85%] max-w-sm flex-col bg-white text-[#111] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] lg:hidden ${
          isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "pointer-events-none translate-x-full shadow-none"
        }`}
      >
        <div className="flex h-[84px] items-center justify-between border-b border-black/[0.07] px-5">
          <span className={`${playfair.className} text-xl font-bold`}>Menü</span>
          <button
            type="button"
            onClick={kapat}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.05] transition hover:bg-black hover:text-white"
            aria-label="Menüyü kapat"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.label}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-[16px] font-semibold transition-colors hover:bg-black hover:text-white"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  <Ok className={`h-4 w-4 transition-transform duration-300 ${openDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    openDropdown === item.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="ml-4 space-y-0.5 border-l border-black/10 py-1 pl-3">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block rounded-xl px-3 py-2.5 text-[15px] text-[#3A3A3A] transition-colors hover:bg-black hover:text-white"
                          onClick={kapat}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`block rounded-2xl px-4 py-3 text-[16px] font-semibold transition-colors hover:bg-black hover:text-white ${
                  aktifMi(item) ? "bg-black text-white" : ""
                }`}
                onClick={kapat}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="space-y-2.5 border-t border-black/[0.07] p-4">
          <WikiSosyalDugmesi tam onClick={kapat} />
          <Link
            href={EKIP_GIRISI}
            className="flex w-full items-center justify-center rounded-full border border-black py-2.5 text-[14px] font-semibold transition hover:bg-black hover:text-white"
          >
            Ekip Girişi
          </Link>
        </div>
      </div>
    </nav>
  );
}
