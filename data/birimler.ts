// Merkezi veri kaynağı — buradan değiştirince tüm sayfalarda güncellenir

export type BirimUye = {
  isim: string;
  rol: string;
  foto: string;
  slug: string;
};

export type GecmisCalisma = {
  baslik: string;
  tarih: string;
  aciklama: string;
  link?: string;
};

export type SonYayin = {
  baslik: string;
  tarih: string;
  gorsel: string;
};

export type Birim = {
  id: string;
  slug: string;
  numara: string;
  ad: string;
  slogan: string;
  kisaAciklama: string;
  detayliAciklama: string[];
  calismaAlanlari: string[];
  kimleriBekleriz: string[];
  gecmisCalismalar: GecmisCalisma[];
  sonYayinlar: SonYayin[];
  gorsel: string;
  lider: BirimUye;
  gorselGalerisi?: string[];
};

export const birimler: Birim[] = [
  {
    id: "akademi",
    slug: "akademi-birimi",
    numara: "01",
    ad: "Akademi Birimi",
    slogan: "Araştır, Analiz Et, Yayımla",
    kisaAciklama:
      "Akademi Birimi, psikoloji alanındaki güncel araştırmaları takip eder, akademik içerikler üretir ve üniversite öğrencilerine araştırma becerileri kazandırır.",
    detayliAciklama: [
      "Akademi Birimi, WikiPsycho'nun bilimsel üretim merkezidir. Güncel psikoloji araştırmalarını takip eder, literatür taramaları yapar ve özgün saha çalışmaları yürütür.",
      "Her dönem belirli bir tema etrafında araştırma masaları kurar. Bu masalarda öğrenciler yıl boyunca sistematik bir akademik çalışma deneyimi yaşar ve bulgularını raporlar halinde yayımlar.",
    ],
    calismaAlanlari: [
      "Akademik Araştırma",
      "Saha Çalışması",
      "Rapor Yazımı",
      "Literatür Taraması",
      "Veri Analizi",
    ],
    kimleriBekleriz: [
      "Psikoloji veya ilgili alanda lisans/lisansüstü öğrencisi olanlar",
      "Akademik okuma ve yazma konusunda istekli olanlar",
      "Araştırma metodolojisine ilgi duyanlar",
      "Düzenli toplantılara katılabilecek olanlar",
      "Uzun soluklu projelerde sabırla çalışabilecek olanlar",
    ],
    gecmisCalismalar: [
      {
        baslik: "Dijital Bağımlılık Saha Araştırması",
        tarih: "Mart 2025",
        aciklama: "Lise öğrencileriyle yürütülen 3 aylık alan çalışması.",
        link: "/projeler/dijital-bagimlilik",
      },
      {
        baslik: "Bağlanma Stilleri ve Akademik Başarı",
        tarih: "Kasım 2024",
        aciklama: "200 üniversite öğrencisiyle anket tabanlı araştırma.",
      },
      {
        baslik: "Psikoloji Eğitiminde Yöntem Sorunları",
        tarih: "Haziran 2024",
        aciklama: "Türkiye'deki psikoloji bölümlerinin müfredat analizi.",
      },
    ],
    sonYayinlar: [
      {
        baslik: "Dijital Bağımlılık Saha Araştırması Yayınlandı",
        tarih: "Mart 2025",
        gorsel:
          "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=200",
      },
      {
        baslik: "Bağlanma Stilleri Raporu",
        tarih: "Kasım 2024",
        gorsel:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      },
    ],
    gorsel:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
    lider: {
      isim: "Burak Aydın",
      rol: "Akademi Birimi Lideri",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      slug: "burak-aydin",
    },
    gorselGalerisi: [
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
    ],
  },
  {
    id: "egitim",
    slug: "egitim-gelisim-birimi",
    numara: "02",
    ad: "Eğitim & Gelişim Birimi",
    slogan: "Öğren, Geliştir, Paylaş",
    kisaAciklama:
      "Eğitim & Gelişim Birimi, WikiPsycho gönüllülerinin kişisel ve mesleki gelişimini destekler. Oryantasyon programları, atölye çalışmaları ve mentörlük sistemleri aracılığıyla topluluk içi öğrenme kültürünü canlı tutar.",
    detayliAciklama: [
      "Gönüllülerin kişisel ve mesleki gelişimini destekler.",
      "Oryantasyon, atölye ve mentörlük ile öğrenme kültürünü canlı tutar.",
    ],
    calismaAlanlari: [
      "Atölye Tasarımı",
      "Mentörlük",
      "Oryantasyon",
      "Kişisel Gelişim",
      "Eğitim Programları",
    ],
    kimleriBekleriz: [],
    gecmisCalismalar: [],
    sonYayinlar: [],
    gorsel:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
    lider: {
      isim: "Deniz Şahin",
      rol: "Eğitim & Gelişim Birimi Lideri",
      foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      slug: "deniz-sahin",
    },
  },
  {
    id: "proje",
    slug: "proje-uygulama-birimi",
    numara: "03",
    ad: "Proje & Uygulama Birimi",
    slogan: "Planla, Uygula, Dönüştür",
    kisaAciklama:
      "Proje & Uygulama Birimi, WikiPsycho'nun kurumlarla yürüttüğü ortak projeleri koordine eder. Okul programları, belediye iş birlikleri ve sivil toplum projeleri bu birimin sorumluluğundadır.",
    detayliAciklama: [],
    calismaAlanlari: [
      "Proje Yönetimi",
      "Kurum İşbirlikleri",
      "Saha Uygulamaları",
      "Etkinlik Organizasyonu",
    ],
    kimleriBekleriz: [],
    gecmisCalismalar: [],
    sonYayinlar: [],
    gorsel:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    lider: {
      isim: "Yusuf Kara",
      rol: "Proje & Uygulama Birimi Lideri",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      slug: "yusuf-kara",
    },
  },
  {
    id: "icerik",
    slug: "icerik-birimi",
    numara: "04",
    ad: "İçerik Birimi",
    slogan: "Üret, Paylaş, Etkile",
    kisaAciklama:
      "İçerik Birimi, WikiPsycho'nun sosyal medya ve dijital platformlardaki sesini oluşturur. Psikoloji araştırmalarını erişilebilir formatlara dönüştürür.",
    detayliAciklama: [],
    calismaAlanlari: [
      "Sosyal Medya",
      "İnfografik",
      "İçerik Stratejisi",
      "Metin Yazarlığı",
      "Dijital İletişim",
    ],
    kimleriBekleriz: [],
    gecmisCalismalar: [],
    sonYayinlar: [],
    gorsel:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    lider: {
      isim: "Ceren Yıldız",
      rol: "İçerik Birimi Lideri",
      foto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200",
      slug: "ceren-yildiz",
    },
  },
  {
    id: "yayin",
    slug: "yayin-birimi",
    numara: "05",
    ad: "Yayın Birimi",
    slogan: "Yaz, Düzenle, Yayımla",
    kisaAciklama:
      "Yayın Birimi, WikiPsycho'nun akademik ve popüler yayınlarını hazırlar. E-raporlar, kitap özetleri ve dönemsel bültenler bu birimin çıktılarıdır.",
    detayliAciklama: [],
    calismaAlanlari: [
      "E-Yayın",
      "Rapor Hazırlama",
      "Editöryel Süreç",
      "Bülten",
      "Akademik Yazım",
    ],
    kimleriBekleriz: [],
    gecmisCalismalar: [],
    sonYayinlar: [],
    gorsel:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800",
    lider: {
      isim: "Leyla Güneş",
      rol: "Yayın Birimi Lideri",
      foto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200",
      slug: "leyla-gunes",
    },
  },
  {
    id: "produksiyon",
    slug: "produksiyon-birimi",
    numara: "06",
    ad: "Prodüksiyon Birimi",
    slogan: "Görüntüle, Kaydet, Yayınla",
    kisaAciklama:
      "Prodüksiyon Birimi, WikiPsycho'nun video ve ses içeriklerini üretir. Podcast serileri, YouTube videoları ve etkinlik kayıtları bu birimin sorumluluk alanındadır.",
    detayliAciklama: [],
    calismaAlanlari: [
      "Video Prodüksiyon",
      "Podcast",
      "Ses Tasarımı",
      "Kurgulama",
      "YouTube",
    ],
    kimleriBekleriz: [],
    gecmisCalismalar: [],
    sonYayinlar: [],
    gorsel:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800",
    lider: {
      isim: "Eda Kılıç",
      rol: "Prodüksiyon Birimi Lideri",
      foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
      slug: "eda-kilic",
    },
  },
];
