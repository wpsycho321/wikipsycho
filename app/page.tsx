"use client";

import { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const editorials = [
  {
    category: "ZİHİN & DAVRANIŞ",
    title: "Dijital çağda dikkat dağınıklığı beynimizi nasıl şekillendiriyor?",
    description:
      "Sürekli bildirimlerin ve çoklu ekranların, odaklanma kapasitemiz ve içsel sessizlikle ilişkimizi nasıl yeniden tanımladığını keşfedin.",
    author: "Hazırlayan: İkbal Çete",
  },
  {
    category: "KLİNİK PSİKOLOJİ",
    title: "Kaygı mı, üretkenlik yakıtı mı? İnce çizgide dengede kalmak",
    description:
      "Hafif kaygının motivasyonla, yoğun kaygının ise tükenmişlikle nasıl kesiştiğini, vaka örnekleriyle ele alıyoruz.",
    author: "Hazırlayan: Elif Nur Yıldız",
  },
  {
    category: "TOPLUM & KÜLTÜR",
    title: "Sosyal medyada \"ideal benlik\" inşası ve yalnızlık paradoksu",
    description:
      "Daha fazla görünür oldukça neden kendimizi daha yalnız hissediyoruz? Kimlik performansı ve aidiyet duygusu üzerine bir okuma.",
    author: "Hazırlayan: Mehmet Ali Karaca",
  },
  {
    category: "GELİŞİM PSİKOLOJİSİ",
    title: "Gençlerde kimlik arayışı: Sessiz odalarda süren yüksek sesli savaş",
    description:
      "Ergenlik döneminde oda kapılarının ardında neler oluyor? Aile dinamikleri ve akran baskısının görünmeyen etkileri.",
    author: "Hazırlayan: Duygu Korkmaz",
  },
  {
    category: "İŞ & PERFORMANS",
    title: "Derin odaklanma, sığ iş: Zihinsel yorgunluk çağında çalışmak",
    description:
      "Toplantı, e-posta ve bildirim üçgeninde sıkışan profesyoneller için, bilimsel temelli odaklanma stratejileri.",
    author: "Hazırlayan: Onur Demir",
  },
  {
    category: "PSİKOTERAPİ",
    title: "Bir terapi odasının anatomisi: Dinlenmek mi, duyulmak mı?",
    description:
      "Terapötik ilişkinin, söylenenlerden çok nasıl dinlendiğimizle şekillendiğini ele alan klinik bir inceleme.",
    author: "Hazırlayan: Selin Aksoy",
  },
];

const featuredCards = [
  {
    tag: "ETKİNLİK",
    title: "Oyun Terapisi Atölyesi — Nisan 2025",
    description:
      "Çocuklarla çalışan profesyoneller için uygulamalı bir gün.",
    meta: "Eğitim Birimi · 15 Nisan 2025",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
  },
  {
    tag: "YENİ RAPOR",
    title: "Dijital Bağımlılık Saha Araştırması Yayınlandı",
    description:
      "Lise öğrencileriyle yürütülen 3 aylık alan çalışmasının bulguları.",
    meta: "Akademi Birimi · Mart 2025",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
  },
  {
    tag: "DUYURU",
    title: "WikiPsycho Gönüllü Başvuruları Açıldı",
    description:
      "2025 dönemi için 7 birimde gönüllü alımı başlıyor.",
    meta: "WikiPsycho · Mart 2025",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredCards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* Hero - edge-to-edge, two equal columns */}
      <section className="flex min-h-[80vh] w-full">
        {/* Left column */}
        <div className="flex w-1/2 items-center bg-white">
          <div className="px-8 md:px-16">
            <p className="mb-4 text-xs tracking-[0.25em]">
              PSİKOLOJİ TOPLULUĞU
            </p>
            <h1 className="mb-6 text-5xl leading-tight md:text-6xl">
              Psikolojiyi Anlat, Paylaş, Dönüştür!
            </h1>
            <p className="max-w-xl text-sm leading-relaxed font-sans">
              WikiPsycho, psikoloji alanında merak eden, üreten ve paylaşan
              insanları bir araya getiren bağımsız bir içerik platformudur.
              Araştırmadan sanata, klinik bilgiden gündelik yaşama kadar
              psikolojiyi herkes için erişilebilir kılıyoruz.
            </p>
          </div>
        </div>

        {/* Right column - slider */}
        <div className="relative flex w-1/2 items-stretch overflow-hidden bg-[#111111] text-white">
          {featuredCards.map((card, index) => (
            <div
              key={card.title}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative flex h-full w-full flex-col justify-between">
                {/* Full-cover background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${card.image})`,
                  }}
                />
                {/* Dark overlay (60% opacity) */}
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative flex h-full flex-col justify-between px-10 py-10">
                  <div className="flex items-start justify-between text-xs uppercase tracking-[0.22em]">
                    <span>{card.tag}</span>
                  </div>

                  <div className="mt-auto max-w-xl">
                    <h2 className="mb-3 text-3xl font-bold leading-tight md:text-4xl">
                      {card.title}
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed font-sans text-white/80">
                      {card.description}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em]">
                      {card.meta}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Arrow navigation */}
          <button
            type="button"
            aria-label="Önceki içerik"
            onClick={() =>
              setActiveIndex(
                (activeIndex - 1 + featuredCards.length) % featuredCards.length,
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 p-2 hover:bg-black/70"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Sonraki içerik"
            onClick={() =>
              setActiveIndex((activeIndex + 1) % featuredCards.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 p-2 hover:bg-black/70"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {featuredCards.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 w-1.5 rounded-full border border-white transition ${
                  index === activeIndex
                    ? "bg-white"
                    : "bg-transparent opacity-60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Everything below hero - full-width editorial strip */}
      <main className="flex w-full flex-col gap-16 px-0 pb-12 pt-10">
        {/* Three-column editorial section */}
        <section className="w-full border-t border-black/10 bg-white">
          <div className="flex flex-col md:flex-row">
            {/* Left column - Güncel Yazılar */}
            <div className="w-full border-b border-black/10 px-6 py-10 md:w-1/4 md:border-b-0 md:border-r">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                GÜNCEL YAZILAR
              </p>
              <div className="mt-3 h-px w-full bg-black/10" />

              <div className="mt-6 space-y-6">
                {/* Card 1 */}
                <article className="space-y-3">
                  <div
                    className="w-full rounded-sm bg-gray-200 bg-cover bg-center pb-[66%]"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800')",
                    }}
                  />
                  <p className="text-sm italic text-gray-500">
                    Zihin &amp; Davranış
                  </p>
                  <h3 className="text-xl font-bold leading-snug">
                    Dijital kimlik ve gençlik: Görünür olmak ile kendin olmak
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-gray-600">
                    Gençlerin dijital ortamda kimlik oluşturma süreçleri ve
                    sosyal medyanın psikolojik etkileri.
                  </p>
                  <p className="font-sans text-xs uppercase tracking-wide text-gray-800">
                    by İKBAL ÇETE
                  </p>
                </article>

                <div className="h-px w-full bg-black/10" />

                {/* Card 2 */}
                <article className="space-y-3">
                  <div
                    className="w-full rounded-sm bg-gray-200 bg-cover bg-center pb-[66%]"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1557825835-70d97c4aa06a?w=800')",
                    }}
                  />
                  <p className="text-sm italic text-gray-500">
                    Klinik Psikoloji
                  </p>
                  <h3 className="text-xl font-bold leading-snug">
                    Kaygı mı, üretkenlik yakıtı mı? İnce çizgide dengede kalmak
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-gray-600">
                    Hafif kaygının motivasyonla, yoğun kaygının ise
                    tükenmişlikle nasıl kesiştiği.
                  </p>
                  <p className="font-sans text-xs uppercase tracking-wide text-gray-800">
                    by ELİF NUR YILDIZ
                  </p>
                </article>
              </div>
            </div>

            {/* Center column - Video & Podcast */}
            <div className="w-full border-b border-black/10 px-6 py-10 md:w-2/4 md:border-b-0 md:border-r">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                VİDEO &amp; PODCAST
              </p>
              <div className="mt-3 h-px w-full bg-black/10" />

              <div className="mt-6 space-y-8">
                {/* Main card */}
                <article className="space-y-4">
                  <div
                    className="relative w-full overflow-hidden rounded-sm bg-gray-300 bg-cover bg-center pb-[56.25%]"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200')",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
                        <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-black" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-sans uppercase tracking-wide text-black">
                      24 dk
                    </div>
                  </div>

                  <p className="text-sm italic text-gray-500">Podcast</p>
                  <h3 className="text-3xl font-bold leading-snug">
                    Sosyal medya bizi gerçekten yalnızlaştırıyor mu?
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-gray-600">
                    Bu bölümde sosyal bağlantı yanılsamasını, dijital yalnızlığı
                    ve ekran arkasındaki kimlik performansını konuşuyoruz.
                  </p>
                  <p className="font-sans text-xs uppercase tracking-wide text-gray-800">
                    with PROF. DR. AHMET KAYA
                  </p>
                </article>

                <div className="h-px w-full bg-black/10" />

                {/* Secondary card */}
                <article className="space-y-3">
                  <div
                    className="w-full rounded-sm bg-gray-300 bg-cover bg-center pb-[40%]"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900')",
                    }}
                  />
                  <p className="text-sm italic text-gray-500">Video</p>
                  <h3 className="text-xl font-bold leading-snug">
                    Travma sonrası büyüme: Kırılganlıktan güce
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-wide text-gray-800">
                    with DR. SELİN AKSOY
                  </p>
                </article>
              </div>
            </div>

            {/* Right column - Psikoloji Haberleri */}
            <div className="w-full px-6 py-10 md:w-1/4">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                PSİKOLOJİ HABERLERİ
              </p>
              <div className="mt-3 h-px w-full bg-black/10" />

              <div className="mt-6 space-y-6">
                {/* News 1 */}
                <article className="space-y-2">
                  <p className="text-sm italic text-gray-500">Araştırma</p>
                  <h3 className="text-lg font-bold leading-snug">
                    Türkiye&apos;de ergenlerde ekran bağımlılığı yüzde 40 arttı
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-gray-600">
                    TÜBİTAK destekli yeni araştırmanın bulguları.
                  </p>
                  <p className="font-sans text-xs uppercase tracking-wide text-gray-800">
                    10 MART 2025
                  </p>
                </article>

                <div className="h-px w-full bg-black/10" />

                {/* News 2 */}
                <article className="space-y-2">
                  <p className="text-sm italic text-gray-500">Klinik</p>
                  <h3 className="text-lg font-bold leading-snug">
                    Yeni nesil terapi: Yapay zeka destekli psikolojik destek
                    sistemleri
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-gray-600">
                    Dünya genelinde 12 ülkede pilot uygulamalar başladı.
                  </p>
                  <p className="font-sans text-xs uppercase tracking-wide text-gray-800">
                    8 MART 2025
                  </p>
                </article>

                <div className="h-px w-full bg-black/10" />

                {/* News 3 */}
                <article className="space-y-2">
                  <p className="text-sm italic text-gray-500">Toplum</p>
                  <h3 className="text-lg font-bold leading-snug">
                    Yas ve toplumsal baskı: &quot;Geç artık&quot; kültürünün
                    psikolojik bedeli
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-gray-600">
                    Kayıpların normalleştirilmesi üzerine yeni bir perspektif.
                  </p>
                  <p className="font-sans text-xs uppercase tracking-wide text-gray-800">
                    5 MART 2025
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width featured publication banner */}
        <section className="flex min-h-[70vh] w-full">
          {/* Left column - text block */}
          <div className="flex w-full items-center justify-center bg-black px-8 py-10 text-center text-white md:w-[30%]">
            <div className="max-w-md space-y-4">
              <p className="text-sm italic text-gray-300">E-Yayın</p>
              <h2 className="text-3xl md:text-4xl">
                Dijital Çağda Kimlik: Gençlik, Sosyal Medya ve Psikolojik
                Dönüşüm
              </h2>
              <p className="font-sans text-sm leading-relaxed text-gray-300">
                WikiPsycho Akademi&apos;nin hazırladığı bu rapor, Z kuşağının
                dijital kimlik inşasını 3 aylık saha araştırmasıyla ele alıyor.
              </p>
              <p className="font-sans text-xs uppercase tracking-wide italic text-white">
                by AKADEMİ BİRİMİ
              </p>
            </div>
          </div>

          {/* Right column - image */}
          <div
            className="hidden bg-cover bg-center md:block md:w-[70%]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200')",
            }}
          />
        </section>

        {/* Author spotlight section */}
        <section className="w-full bg-white">
          {/* Header */}
          <div className="mx-auto max-w-4xl px-6 py-12 text-center">
            <h2 className="text-3xl tracking-wide">
              <span className="font-bold">KÖŞE</span>
              <span className="font-normal"> YAZISI</span>
            </h2>
            <p className="mt-3 italic">
              Psikoloji üzerine düşünen, sorgulayan ve yazan bir ses.
            </p>
            <p className="mt-2 text-sm">with İKBAL ÇETE</p>
            <div className="mt-6 h-px w-full bg-black/10" />
          </div>

          {/* Content */}
          <div className="flex flex-col border-t border-black/5 md:flex-row">
            {/* Left column - author image */}
            <div
              className="h-72 w-full bg-cover bg-center md:h-auto md:w-1/2"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800')",
              }}
            />

            {/* Right column - articles list */}
            <div className="w-full md:w-1/2">
              <div className="divide-y divide-black/10">
                {/* Row 1 */}
                <article className="flex gap-4 px-6 py-6">
                  <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-bold leading-snug">
                      Sessizliğin psikolojisi: Neden susuyoruz?
                    </h3>
                    <p className="font-sans text-sm text-gray-500">
                      Sessizlik bir savunma mı, yoksa bir güç biçimi mi?
                    </p>
                    <p className="font-sans text-xs uppercase tracking-wide">
                      by İKBAL ÇETE
                    </p>
                  </div>
                  <div
                    className="h-24 w-24 flex-shrink-0 bg-gray-200 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=200')",
                    }}
                  />
                </article>

                {/* Row 2 */}
                <article className="flex gap-4 px-6 py-6">
                  <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-bold leading-snug">
                      Mükemmeliyetçilik bir erdem değil, bir tuzak
                    </h3>
                    <p className="font-sans text-sm text-gray-500">
                      Yüksek standartlar ile felç edici beklentiler arasındaki
                      ince çizgi.
                    </p>
                    <p className="font-sans text-xs uppercase tracking-wide">
                      by İKBAL ÇETE
                    </p>
                  </div>
                  <div
                    className="h-24 w-24 flex-shrink-0 bg-gray-200 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200')",
                    }}
                  />
                </article>

                {/* Row 3 */}
                <article className="flex gap-4 px-6 py-6">
                  <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-bold leading-snug">
                      Aidiyet ihtiyacı ve modern yalnızlık paradoksu
                    </h3>
                    <p className="font-sans text-sm text-gray-500">
                      Bağlı olmak ile ait olmak arasındaki derin fark üzerine.
                    </p>
                    <p className="font-sans text-xs uppercase tracking-wide">
                      by İKBAL ÇETE
                    </p>
                  </div>
                  <div
                    className="h-24 w-24 flex-shrink-0 bg-gray-200 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=200')",
                    }}
                  />
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* AY'IN TEMASI - Bu bölüm CMS bağlandığında dinamik hale gelecek. Her yeni tema en üste gelecek, eskiler arşivde birikecek. */}
        <section className="w-full bg-white">
          {/* Header */}
          <div className="mx-auto max-w-4xl px-6 py-12 text-center">
            <h2 className="text-3xl tracking-wide">
              <span className="font-bold">AY&apos;IN</span>
              <span className="font-normal"> TEMASI</span>
            </h2>
            <p className="mt-3 italic">Bu ay: Savaş Psikolojisi</p>
            <div className="mt-6 h-px w-full bg-black/10" />
          </div>

          {/* Content */}
          <div className="flex flex-col border-t border-black/5 md:flex-row">
            {/* Left column - article list */}
            <div className="w-full border-b border-black/10 md:w-2/5 md:border-b-0 md:border-r">
              <div className="divide-y divide-black/10">
                {/* Row 1 */}
                <article className="flex gap-4 px-6 py-6">
                  <div
                    className="h-24 w-24 flex-shrink-0 bg-gray-200 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200')",
                    }}
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-bold leading-snug">
                      Savaşın gölgesinde büyümek: Çocuklarda travma ve
                      dayanıklılık
                    </h3>
                    <p className="font-sans text-sm text-gray-500">
                      Çatışma bölgelerinde yetişen çocukların psikolojik
                      gelişimi üzerine.
                    </p>
                    <p className="font-sans text-xs italic uppercase tracking-wide">
                      by ELİF NUR YILDIZ
                    </p>
                  </div>
                </article>

                {/* Row 2 */}
                <article className="flex gap-4 px-6 py-6">
                  <div
                    className="h-24 w-24 flex-shrink-0 bg-gray-200 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200')",
                    }}
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-bold leading-snug">
                      Askeri psikoloji: İtaat, otorite ve vicdanın sınırları
                    </h3>
                    <p className="font-sans text-sm text-gray-500">
                      Milgram&apos;dan günümüze savaş psikolojisinin etik
                      boyutları.
                    </p>
                    <p className="font-sans text-xs italic uppercase tracking-wide">
                      by MEHMET ALİ KARACA
                    </p>
                  </div>
                </article>

                {/* Row 3 */}
                <article className="flex gap-4 px-6 py-6">
                  <div
                    className="h-24 w-24 flex-shrink-0 bg-gray-200 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=200')",
                    }}
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-bold leading-snug">
                      Kolektif yas: Toplumlar kayıplarını nasıl işler?
                    </h3>
                    <p className="font-sans text-sm text-gray-500">
                      Savaş sonrası toplumlarda yas ritüelleri ve toplumsal
                      iyileşme.
                    </p>
                    <p className="font-sans text-xs italic uppercase tracking-wide">
                      by DUYGU KORKMAZ
                    </p>
                  </div>
                </article>
              </div>
            </div>

            {/* Right column - featured content */}
            <div className="w-full md:w-3/5">
              <div className="flex h-full flex-col">
                <div
                  className="w-full bg-cover bg-center pb-[56.25%]"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800')",
                  }}
                />
                <div className="px-6 py-6">
                  <h3 className="text-3xl font-bold leading-snug">
                    Savaş travması ve kimlik: Kendini kaybetmeden geri dönmek
                    mümkün mü?
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-gray-600">
                    Savaştan dönen bireylerin kimlik yeniden inşası üzerine
                    klinik bir inceleme. TSSB&apos;nin ötesinde, varoluşsal
                    kırılma ve anlam arayışını ele alıyoruz.
                  </p>
                  <p className="mt-2 font-sans text-xs italic uppercase tracking-wide">
                    by PROF. DR. AHMET RIFAT KAYİŞ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Podcast discovery section */}
        <section className="w-full bg-[#f5f0eb] py-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
            {/* Header */}
            <div className="max-w-4xl">
              <h2 className="leading-none">
                <span className="block text-6xl md:text-8xl">
                  Keşfet
                </span>
                <span className="mt-2 inline-block text-3xl italic md:text-4xl">
                  bizim{" "}
                </span>
                <span className="inline-block text-3xl font-sans text-sm md:text-4xl font-bold tracking-[0.3em] uppercase align-middle">
                  PODCASTLARIMIZI
                </span>
              </h2>
              <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-gray-600">
                Psikoloji üzerine derinlemesine sohbetler. Araştırmacılar,
                klinisyenler ve düşünürlerle.
              </p>
            </div>

            {/* Horizontally scrollable cards */}
            <div
              className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* Card 1 */}
              <article className="flex w-72 flex-shrink-0 flex-col">
                <div
                  className="relative aspect-square w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400')",
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-black/0" />
                  <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 text-xs font-sans text-white">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black"
                    >
                      <div className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-black" />
                    </button>
                    <span className="rounded-full bg-black/80 px-3 py-1 text-[11px] uppercase tracking-wide">
                      38 dk
                    </span>
                  </div>
                </div>
                <div className="bg-black px-4 py-4 text-white">
                  <h3 className="text-lg font-bold leading-snug">
                    Sosyal medya bizi gerçekten yalnızlaştırıyor mu?
                  </h3>
                  <p className="mt-2 text-sm font-bold">
                    Prof. Dr. Ahmet Rıfat Kayiş
                  </p>
                  <p className="mt-1 font-sans text-sm italic text-gray-400">
                    Klinik psikolog ve araştırmacı
                  </p>
                </div>
              </article>

              {/* Card 2 */}
              <article className="flex w-72 flex-shrink-0 flex-col">
                <div
                  className="relative aspect-square w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400')",
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-black/0" />
                  <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 text-xs font-sans text-white">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black"
                    >
                      <div className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-black" />
                    </button>
                    <span className="rounded-full bg-black/80 px-3 py-1 text-[11px] uppercase tracking-wide">
                      24 dk
                    </span>
                  </div>
                </div>
                <div className="bg-black px-4 py-4 text-white">
                  <h3 className="text-lg font-bold leading-snug">
                    Mükemmeliyetçilik bir erdem mi, tuzak mı?
                  </h3>
                  <p className="mt-2 text-sm font-bold">Elif Nur Yıldız</p>
                  <p className="mt-1 font-sans text-sm italic text-gray-400">
                    Psikoterapist
                  </p>
                </div>
              </article>

              {/* Card 3 */}
              <article className="flex w-72 flex-shrink-0 flex-col">
                <div
                  className="relative aspect-square w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400')",
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-black/0" />
                  <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 text-xs font-sans text-white">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black"
                    >
                      <div className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-black" />
                    </button>
                    <span className="rounded-full bg-black/80 px-3 py-1 text-[11px] uppercase tracking-wide">
                      51 dk
                    </span>
                  </div>
                </div>
                <div className="bg-black px-4 py-4 text-white">
                  <h3 className="text-lg font-bold leading-snug">
                    Travma sonrası büyüme mümkün mü?
                  </h3>
                  <p className="mt-2 text-sm font-bold">
                    Dr. Mehmet Ali Karaca
                  </p>
                  <p className="mt-1 font-sans text-sm italic text-gray-400">
                    Klinik psikolog
                  </p>
                </div>
              </article>

              {/* Card 4 */}
              <article className="flex w-72 flex-shrink-0 flex-col">
                <div
                  className="relative aspect-square w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400')",
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-black/0" />
                  <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 text-xs font-sans text-white">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black"
                    >
                      <div className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-black" />
                    </button>
                    <span className="rounded-full bg-black/80 px-3 py-1 text-[11px] uppercase tracking-wide">
                      33 dk
                    </span>
                  </div>
                </div>
                <div className="bg-black px-4 py-4 text-white">
                  <h3 className="text-lg font-bold leading-snug">
                    Bağlanma stilleri ve ilişki örüntüleri
                  </h3>
                  <p className="mt-2 text-sm font-bold">Duygu Korkmaz</p>
                  <p className="mt-1 font-sans text-sm italic text-gray-400">
                    Aile ve çift terapisti
                  </p>
                </div>
              </article>

              {/* Card 5 */}
              <article className="flex w-72 flex-shrink-0 flex-col">
                <div
                  className="relative aspect-square w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400')",
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-black/0" />
                  <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 text-xs font-sans text-white">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black"
                    >
                      <div className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-black" />
                    </button>
                    <span className="rounded-full bg-black/80 px-3 py-1 text-[11px] uppercase tracking-wide">
                      29 dk
                    </span>
                  </div>
                </div>
                <div className="bg-black px-4 py-4 text-white">
                  <h3 className="text-lg font-bold leading-snug">
                    Bilinçdışı önyargılar: Kendimizi ne kadar tanıyoruz?
                  </h3>
                  <p className="mt-2 text-sm font-bold">Selin Aksoy</p>
                  <p className="mt-1 font-sans text-sm italic text-gray-400">
                    Sosyal psikolog
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
