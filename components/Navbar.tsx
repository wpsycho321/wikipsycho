"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const navItems = [
  {
    label: "Hakkımızda",
    href: "#",
      dropdown: [
        { label: "Biz Kimiz", href: "/hakkimizda/biz-kimiz" },
        { label: "Ekibimiz", href: "/hakkimizda/ekibimiz" },
        { label: "Birimler", href: "/hakkimizda/birimler" },
        { label: "Etkinlikler", href: "/hakkimizda/etkinlikler" },
      ],
  },
  {
    label: "Yayınlar",
    href: "#",
    dropdown: [
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
  { label: "Yazılar", href: "/yazilar" },
  { label: "Projeler", href: "/projeler" },
  { label: "İlanlar", href: "/ilanlar" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`${playfair.className} sticky top-0 z-50 bg-black text-white`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight hover:text-white/90"
        >
          WikiPsycho
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            "dropdown" in item && item.dropdown ? (
              <div
                key={item.label}
                className="group relative inline-flex"
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm hover:text-white/90"
                >
                  {item.label}
                  <svg
                    className="h-3 w-3 transition group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="min-w-[180px] rounded-md border border-white/10 bg-black/95 py-2 shadow-lg backdrop-blur">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2 text-sm hover:bg-white/10"
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
                className="text-sm hover:text-white/90"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Search - Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          {isSearchOpen ? (
            <div className="flex items-center gap-2">
              <input
                type="search"
                placeholder="Ara..."
                className="w-48 rounded border border-white/20 bg-white/5 px-3 py-1.5 text-sm placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsSearchOpen(false);
                }}
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="rounded p-1 hover:bg-white/10"
                aria-label="Aramayı kapat"
              >
                <svg
                  className="h-4 w-4"
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
          ) : (
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="rounded p-1.5 hover:bg-white/10"
              aria-label="Ara"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}
          <Link
            href="/studio"
            className="rounded border border-white px-3 py-1.5 font-sans text-xs font-medium transition hover:bg-white/10"
          >
            Ekip Girişi
          </Link>
        </div>

        {/* Mobile: Hamburger + Search */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded p-2 hover:bg-white/10"
            aria-label="Ara"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded p-2 hover:bg-white/10"
            aria-label="Menü"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
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
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-white/10 px-4 py-3 md:hidden">
          <input
            type="search"
            placeholder="Ara..."
            className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
            autoFocus
          />
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-white/10 md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) =>
              "dropdown" in item && item.dropdown ? (
                <div key={item.label} className="space-y-1">
                  <p className="px-3 py-2 text-sm font-medium text-white/70">
                    {item.label}
                  </p>
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block rounded px-4 py-2 text-sm hover:bg-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded px-4 py-2 text-sm hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
