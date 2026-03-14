import { Playfair_Display } from "next/font/google";
import { client } from "@/lib/sanity";
import { yazilarListQuery, haberlerQuery } from "@/lib/queries";
import YazilarClient from "./YazilarClient";
import type { Yazi, Haber } from "./YazilarClient";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default async function YazilarPage() {
  const [yazilar, haberler] = await Promise.all([
    client.fetch<Yazi[]>(yazilarListQuery).catch(() => []),
    client.fetch<Haber[]>(haberlerQuery).catch(() => []),
  ]);

  return (
    <main className={`${playfair.className} min-h-screen bg-white`}>
      <YazilarClient yazilar={yazilar} haberler={haberler} />
    </main>
  );
}
