import { Playfair_Display } from "next/font/google";
import { client } from "@/lib/sanity";
import { projelerQuery } from "@/lib/queries";
import ProjelerClient from "./ProjelerClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

export type Proje = {
  _id: string;
  baslik: string;
  slug: { current: string } | string;
  altBaslik?: string;
  aciklama?: string;
  durum?: string;
  yil?: string;
  kategori?: string;
  gorsel?: string;
  istatistikler?: { sayi?: string; aciklama?: string }[];
  ortaklar?: string[];
};

export default async function ProjelerPage() {
  const projeler: Proje[] = await client.fetch(projelerQuery).catch(() => []);

  return (
    <main className={`${playfair.className} min-h-screen bg-white`}>
      <ProjelerClient projeler={projeler} />
    </main>
  );
}


