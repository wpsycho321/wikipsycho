import { Playfair_Display } from "next/font/google";
import { client } from "@/lib/sanity";
import { projeRaporlariQuery } from "@/lib/queries";
import ProjeRaporlariClient from "./ProjeRaporlariClient";
import type { Rapor } from "./ProjeRaporlariClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

export default async function ProjeRaporlariPage() {
  const raporlar: Rapor[] = await client
    .fetch(projeRaporlariQuery)
    .catch(() => []);

  return (
    <main className={`${playfair.className} min-h-screen bg-white`}>
      <ProjeRaporlariClient raporlar={raporlar} />
    </main>
  );
}
