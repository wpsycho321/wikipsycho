import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { etkinliklerQuery } from "@/lib/queries";

const playfair = Playfair_Display({ subsets: ["latin"] });

function formatTarih(tarih: string | undefined) {
  if (!tarih) return "";
  return new Date(tarih).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function kategoriLabel(k: string | undefined) {
  const map: Record<string, string> = {
    Atolye: "Atölye",
    Konferans: "Konferans",
    Webinar: "Webinar",
    Diger: "Diğer",
  };
  return (k && map[k]) ?? k ?? "";
}

function durumLabel(d: string | undefined) {
  const map: Record<string, string> = {
    yaklasan: "Yaklaşan",
    "devam-ediyor": "Devam ediyor",
    tamamlandi: "Tamamlandı",
  };
  return (d && map[d]) ?? d ?? "";
}

export default async function EtkinliklerPage() {
  const etkinlikler = await client
    .fetch<
      {
        _id: string;
        baslik: string;
        slug: { current: string };
        tarih?: string;
        konum?: string;
        kategori?: string;
        aciklama?: string;
        gorsel?: string;
        durum?: string;
      }[]
    >(etkinliklerQuery)
    .catch(() => []);

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <header className="py-20 text-center">
        <h1 className="text-5xl font-normal md:text-6xl">Etkinlikler</h1>
        <p className="mt-4 font-sans text-sm text-gray-600">
          WikiPsycho etkinliklerini keşfedin
        </p>
        <div className="mx-auto mt-6 h-px max-w-xs bg-black" />
      </header>

      <main className="px-6 pb-20 md:px-12">
        {etkinlikler.length === 0 ? (
          <p className="py-16 text-center font-sans text-gray-500">
            Henüz etkinlik eklenmemiş.
          </p>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {etkinlikler.map((etkinlik) => (
              <article
                key={etkinlik._id}
                className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {etkinlik.gorsel ? (
                      <Image
                        src={etkinlik.gorsel}
                        alt={etkinlik.baslik}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-200 font-sans text-sm text-gray-400">
                        Görsel yok
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded bg-black px-2 py-1 text-xs font-sans text-white">
                      {kategoriLabel(etkinlik.kategori)}
                    </span>
                    {etkinlik.durum && (
                      <span className="absolute right-3 top-3 rounded border border-white/80 bg-black/60 px-2 py-1 text-xs font-sans text-white">
                        {durumLabel(etkinlik.durum)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      {formatTarih(etkinlik.tarih)}
                    </p>
                    <h2 className="mt-2 text-xl font-bold leading-snug">
                      {etkinlik.baslik}
                    </h2>
                    {etkinlik.konum && (
                      <p className="mt-2 font-sans text-sm text-gray-600">
                        {etkinlik.konum}
                      </p>
                    )}
                    {etkinlik.aciklama && (
                      <p className="mt-3 line-clamp-3 font-sans text-sm text-gray-600">
                        {etkinlik.aciklama}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
