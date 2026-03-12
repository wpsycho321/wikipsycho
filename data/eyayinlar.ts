export type EYayinHazirlayan = {
  isim: string;
  rol: string;
};

export type EYayin = {
  id: string;
  slug: string;
  seriNo?: string;
  tur?: string;
  baslik: string;
  altBaslik: string;
  yil: string;
  tarih: string;
  kategori: string;
  ozet: string;
  hedef: string;
  bulgular: string[];
  kapakGorseli: string;
  pdfUrl: string;
  sayfaSayisi: number;
  hazirlayanlar: EYayinHazirlayan[];
  editor?: string;
  danismanlar?: string[];
  yayin: string;
  ilgiliProjeSlug?: string;
};

export const eyayinlar: EYayin[] = [
  {
    id: "duygu-gunlugu-rehberi",
    slug: "duygu-gunlugu-rehberi",
    seriNo: "E-Rapor 1",
    tur: "Rehber",
    baslik: "Duygu Günlüğü Rehberi",
    altBaslik: "Duygularını Tanı, Yaz, Dönüştür",
    yil: "2025",
    tarih: "Mart 2025",
    kategori: "Rehber",
    ozet:
      "Bu rehber, duygu günlüğü tutmak isteyen bireyler için adım adım bir kılavuz niteliği taşımaktadır. WikiPsycho'nun Duygu Günlüğü Projesi'nden elde edilen bulgular ve deneyimler temel alınarak hazırlanmıştır.",
    hedef:
      "Okuyucuların duygu günlüğü tutma pratiğini günlük hayatlarına entegre etmelerini kolaylaştırmak ve duygusal farkındalıklarını artırmak.",
    bulgular: [
      "Duygu günlüğü tutmanın duygusal farkındalığı artırdığı bilimsel olarak kanıtlanmıştır",
      "Düzenli yazma pratiği stres ve kaygı yönetimine katkı sağlar",
      "Bilişsel ve duygusal ifadeyi birleştiren yazma en etkili yöntemdir",
      "Günlük yazma alışkanlığı kişisel gelişimi destekler",
    ],
    kapakGorseli:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600",
    pdfUrl: "/eyayinlar/duygu-gunlugu-rehberi.pdf",
    sayfaSayisi: 24,
    hazirlayanlar: [
      { isim: "İkbal Dağdelen", rol: "Yazar" },
      { isim: "Muhammed İkbal Çete", rol: "Editör" },
    ],
    yayin: "WikiPsycho Psikoloji Araştırmaları ve Gelişim Topluluğu",
    ilgiliProjeSlug: "duygu-gunlugu",
  },
  {
    id: "deprem-tssb-terapi",
    slug: "deprem-sonrasi-tssb-ve-terapi-yontemleri",
    seriNo: "E-Rapor 3",
    tur: "Derleme, İnceleme",
    baslik: "Deprem Sonrası TSSB ve Terapi Yöntemleri",
    altBaslik:
      "Afet Psikolojisi, Müdahale Modelleri ve WHO Yaklaşımları",
    yil: "2025",
    tarih: "Mayıs 2025",
    kategori: "Derleme",
    ozet:
      "Depremler sonrası ortaya çıkan psikolojik etkiler ve bu etkilerle baş etmede kullanılan terapi yöntemlerini ele alan kapsamlı bir derleme raporu. TSSB başta olmak üzere afetlerin bireysel ve toplumsal düzeyde yarattığı psikolojik sonuçlar incelenmekte; kısa ve uzun vadeli müdahale modelleri değerlendirilmektedir.",
    hedef:
      "Afet psikolojisi alanında bilimsel bilgi üretmek ve afet sonrası ruh sağlığı hizmetlerine ilişkin farkındalık kazandırmak. Ruh sağlığı uzmanları, öğrenciler ve afet psikolojisine ilgi duyan okuyucular için temel bir başvuru kaynağı oluşturmak.",
    bulgular: [
      "Deprem bölgelerinde TSSB görülme oranı %20–40 arasında değişmektedir",
      "1999 Marmara Depremi sonrası depremzedelerin %45'i psikolojik şikayet bildirmiştir",
      "EMDR ve BDT, WHO tarafından önerilen birincil terapi yöntemleridir",
      "Psikolojik ilk yardım, TSSB geliştirme riskini anlamlı ölçüde azaltmaktadır",
      "Kadınlar, çocuklar ve düşük gelirli bireyler travmadan orantısız biçimde etkilenmektedir",
      "Türkiye'de 100.000 kişiye düşen psikolog sayısı DSÖ Avrupa ortalamasının gerisindedir",
    ],
    kapakGorseli:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600",
    pdfUrl: "/eyayinlar/deprem-tssb-terapi.pdf",
    sayfaSayisi: 29,
    hazirlayanlar: [
      { isim: "Muhammed İkbal Çete", rol: "Yazar" },
      { isim: "Mehmet Kerem Okutan", rol: "Editör & Yazar" },
      { isim: "Zeynep Berra Şen", rol: "Yazar" },
      { isim: "Yusuf Ayyıldız", rol: "Yazar" },
      { isim: "Zeynep Sude Abuş", rol: "Yazar" },
    ],
    editor: "Mehmet Kerem Okutan",
    danismanlar: [
      "Uzm. Psk. Servet AŞAN",
      "Öğr. Gör. Sena AKBAY SAFİ",
      "Uzm. Psk. Merve ÇELİK",
    ],
    yayin: "WikiPsycho Psikoloji Araştırmaları ve Gelişim Topluluğu",
  },
];
