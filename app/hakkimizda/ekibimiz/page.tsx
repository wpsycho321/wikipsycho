"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const TEAM_PHOTOS_S1 = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
];

const TEAM_PHOTOS_S2 = [
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
];

const TEAM_PHOTOS_S3_8 = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200",
];

function slugify(name: string) {
  const tr: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
    Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u",
  };
  return name
    .toLowerCase()
    .split("")
    .map((c) => tr[c] ?? c)
    .join("")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function MemberCard({
  name,
  role,
  image,
  isLeader,
}: {
  name: string;
  role: string;
  image: string;
  isLeader: boolean;
}) {
  const slug = slugify(name);
  return (
    <Link
      href={`/ekip/${slug}`}
      className="group flex w-44 flex-shrink-0 flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div
        className={`aspect-square w-full overflow-hidden rounded-t-2xl bg-gray-200 ${
          isLeader ? "border-2 border-black" : "border border-gray-200"
        }`}
      >
        <div
          className="h-full w-full rounded-t-2xl bg-cover bg-center transition-all duration-300 group-hover:grayscale-0 grayscale"
          style={{ backgroundImage: `url('${image}')` }}
        />
      </div>
      <div className="bg-white px-4 pb-4 pt-3">
        <p className="font-bold">{name}</p>
        <p className="mt-0.5 font-sans text-xs uppercase tracking-wide text-gray-500">
          {role}
        </p>
      </div>
    </Link>
  );
}

const SECTIONS = [
  {
    label: "YÖNETİM KURULU",
    members: [
      { name: "Ahmet Yılmaz", role: "Başkan", isLeader: true },
      { name: "Ayşe Kaya", role: "Genel Sekreter", isLeader: false },
      { name: "Mehmet Demir", role: "Proje Koordinatörü", isLeader: false },
      { name: "Fatma Şahin", role: "İletişim Sorumlusu", isLeader: false },
      { name: "Ali Öztürk", role: "Muhasebe Sorumlusu", isLeader: false },
    ],
    photos: TEAM_PHOTOS_S1,
  },
  {
    label: "DENETİM KURULU",
    members: [
      { name: "Zeynep Arslan", role: "Denetim Başkanı", isLeader: true },
      { name: "Emre Çelik", role: "Denetim Üyesi", isLeader: false },
      { name: "Selin Yıldız", role: "Denetim Üyesi", isLeader: false },
    ],
    photos: TEAM_PHOTOS_S2,
  },
  {
    label: "AKADEMİ BİRİMİ",
    members: [
      { name: "Burak Aydın", role: "Birim Lideri", isLeader: true },
      { name: "Merve Koç", role: "Üye", isLeader: false },
      { name: "Can Yılmaz", role: "Üye", isLeader: false },
      { name: "Elif Doğan", role: "Üye", isLeader: false },
    ],
    photos: TEAM_PHOTOS_S3_8,
  },
  {
    label: "EĞİTİM & GELİŞİM BİRİMİ",
    members: [
      { name: "Deniz Şahin", role: "Birim Lideri", isLeader: true },
      { name: "Hasan Çetin", role: "Üye", isLeader: false },
      { name: "Nur Aksoy", role: "Üye", isLeader: false },
      { name: "Kerem Polat", role: "Üye", isLeader: false },
    ],
    photos: TEAM_PHOTOS_S3_8,
  },
  {
    label: "PROJE & UYGULAMA BİRİMİ",
    members: [
      { name: "Yusuf Kara", role: "Birim Lideri", isLeader: true },
      { name: "Büşra Tekin", role: "Üye", isLeader: false },
      { name: "Mert Özkan", role: "Üye", isLeader: false },
      { name: "Gizem Arslan", role: "Üye", isLeader: false },
    ],
    photos: TEAM_PHOTOS_S3_8,
  },
  {
    label: "İÇERİK BİRİMİ",
    members: [
      { name: "Ceren Yıldız", role: "Birim Lideri", isLeader: true },
      { name: "Tolga Şimşek", role: "Üye", isLeader: false },
      { name: "Pınar Avcı", role: "Üye", isLeader: false },
      { name: "Oğuz Demir", role: "Üye", isLeader: false },
    ],
    photos: TEAM_PHOTOS_S3_8,
  },
  {
    label: "YAYIN BİRİMİ",
    members: [
      { name: "Leyla Güneş", role: "Birim Lideri", isLeader: true },
      { name: "Serhan Koç", role: "Üye", isLeader: false },
      { name: "Aylin Çelik", role: "Üye", isLeader: false },
      { name: "Baran Yılmaz", role: "Üye", isLeader: false },
    ],
    photos: TEAM_PHOTOS_S3_8,
  },
  {
    label: "PRODÜKSİYON BİRİMİ",
    members: [
      { name: "Eda Kılıç", role: "Birim Lideri", isLeader: true },
      { name: "Furkan Aydın", role: "Üye", isLeader: false },
      { name: "Simge Doğan", role: "Üye", isLeader: false },
      { name: "Taner Şahin", role: "Üye", isLeader: false },
    ],
    photos: TEAM_PHOTOS_S3_8,
  },
];

export default function EkibimizPage() {
  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* Page header */}
      <header className="py-20 text-center">
        <h1 className="text-5xl font-normal md:text-6xl">
          Ekibimizle Tanışın
        </h1>
        <div className="mx-auto mt-6 h-px max-w-xs bg-black" />
      </header>

      {/* Sections */}
      <main className="px-6 pb-16 md:px-12">
        {SECTIONS.map((section, idx) => (
          <section key={section.label} className="mb-16">
            <p className="mb-6 text-center font-sans text-xs uppercase tracking-[0.25em] text-gray-400">
              {section.label}
            </p>
            <div className="rounded-2xl bg-[#f5f0eb] p-8 md:p-10">
              <div className="flex flex-wrap justify-center gap-8">
                {section.members.map((member, i) => (
                  <MemberCard
                    key={member.name}
                    name={member.name}
                    role={member.role}
                    image={section.photos[i % section.photos.length]}
                    isLeader={member.isLeader}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
