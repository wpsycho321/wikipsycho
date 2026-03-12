// Merkezi veri kaynağı — proje raporları

export type Hazirlayan = {
  isim: string;
  rol: string;
};

export type Rapor = {
  id: string;
  slug: string;
  baslik: string;
  altBaslik: string;
  yil: string;
  tarih: string;
  ozet: string;
  hedef: string;
  bulgular: string[];
  kapakGorseli: string;
  pdfUrl: string;
  sayfaSayisi: number;
  hazirlayanlar: Hazirlayan[];
  danisman: string;
  yayin: string;
  // Projeler sayfası bağlandığında bu link aktif olacak
  ilgiliProjeSlug?: string;
};

export const raporlar: Rapor[] = [
  {
    id: "duygu-gunlugu",
    slug: "duygu-gunlugu-proje-raporu",
    baslik: "Duygu Günlüğü Projesi",
    altBaslik: "Uygulama, Gözlem, Süreç Değerlendirme",
    yil: "2025",
    tarih: "Şubat 2025",
    ozet:
      "Bu rapor, duygu günlüğü uygulamasının bireylerin duygusal farkındalıklarını nasıl etkilediğini incelemek amacıyla hazırlanmış bir süreç raporudur. WikiPsycho tarafından yürütülen bu proje kapsamında katılımcıların duygu yönetimi becerilerindeki değişimler gözlemlenmiştir.",
    hedef:
      "Bireylerin duygu günlüğü tutma pratiği aracılığıyla duygusal farkındalıklarını artırmak, duygularını tanımlama ve yönetme becerilerini geliştirmek.",
    bulgular: [
      "Zorlayıcı duyguları daha iyi hale dönüştürebilme becerisinde +0.95 artış gözlemlendi",
      "O an hissedilen duyguları tarif etmekte zorlanmama becerisinde +0.46 artış sağlandı",
      "Duyguları somutlaştırma ve açıklayabilme becerisinde +0.42 artış kaydedildi",
      "Katılımcılar hisler ile duygular arasındaki farkı daha bilinçli ayırt edebildi",
      "Duygu günlüğü tutma pratiğinin duygusal farkındalık üzerinde olumlu etkisi doğrulandı",
    ],
    kapakGorseli:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600",
    pdfUrl: "/raporlar/duygu-gunlugu-rapor.pdf",
    sayfaSayisi: 12,
    hazirlayanlar: [
      { isim: "İkbal Dağdelen", rol: "Proje Koordinatörü" },
      { isim: "Zehra İyi", rol: "Araştırmacı" },
      { isim: "Hilal Urhan", rol: "Araştırmacı" },
      { isim: "Hilal Karaer", rol: "Araştırmacı" },
    ],
    danisman: "Uzm. Kl. Psk. Sanem Akkurt",
    yayin: "WikiPsycho Psikoloji Araştırmaları ve Gelişim Topluluğu",
    ilgiliProjeSlug: "duygu-gunlugu",
  },
  // Diğer raporlar aynı yapıda eklenecek
];
