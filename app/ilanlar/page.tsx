import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";

// DEBUG: Simple query, no date filter
const ilanlarDebugQuery = `*[_type == "ilan"] { _id, baslik, slug }`;

const playfair = Playfair_Display({ subsets: ["latin"] });

function formatTarih(datetime: string | undefined) {
  if (!datetime) return "";
  return new Date(datetime).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function kalanGun(sonTarih: string | undefined) {
  if (!sonTarih) return null;
  const now = new Date();
  const son = new Date(sonTarih);
  const diff = Math.ceil((son.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

function kategoriLabel(k: string | undefined) {
  const map: Record<string, string> = {
    UyeAlimi: "Üye Alımı",
    Staj: "Staj",
    Gonullu: "Gönüllü",
    Diger: "Diğer",
  };
  return (k && map[k]) ?? k ?? "";
}

export default async function IlanlarPage() {
  const ilanlar = await client
    .fetch<
      { _id: string; baslik: string; slug: { current: string } }[]
    >(ilanlarDebugQuery)
    .catch((err) => {
      console.error("[ilanlar] Fetch error:", err);
      return [];
    });

  console.log("[ilanlar] Fetched:", ilanlar?.length ?? 0, "items", ilanlar);

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <header className="py-20 text-center">
        <h1 className="text-5xl font-normal md:text-6xl">İlanlar</h1>
        <p className="mt-4 font-sans text-sm text-gray-600">
          Gönüllü, staj ve üye alımı ilanları
        </p>
        <div className="mx-auto mt-6 h-px max-w-xs bg-black" />
      </header>

      <main className="px-6 pb-20 md:px-12">
        {ilanlar.length === 0 ? (
          <p className="py-16 text-center font-sans text-gray-500">
            Şu an aktif ilan yok.
          </p>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ilanlar.map((ilan) => {
              const gun = kalanGun(ilan.sonTarih);
              const doldu = gun !== null && gun < 0;
              return (
                <article
                  key={ilan._id}
                  className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white transition-shadow hover:shadow-lg"
                >
                  <Link href={`/ilanlar/${ilan.slug?.current ?? ""}`}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      {ilan.afis ? (
                        <Image
                          src={ilan.afis}
                          alt={ilan.baslik}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gray-200 font-sans text-sm text-gray-400">
                          Afiş yok
                        </div>
                      )}
                      {doldu ? (
                        <span className="absolute left-3 top-3 rounded bg-gray-700 px-3 py-1 text-xs font-sans text-white">
                          Başvuru tarihi doldu
                        </span>
                      ) : gun !== null && gun >= 0 ? (
                        <span className="absolute left-3 top-3 rounded bg-black px-3 py-1 text-xs font-sans text-white">
                          {gun === 0 ? "Son gün" : `${gun} gün kaldı`}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                        {ilan.birim} · {kategoriLabel(ilan.kategori)}
                      </p>
                      <h2 className="mt-2 text-xl font-bold leading-snug">
                        {ilan.baslik}
                      </h2>
                      <p className="mt-2 font-sans text-xs text-gray-500">
                        Son başvuru: {formatTarih(ilan.sonTarih)}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
