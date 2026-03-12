export type Video = {
  id: string;
  baslik: string;
  altBaslik?: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  tarih: string;
  sure: string;
  kategori: string;
  aciklama: string;
  yazar?: string;
};

export type Podcast = {
  id: string;
  baslik: string;
  altBaslik?: string;
  spotifyUrl: string;
  gorselUrl: string;
  tarih: string;
  sure: string;
  kategori: string;
  aciklama: string;
  konuk?: string;
};

export const videolar: Video[] = [
  {
    id: "video-1",
    baslik: "Psikolojiye Giriş",
    altBaslik: "Temel Kavramlar ve Yaklaşımlar",
    youtubeUrl: "https://www.youtube.com/watch?v=YOUTUBE_ID",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800",
    tarih: "Ocak 2025",
    sure: "18 dk",
    kategori: "Eğitim",
    aciklama:
      "Psikolojinin temel kavramlarını ve farklı yaklaşımlarını ele aldığımız bu videoda bilişsel, davranışçı ve psikanalitik perspektler inceleniyor.",
    yazar: "İkbal Dağdelen",
  },
  {
    id: "video-2",
    baslik: "Stres Yönetimi",
    altBaslik: "Bilimsel Yöntemler ve Pratik Teknikler",
    youtubeUrl: "https://www.youtube.com/watch?v=YOUTUBE_ID",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800",
    tarih: "Şubat 2025",
    sure: "24 dk",
    kategori: "Eğitim",
    aciklama:
      "Günlük hayatta stresle başa çıkmak için kullanabileceğiniz, araştırmalarca desteklenmiş teknikler.",
    yazar: "Mehmet Kerem Okutan",
  },
  {
    id: "video-3",
    baslik: "Travma ve İyileşme",
    altBaslik: "Psikolojik Dayanıklılık Üzerine",
    youtubeUrl: "https://www.youtube.com/watch?v=YOUTUBE_ID",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    tarih: "Mart 2025",
    sure: "31 dk",
    kategori: "Araştırma",
    aciklama:
      "Travma sonrası büyüme ve psikolojik dayanıklılık kavramlarını güncel araştırmalar çerçevesinde ele alan kapsamlı bir video.",
    yazar: "İkbal Dağdelen",
  },
];

export const podcastlar: Podcast[] = [
  {
    id: "podcast-1",
    baslik: "Bağlanma Stilleri",
    altBaslik: "İlişkilerde Psikoloji",
    spotifyUrl: "https://open.spotify.com/episode/EPISODE_ID",
    gorselUrl:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800",
    tarih: "Ocak 2025",
    sure: "42 dk",
    kategori: "İlişkiler",
    aciklama:
      "Bowlby'nin bağlanma kuramından günümüz ilişkilerine uzanan bir sohbet.",
    konuk: "Uzm. Psk. Sanem Akkurt",
  },
  {
    id: "podcast-2",
    baslik: "Dijital Çağda Dikkat",
    altBaslik: "Teknoloji ve Zihin",
    spotifyUrl: "https://open.spotify.com/episode/EPISODE_ID",
    gorselUrl:
      "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800",
    tarih: "Şubat 2025",
    sure: "38 dk",
    kategori: "Nörobilim",
    aciklama:
      "Sosyal medya, dikkat ekonomisi ve beynimiz üzerindeki etkileri üzerine bir sohbet.",
    konuk: "Zeynep Berra Şen",
  },
];
