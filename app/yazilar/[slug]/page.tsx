"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const SIDEBAR_CATEGORIES = [
  "Zihin & Davranış",
  "Dijital Psikoloji",
  "Kimlik",
  "Gençlik",
];

const RELATED_ARTICLES = [
  {
    category: "Klinik Psikoloji",
    title: "Kaygı mı, üretkenlik yakıtı mı? İnce çizgide dengede kalmak",
    author: "ELİF NUR YILDIZ",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300",
    slug: "kaygi-mi-uretim",
  },
  {
    category: "Sosyal Psikoloji",
    title: "Sosyal medyada ideal benlik inşası ve yalnızlık paradoksu",
    author: "MEHMET ALİ KARACA",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300",
    slug: "sosyal-medya-ideal-benlik",
  },
  {
    category: "Gelişim Psikolojisi",
    title: "Gençlerde kimlik arayışı: Sessiz odalarda süren yüksek sesli savaş",
    author: "DUYGU KORKMAZ",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300",
    slug: "genclikte-kimlik-arayisi",
  },
];

export default function ArticlePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const totalDuration = 1044; // 17:24 in seconds
  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* SECTION 1 — Hero */}
      <section className="flex min-h-screen w-full">
        <div className="flex w-1/2 items-center bg-[#e8e4dc] px-16">
          <div className="max-w-xl space-y-6">
            <p className="text-xs italic uppercase tracking-wide text-gray-600">
              Zihin & Davranış
            </p>
            <h1 className="text-4xl font-normal leading-tight md:text-5xl">
              Dijital kimlik ve gençlik: Görünür olmak ile kendin olmak
            </h1>
            <p className="text-xl italic leading-relaxed text-gray-600">
              Gençlerin dijital ortamda kimlik oluşturma süreçleri; aidiyet
              ihtiyacı, görünürlük baskısı ve içsel tutarlılık arayışı arasında
              inceliyoruz.
            </p>
            <p className="font-sans text-sm text-gray-700">
              by İKBAL ÇETE, klinik psikolog
            </p>
          </div>
        </div>
        <div
          className="h-screen w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1200')",
          }}
        />
      </section>

      {/* SECTION 2 — Article body */}
      <section className="w-full bg-white">
        <div className="flex w-full">
          {/* Left sidebar - 20% */}
          <aside className="sticky top-24 hidden w-1/5 flex-shrink-0 px-8 py-16 lg:block">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              KATEGORİLER
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SIDEBAR_CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-gray-300 px-3 py-1 font-sans text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="mt-6 h-px w-full bg-gray-200" />
            <p className="mt-4 font-sans text-xs text-gray-500">
              Yayınlanma: 10 Mart 2025
            </p>
          </aside>

          {/* Main content - 60% */}
          <div className="w-full flex-1 py-16 lg:w-3/5">
            <div className="mx-auto max-w-2xl px-6">
              {/* Audio player */}
              <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700"
                  >
                    {isPlaying ? (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="mb-2 font-sans text-sm font-medium">
                      Makaleyi Dinle
                    </p>
                    <div className="h-1 w-full rounded bg-gray-200">
                      <div
                        className="h-full rounded bg-black transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between font-sans text-xs text-gray-500">
                      <span>{formatTime(currentTime)}</span>
                      <span>-{formatTime(totalDuration - currentTime)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex-shrink-0 rounded border border-gray-300 px-2 py-1 font-sans text-sm hover:border-gray-400"
                  >
                    {playbackSpeed}x
                  </button>
                </div>
              </div>

              {/* Article content */}
              <article className="font-serif">
                <p className="mb-8 text-lg leading-relaxed text-gray-800">
                  <span className="float-left mr-2 font-serif text-5xl leading-none text-gray-800">
                    G
                  </span>
                  ençlerin dijital ortamda kimlik oluşturma süreçleri, günümüz
                  psikolojisinin en tartışılan konularından biri haline geldi.
                  Sosyal medya platformları, her yaştan kullanıcıya kendini
                  sunma, performans sergileme ve aidiyet hissetme imkânı sunarken,
                  aynı zamanda görünürlük baskısı ve içsel tutarlılık arayışı
                  arasında gerilimli bir alan yaratıyor. Bu yazıda, dijital
                  kimliğin psikolojik boyutlarını ve gençlerin bu süreçte karşı
                  karşıya kaldığı zorlukları ele alıyoruz.
                </p>

                <p className="mb-8 text-lg leading-relaxed text-gray-800">
                  Erikson&apos;un kimlik gelişimi kuramına göre, ergenlik
                  dönemi bireyin &quot;ben kimim?&quot; sorusuna yanıt aradığı
                  kritik bir evredir. Dijital çağda bu arayış, ekranların
                  ardında süren bir performansa dönüşüyor. Her paylaşım, her
                  beğeni, her yorum kimlik inşasının bir parçası haline gelirken,
                  gerçek benlik ile performe edilen benlik arasındaki mesafe
                  bazen kapanıyor, bazen de derinleşiyor.
                </p>

                <blockquote className="mb-8 border-l-4 border-black bg-gray-50 pl-6 pr-6 py-6 font-serif text-2xl italic leading-relaxed text-gray-800">
                  &quot;Görünür olmak bir arzu, kendin olmak ise bir
                  ihtiyaçtır. İkisi arasındaki dengeyi bulmak, dijital çağda
                  büyüyen her kuşağın karşılaştığı ortak bir sınavdır.&quot;
                </blockquote>

                <p className="mb-8 text-lg leading-relaxed text-gray-800">
                  Aidiyet ihtiyacı, insanın temel psikolojik ihtiyaçlarından
                  biridir. Gençler, sosyal medyada bu ihtiyacı karşılamak için
                  gruplara katılıyor, paylaşımlarla onay arıyor, algoritmaların
                  belirlediği &quot;trend&quot;lere uyum sağlıyor. Ancak bu
                  süreçte, gerçek bağlantı ile sanal bağlantı arasındaki fark
                  zaman zaman silikleşebiliyor. Araştırmalar, çok sayıda
                  &quot;takipçi&quot;ye sahip olan bireylerin bile derin
                  yalnızlık hissedebildiğini gösteriyor.
                </p>

                <p className="mb-8 text-lg leading-relaxed text-gray-800">
                  İçsel tutarlılık arayışı ise başka bir boyut. Dijital ortamda
                  farklı platformlarda farklı kişiler olarak var olabilmek,
                  bazen kimlik parçalanmasına, bazen de daha esnek bir
                  benlik algısının gelişimine yol açabiliyor. Bu sürecin sağlıklı
                  ilerlemesi için, gençlerin hem kendilerini keşfetmelerine hem
                  de eleştirel bir bakış geliştirmelerine alan açmak gerekiyor.
                </p>
              </article>
            </div>
          </div>

          {/* Right sidebar - 20% */}
          <aside className="sticky top-24 hidden w-1/5 flex-shrink-0 px-8 py-16 lg:block">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div
                className="mx-auto h-20 w-20 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200')",
                }}
              />
              <p className="mt-4 text-xs uppercase tracking-wide text-gray-500">
                Yazan
              </p>
              <p className="mt-1 text-lg font-bold">İkbal Çete</p>
              <p className="text-sm text-gray-600">
                Klinik Psikolog, WikiPsycho Kurucu
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Psikoloji iletişimi ve toplum sağlığı üzerine çalışan İkbal
                Çete, WikiPsycho&apos;nun kurucusudur.
              </p>
              <div className="mt-3 flex gap-3">
                <a
                  href="#"
                  className="text-gray-400 transition hover:text-black"
                  aria-label="X"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition hover:text-black"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition hover:text-black"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
              <Link
                href="/yazarlar/ikbal-cete"
                className="mt-4 block text-sm underline hover:no-underline"
              >
                Tüm yazılarını gör →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* SECTION 3 — Related articles */}
      <section className="w-full bg-gray-50 px-12 py-16">
        <h2 className="text-2xl font-normal">İlgili Yazılar</h2>
        <div className="mt-4 h-px w-full bg-black/10" />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {RELATED_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/yazilar/${article.slug}`}
              className="group block"
            >
              <div
                className="aspect-square w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${article.image}')` }}
              />
              <p className="mt-3 text-sm italic text-gray-500">
                {article.category}
              </p>
              <h3 className="mt-2 text-lg font-bold leading-snug transition group-hover:text-gray-500">
                {article.title}
              </h3>
              <p className="mt-2 font-sans text-xs uppercase tracking-wide text-gray-600">
                by {article.author}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
