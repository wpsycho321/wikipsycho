"use client";

import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const SECTIONS: {
  number: string;
  title: string;
  body: string[];
  bullets: string[] | null;
  closing: string | null;
  closingQuote?: string;
  image?: string;
}[] = [
  {
    number: "01",
    title: "Bir soru ile başladı",
    image: "/images/biz-kimiz-01.png",
    body: [
      "Psikoloji öğrencileri çok şey öğreniyor. Ama gerçekten üretiyorlar mı?",
      "Üniversitelerde çoğu topluluk etkinlik düzenler. Konferanslar yapılır, konuşmalar dinlenir ve herkes evine döner.",
      "Ama biz farklı bir şey düşündük.",
      "Psikoloji öğrencileri sadece dinleyen değil, üreten bir topluluk olabilir miydi?",
      "Bu sorunun cevabını aramak için üç kişi bir masanın etrafında toplandık.",
    ],
    bullets: null,
    closing: null,
  },
  {
    number: "02",
    title: "Küçük bir ekip",
    image: "/images/biz-kimiz-02.png",
    body: [
      "Başlangıçta yalnızca birkaç kişiydik.",
      "Bir markamız yoktu. Bir sistemimiz yoktu. Ama ortak bir fikrimiz vardı.",
      "Okumalar yaptık. Uzun tartışmalar yaptık. Psikoloji üzerine düşünmeye ve yazmaya başladık.",
      "Ekip yavaş yavaş büyüdü.",
    ],
    bullets: null,
    closing: null,
  },
  {
    number: "03",
    title: "İlk topluluk",
    body: [
      "Bir noktadan sonra küçük bir arkadaş grubundan daha fazlası haline geldik.",
      "Yeni insanlar katıldı. Fikirler çoğaldı. Topluluk büyümeye başladı.",
      "Henüz büyük projeler yoktu. Ama bir şey oluşuyordu: psikoloji üzerine düşünen ve tartışan bir çevre.",
      "WikiPsycho bu noktada şekillenmeye başladı.",
    ],
    bullets: null,
    closing: null,
  },
  {
    number: "04",
    title: "Deneme ve gelişme dönemi",
    body: [
      "Bu dönem bizim öğrenme ve deneme aşamamızdı. Farklı üretim biçimleri denedik.",
    ],
    bullets: [
      "Kitap özetleri hazırlandı",
      "Ders notları derlendi",
      "Akademik içerikler yayımlandı",
      "Düzenli makale okuma oturumları yapıldı",
      "Tartışmalar yazıya döküldü",
    ],
    closing:
      "Topluluk artık yalnızca konuşan değil, yazmaya ve üretmeye başlayan bir yapıya dönüştü.",
  },
  {
    number: "05",
    title: "Genişleme",
    body: [
      "Bu aşamada işler ciddi şekilde büyüdü. Üniversitelerde araştırma masaları kuruldu.",
    ],
    bullets: [
      "Akademik e-raporlar yayımlandı",
      "Büyük projeler geliştirildi",
      "İlk kez bir kurumla ortak çalıştay düzenlendi",
      "Eğitimler ve etkinlikler organize edildi",
      "YouTube üzerinden medya üretimleri başladı",
    ],
    closing:
      "Topluluk artık yalnızca bir öğrenci grubu değildi. Bir üretim ağı oluşmaya başlamıştı.",
  },
  {
    number: "06",
    title: "Kurumsallaşma",
    body: ["Bugün geldiğimiz noktada hedefimiz daha büyük."],
    bullets: [
      "Kurumlarla uzun vadeli iş birlikleri geliştiriyoruz",
      "Projelerimizi fon temelli kuruyoruz",
      "Akademik içerikler üretiyoruz",
      "Psikoloji öğrencilerine kaynak sağlıyoruz",
      "Medya üretimini profesyonelleştiriyoruz",
      "Düzenli yayınlar çıkarmayı hedefliyoruz",
    ],
    closing: null,
    closingQuote:
      "Amacımız yalnızca bir topluluk olmak değil. Psikoloji öğrencilerinin okuduğu, tartıştığı ve ürettiği bir ekosistem kurmak.",
  },
];

function SectionContent({
  number,
  title,
  body,
  bullets,
  closing,
  closingQuote,
}: {
  number: string;
  title: string;
  body: string[];
  bullets: string[] | null;
  closing: string | null;
  closingQuote?: string;
}) {
  return (
    <div className="flex flex-col px-16 py-20">
      <p className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400">
        {number} —
      </p>
      <h2 className="mt-4 text-4xl font-normal leading-tight">{title}</h2>
      <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-gray-700">
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {bullets && (
          <ul className="list-none space-y-1">
            {bullets.map((item, i) => (
              <li key={i}>— {item}</li>
            ))}
          </ul>
        )}
        {closing && <p>{closing}</p>}
        {closingQuote !== undefined && closingQuote && (
          <p className="mt-8 text-2xl italic leading-relaxed">
            {closingQuote}
          </p>
        )}
      </div>
    </div>
  );
}

function IllustrationBlock({
  number,
  image,
}: {
  number: string;
  image?: string;
}) {
  if (image) {
    return (
      <div className="flex h-full w-full min-h-[50vh] items-center justify-center bg-gray-100 p-8 md:min-h-screen">
        <div className="relative aspect-square w-full max-w-md">
          <Image
            src={image}
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full min-h-[50vh] items-center justify-center md:min-h-screen">
      <div className="text-center">
        <span className="block font-serif text-9xl font-extralight text-gray-300">
          {number}
        </span>
        <span className="mt-2 block font-sans text-xs text-gray-400">
          İllüstrasyon eklenecek
        </span>
      </div>
    </div>
  );
}

export default function BizKimizPage() {
  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* Page header */}
      <header className="w-full px-12 py-20">
        <h1 className="leading-tight">
          <span className="block text-6xl font-normal md:text-7xl">
            WikiPsycho&apos;nun
          </span>
          <span className="block text-6xl font-normal md:text-7xl">
            Hikâyesi
          </span>
        </h1>
        <div className="mt-6 h-px w-full bg-black" />
      </header>

      {/* 6 alternating sections */}
      {SECTIONS.map((section, index) => {
        const isOdd = index % 2 === 0;
        return (
          <section
            key={section.number}
            className="grid min-h-screen grid-cols-1 md:grid-cols-2"
          >
            {isOdd ? (
              <>
                <div className="flex min-h-[50vh] items-center bg-gray-100 md:min-h-screen">
                  <IllustrationBlock number={section.number} image={section.image} />
                </div>
                <div className="flex min-h-[50vh] items-center justify-center bg-white md:min-h-screen">
                  <SectionContent
                    number={section.number}
                    title={section.title}
                    body={section.body}
                    bullets={section.bullets}
                    closing={section.closing}
                    closingQuote={
                      "closingQuote" in section
                        ? (section as { closingQuote?: string }).closingQuote
                        : undefined
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex min-h-[50vh] items-center justify-center bg-white md:min-h-screen">
                  <SectionContent
                    number={section.number}
                    title={section.title}
                    body={section.body}
                    bullets={section.bullets}
                    closing={section.closing}
                  />
                </div>
                <div className="flex min-h-[50vh] items-center bg-gray-100 md:min-h-screen">
                  <IllustrationBlock number={section.number} image={section.image} />
                </div>
              </>
            )}
          </section>
        );
      })}

      {/* Vision & Mission block */}
      <section className="flex w-full flex-col gap-12 bg-black px-16 py-24 text-white md:flex-row md:gap-16">
        <div className="flex-1">
          <h2 className="text-5xl font-normal">Vizyonumuz</h2>
          <p className="mt-4 font-serif text-xl leading-relaxed text-white/90">
            Psikolojiyi Türkiye&apos;de erişilebilir, üretilebilir ve
            paylaşılabilir kılmak.
          </p>
        </div>
        <div className="flex-1">
          <h2 className="text-5xl font-normal">Misyonumuz</h2>
          <p className="mt-4 font-serif text-xl leading-relaxed text-white/90">
            Psikoloji öğrencilerini ve meraklılarını bir araya getiren, akademik
            bilgiyi topluma taşıyan bağımsız bir içerik ve topluluk platformu
            olmak.
          </p>
        </div>
      </section>
    </div>
  );
}
