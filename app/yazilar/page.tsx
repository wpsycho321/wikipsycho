"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const CATEGORIES = [
  "Tümü",
  "Akademik Araştırmalar",
  "Klinik Psikoloji",
  "Sosyal Psikoloji",
  "Gelişim Psikolojisi",
  "Psikoterapi",
  "Toplum & Kültür",
] as const;

type TabCategory = (typeof CATEGORIES)[number];

const ARTICLES = [
  {
    category: "Zihin & Davranış",
    tabCategory: null as TabCategory | null,
    slug: "dijital-kimlik-ve-genclik",
    title: "Dijital kimlik ve gençlik: Görünür olmak ile kendin olmak",
    description:
      "Gençlerin dijital ortamda kimlik oluşturma süreçleri ve sosyal medyanın psikolojik etkileri üzerine.",
    author: "İKBAL ÇETE",
    image:
      "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=300",
  },
  {
    category: "Klinik Psikoloji",
    tabCategory: "Klinik Psikoloji" as TabCategory,
    slug: "kaygi-mi-uretim",
    title: "Kaygı mı, üretkenlik yakıtı mı? İnce çizgide dengede kalmak",
    description:
      "Hafif kaygının motivasyonla, yoğun kaygının tükenmişlikle nasıl kesiştiği.",
    author: "ELİF NUR YILDIZ",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300",
  },
  {
    category: "Sosyal Psikoloji",
    tabCategory: "Sosyal Psikoloji" as TabCategory,
    slug: "sosyal-medya-ideal-benlik",
    title: "Sosyal medyada ideal benlik inşası ve yalnızlık paradoksu",
    description:
      "Daha fazla görünür oldukça neden kendimizi daha yalnız hissediyoruz?",
    author: "MEHMET ALİ KARACA",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300",
  },
  {
    category: "Gelişim Psikolojisi",
    tabCategory: "Gelişim Psikolojisi" as TabCategory,
    slug: "genclikte-kimlik-arayisi",
    title: "Gençlerde kimlik arayışı: Sessiz odalarda süren yüksek sesli savaş",
    description: "Ergenlik döneminde oda kapılarının ardında neler oluyor?",
    author: "DUYGU KORKMAZ",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300",
  },
  {
    category: "Psikoterapi",
    tabCategory: "Psikoterapi" as TabCategory,
    slug: "terapi-odasi-anatomisi",
    title: "Bir terapi odasının anatomisi: Dinlenmek mi, duyulmak mı?",
    description:
      "Terapötik ilişkinin söylenenlerden çok nasıl dinlediğimizle şekillendiği.",
    author: "SELİN AKSOY",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=300",
  },
  {
    category: "Akademik Araştırmalar",
    tabCategory: "Akademik Araştırmalar" as TabCategory,
    slug: "milgram-otorite-itaat",
    title: "Otorite ve itaat: Milgram'dan günümüze ne değişti?",
    description:
      "60 yıl sonra Milgram deneyinin güncel psikoloji literatüründeki yeri.",
    author: "İKBAL ÇETE",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
  },
];

const NEWS = [
  {
    category: "Araştırma",
    tabCategory: "Akademik Araştırmalar" as TabCategory,
    slug: "dijital-kimlik-ve-genclik",
    title: "Türkiye'de ergenlerde ekran bağımlılığı yüzde 40 arttı",
    description:
      "TÜBİTAK destekli yeni araştırmanın bulguları kamuoyuyla paylaşıldı.",
    author: "WikiPsycho",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300",
  },
  {
    category: "Klinik",
    tabCategory: "Klinik Psikoloji" as TabCategory,
    slug: "dijital-kimlik-ve-genclik",
    title: "Yapay zeka destekli psikolojik destek sistemleri yaygınlaşıyor",
    description:
      "Dünya genelinde 12 ülkede pilot uygulamalar başladı, etkinlik tartışılıyor.",
    author: "WikiPsycho",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300",
  },
  {
    category: "Toplum",
    tabCategory: "Toplum & Kültür" as TabCategory,
    slug: "dijital-kimlik-ve-genclik",
    title: "Yas ve toplumsal baskı: Geç artık kültürünün psikolojik bedeli",
    description:
      "Kayıpların normalleştirilmesi üzerine yeni bir klinik perspektif.",
    author: "WikiPsycho",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
  },
  {
    category: "Eğitim",
    tabCategory: "Gelişim Psikolojisi" as TabCategory,
    slug: "dijital-kimlik-ve-genclik",
    title: "Okullarda psikolojik güvenlik: Öğretmen mi, psikolog mu?",
    description:
      "MEB'in yeni yönergesi okul psikolojik danışmanlığını yeniden tanımlıyor.",
    author: "WikiPsycho",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300",
  },
  {
    category: "Araştırma",
    tabCategory: "Akademik Araştırmalar" as TabCategory,
    slug: "dijital-kimlik-ve-genclik",
    title: "Bağlanma stilleri iş yerinde de belirleyici",
    description: "Harvard'ın yeni meta-analizi 40.000 çalışanı kapsıyor.",
    author: "WikiPsycho",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
  },
  {
    category: "Klinik",
    tabCategory: "Klinik Psikoloji" as TabCategory,
    slug: "dijital-kimlik-ve-genclik",
    title: "Depresyon tedavisinde ketamin: Umut mu, risk mi?",
    description:
      "FDA onaylı yeni nesil antidepresan uygulamalarının Türkiye'deki yansımaları.",
    author: "WikiPsycho",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
  },
];

type CardItem = (typeof ARTICLES)[number] | (typeof NEWS)[number];

function ArticleCard({
  item,
  overrideCategory,
}: {
  item: CardItem;
  overrideCategory?: string;
}) {
  const displayCategory = overrideCategory ?? item.category;
  return (
    <Link href={`/yazilar/${item.slug}`} className="group block">
      <div className="flex gap-6 py-6">
        <div className="flex-1 min-w-0">
          <p className="text-sm italic text-gray-500">{displayCategory}</p>
          <h3 className="mt-2 text-2xl font-bold leading-snug transition group-hover:text-gray-500">
            {item.title}
          </h3>
          <p className="mt-2 font-sans text-sm leading-relaxed text-gray-600">
            {item.description}
          </p>
          <p className="mt-2 font-sans text-xs italic uppercase tracking-wide text-gray-700">
            by {item.author}
          </p>
        </div>
        <div className="w-[30%] flex-shrink-0">
          <div
            className="aspect-square w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${item.image}')` }}
          />
        </div>
      </div>
    </Link>
  );
}

export default function YazilarPage() {
  const [activeCategory, setActiveCategory] = useState<TabCategory>("Tümü");

  const filteredArticles =
    activeCategory === "Tümü"
      ? []
      : ARTICLES.filter((a) => a.tabCategory === activeCategory);
  const filteredNews =
    activeCategory === "Tümü"
      ? []
      : NEWS.filter((n) => n.tabCategory === activeCategory);
  const filteredItems: CardItem[] = [...filteredArticles, ...filteredNews];

  return (
    <div
      className={`${playfair.className} min-h-screen bg-white text-black`}
    >
      {/* Page header */}
      <header className="w-full px-12 py-16">
        <h1 className="leading-tight">
          <span className="block text-6xl md:text-8xl">Yazılar</span>
          <span className="mt-2 inline-block text-2xl italic md:text-3xl">
            ve{" "}
          </span>
          <span className="inline-block font-sans text-2xl font-bold uppercase tracking-[0.25em] md:text-3xl">
            HABERLERİ
          </span>
        </h1>
        <div className="mt-6 h-1 w-full bg-black" />
      </header>

      {/* Sticky category tab bar */}
      <div className="sticky top-0 z-10 border-b border-black/10 bg-white">
        <nav className="flex gap-8 overflow-x-auto px-12 py-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 pb-2 font-sans text-sm transition ${
                activeCategory === cat
                  ? "font-bold text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* Content area */}
      <main className="px-12 py-12">
        {activeCategory === "Tümü" ? (
          /* Mode 1: Two columns */
          <div className="flex gap-8">
            {/* Left column - Güncel Yazılar */}
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                GÜNCEL YAZILAR
              </p>
              <div className="divide-y divide-black/10">
                {ARTICLES.map((item) => (
                  <ArticleCard key={item.title} item={item} />
                ))}
              </div>
            </div>

            {/* Vertical divider */}
            <div className="w-px flex-shrink-0 bg-black/10" />

            {/* Right column - Haberler */}
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                HABERLER
              </p>
              <div className="divide-y divide-black/10">
                {NEWS.map((item) => (
                  <ArticleCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Mode 2: Single column, filtered */
          <div className="mx-auto max-w-3xl">
            <div className="divide-y divide-black/10">
              {filteredItems.map((item) => (
                <ArticleCard
                  key={`${item.title}-${item.category}`}
                  item={item}
                  overrideCategory={activeCategory}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
