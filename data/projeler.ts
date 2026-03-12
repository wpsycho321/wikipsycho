export type ProjeOrtak = {
  isim: string;
  logo?: string;
};

export type ProjeIstatistik = {
  etiket: string;
  deger: string;
};

export type Proje = {
  id: string;
  slug: string;
  baslik: string;
  altBaslik: string;
  aciklama: string;
  detay: string[];
  durum: "Tamamlandı" | "Devam Ediyor" | "Planlama";
  yil: string;
  kategori: string;
  gorsel: string;
  galeri?: string[];
  ortaklar?: ProjeOrtak[];
  istatistikler?: ProjeIstatistik[];
  raporSlug?: string;
  kitapcikUrl?: string;
  fon?: string;
};

export const projeler: Proje[] = [
  {
    id: "duygu-gunlugu",
    slug: "duygu-gunlugu",
    baslik: "Duygu Günlüğü Projesi",
    altBaslik: "Duygusal Farkındalık Üzerine Saha Çalışması",
    aciklama:
      "20 katılımcı ile yürütülen bu proje, duygu günlüğü tutmanın duygusal farkındalık ve psikolojik iyi oluş üzerindeki etkilerini araştırdı.",
    detay: [
      "Proje kapsamında katılımcılar 8 hafta boyunca yapılandırılmış duygu günlüğü tuttular.",
      "Haftalık grup görüşmeleri ve bireysel değerlendirmeler gerçekleştirildi.",
      "Süreç sonunda kapsamlı bir proje raporu yayımlandı.",
      "Elde edilen bulgular WikiPsycho'nun e-yayın serisine katkı sağladı.",
    ],
    durum: "Tamamlandı",
    yil: "2025",
    kategori: "Araştırma",
    gorsel:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800",
    galeri: [
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800",
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800",
    ],
    istatistikler: [
      { etiket: "Katılımcı", deger: "20" },
      { etiket: "Süre", deger: "8 Hafta" },
      { etiket: "Grup Görüşmesi", deger: "8" },
      { etiket: "Yayın", deger: "1 Rapor" },
    ],
    raporSlug: "duygu-gunlugu-proje-raporu",
  },
  {
    id: "aid-calistay",
    slug: "aid-calistay",
    baslik: "AİD Çalıştayı",
    altBaslik: "Akademik İşbirliği ve Gelişim",
    aciklama:
      "Akademik İşbirliği ve Gelişim çerçevesinde düzenlenen çalıştay, psikoloji öğrencilerini araştırma pratikleriyle buluşturdu.",
    detay: [
      "Çalıştay boyunca katılımcılar atölye çalışmaları ve panel oturumlarına katıldı.",
      "Farklı üniversitelerden psikoloji öğrencileri bir araya geldi.",
      "Akademik yazım, araştırma metodolojisi ve topluma katkı konuları ele alındı.",
      "Etkinlik sonunda katılımcılara sertifika verildi.",
    ],
    durum: "Tamamlandı",
    yil: "2024",
    kategori: "Etkinlik",
    gorsel:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    galeri: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
    ],
    istatistikler: [
      { etiket: "Katılımcı", deger: "45+" },
      { etiket: "Atölye", deger: "6" },
      { etiket: "Konuşmacı", deger: "8" },
      { etiket: "Üniversite", deger: "4" },
    ],
  },
  {
    id: "neet-gencler",
    slug: "neet-gencler",
    baslik: "Ev Gençleri Projesi",
    altBaslik: "NEET Gençlere Yönelik Yıllık Araştırma",
    aciklama:
      "Eğitim, istihdam ve mesleki eğitimin dışında kalan gençleri kapsayan bu yıllık çalışma, Aile Vakfı ortaklığıyla yürütülmektedir.",
    detay: [
      "Türkiye'deki NEET gençlerin psikolojik profili ve ihtiyaç analizi yapılmaktadır.",
      "Akademik araştırma, saha çalışması ve seminerlerden oluşan üç aşamalı bir program.",
      "Yıl sonunda kapsamlı bir rapor ve kamuya açık bir çalıştay planlanmaktadır.",
      "Proje bulguları politika yapıcılara sunulacaktır.",
    ],
    durum: "Devam Ediyor",
    yil: "2025",
    kategori: "Araştırma",
    gorsel:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    galeri: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    ],
    ortaklar: [
      {
        isim: "Aile Vakfı",
        logo: "",
      },
    ],
    istatistikler: [
      { etiket: "Süre", deger: "1 Yıl" },
      { etiket: "Aşama", deger: "3" },
      { etiket: "Ortak", deger: "Aile Vakfı" },
      { etiket: "Hedef Kitle", deger: "NEET Gençler" },
    ],
  },
];

