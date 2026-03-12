"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

type ContentItem = {
  type: "Yazı" | "Video";
  category: string;
  title: string;
  description: string;
  date: string;
  image: string;
};

const CONTENT_ITEMS: ContentItem[] = [
  {
    type: "Yazı",
    category: "Zihin & Davranış",
    title: "Dijital kimlik ve gençlik: Görünür olmak ile kendin olmak",
    description:
      "Gençlerin dijital ortamda kimlik oluşturma süreçleri ve sosyal medyanın psikolojik etkileri.",
    date: "10 MART 2025",
    image:
      "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=200",
  },
  {
    type: "Yazı",
    category: "Sosyal Psikoloji",
    title: "Otorite ve itaat: Milgram'dan günümüze ne değişti?",
    description:
      "60 yıl sonra Milgram deneyinin güncel psikoloji literatüründeki yeri.",
    date: "25 ŞUBAT 2025",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    type: "Yazı",
    category: "Klinik Psikoloji",
    title: "Sessizliğin psikolojisi: Neden susuyoruz?",
    description:
      "Sessizlik bir savunma mı, yoksa bir güç biçimi mi?",
    date: "15 ŞUBAT 2025",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200",
  },
  {
    type: "Video",
    category: "Podcast",
    title: "Sosyal medya bizi gerçekten yalnızlaştırıyor mu?",
    description:
      "Dijital yalnızlık ve ekran arkasındaki kimlik performansı üzerine.",
    date: "5 MART 2025",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  },
  {
    type: "Video",
    category: "Söyleşi",
    title: "Bağlanma stilleri ve ilişki örüntüleri",
    description:
      "Erken çocukluk bağlanma deneyimlerinin yetişkin ilişkilerine yansımaları.",
    date: "20 ŞUBAT 2025",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  },
];

function ContentCard({ item }: { item: ContentItem }) {
  return (
    <Link href="#" className="group block">
      <div className="flex gap-8 py-6">
        <div className="flex-1 min-w-0">
          <p className="text-sm italic text-gray-500">{item.category}</p>
          <h3 className="mt-2 text-2xl font-bold leading-snug transition group-hover:text-gray-500">
            {item.title}
          </h3>
          <p className="mt-2 font-sans text-sm leading-relaxed text-gray-600">
            {item.description}
          </p>
          <p className="mt-2 font-sans text-xs uppercase tracking-wide text-gray-500">
            by AHMET YILMAZ · {item.date}
          </p>
        </div>
        <div className="w-40 flex-shrink-0">
          <div
            className="h-40 w-40 rounded-sm bg-cover bg-center"
            style={{ backgroundImage: `url('${item.image}')` }}
          />
        </div>
      </div>
    </Link>
  );
}

export default function EkipProfilePage() {
  const [activeTab, setActiveTab] = useState<"Tümü" | "Yazılar" | "Videolar">(
    "Tümü"
  );

  const filteredItems =
    activeTab === "Tümü"
      ? CONTENT_ITEMS
      : activeTab === "Yazılar"
        ? CONTENT_ITEMS.filter((i) => i.type === "Yazı")
        : CONTENT_ITEMS.filter((i) => i.type === "Video");

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* SECTION 1 — Hero */}
      <section className="w-full bg-[#f5f0eb] px-8 py-20 md:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
          <div className="flex-1 lg:w-[70%]">
            <h1 className="text-5xl font-bold md:text-7xl">Ahmet Yılmaz</h1>
            <p className="mt-2 font-serif text-2xl italic text-gray-600">
              WikiPsycho Başkanı, Klinik Psikolog
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center border border-gray-400 transition hover:border-black hover:bg-black hover:text-white"
                aria-label="X"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center border border-gray-400 transition hover:border-black hover:bg-black hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center border border-gray-400 transition hover:border-black hover:bg-black hover:text-white"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <div className="my-6 h-px w-full bg-black/20" />
            <div className="max-w-2xl space-y-4 font-serif text-lg leading-relaxed text-gray-700">
              <p>
                Ahmet Yılmaz, psikoloji alanında topluluk temelli içerik üretimi
                ve akademik iletişim üzerine çalışmaktadır. WikiPsycho&apos;nun
                kurucu ekibinden biri olan Ahmet, platformun genel
                koordinasyonundan ve kurumsal ilişkilerinden sorumludur.
              </p>
              <p>
                Lisans eğitimini psikoloji alanında tamamlayan Ahmet, özellikle
                gençlerde kimlik gelişimi ve dijital psikoloji konularında
                araştırmalar yürütmektedir. Aynı zamanda üniversite
                öğrencilerine yönelik atölye çalışmaları ve seminerler
                düzenlemektedir.
              </p>
              <p>
                WikiPsycho bünyesinde Akademi Birimi ve İçerik Birimi ile yakın
                iş birliği içinde çalışan Ahmet, platformun yayın
                politikasının şekillenmesinde aktif rol üstlenmektedir.
              </p>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-start justify-end lg:w-[30%]">
            <div className="group/photo h-72 w-72 flex-shrink-0 overflow-hidden rounded-none border-4 border-black">
              <div
                className="h-full w-full bg-cover bg-center transition-all duration-300 group-hover/photo:grayscale-0 grayscale"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400')",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Content tabs */}
      <section className="w-full bg-white">
        <div className="h-1 w-full bg-black" />
        <nav className="border-b border-gray-200 px-8 py-4 md:px-16">
          <div className="flex gap-8">
            {(["Tümü", "Yazılar", "Videolar"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-sans text-sm transition ${
                  activeTab === tab
                    ? "font-bold text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>
        <div className="mx-auto max-w-5xl px-8 py-12 md:px-16">
          <div className="divide-y divide-black/10">
            {filteredItems.map((item) => (
              <ContentCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
