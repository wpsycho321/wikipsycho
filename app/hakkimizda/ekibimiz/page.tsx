import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { ekipUyesiQuery } from "@/lib/queries";

const playfair = Playfair_Display({ subsets: ["latin"] });

function birimLabel(birim: string | undefined) {
  const map: Record<string, string> = {
    Akademi: "Akademi",
    Icerik: "İçerik",
    Proje: "Proje",
    EgitimGelisim: "Eğitim & Gelişim",
    Yayin: "Yayın",
    Produksiyon: "Prodüksiyon",
  };
  return (birim && map[birim]) ?? birim ?? "";
}

type Uye = {
  _id: string;
  isim?: string;
  slug?: { current: string };
  unvan?: string;
  rol?: string;
  kategori?: string;
  sira?: number;
  birim?: string;
  fotograf?: string;
};

function MemberCard({ uye }: { uye: Uye }) {
  const slug = uye.slug?.current ?? "";
  const href = slug ? `/ekip/${slug}` : "#";

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-200">
        {uye.fotograf ? (
          <Image
            src={uye.fotograf}
            alt={uye.isim ?? ""}
            width={280}
            height={280}
            className="h-full w-full object-cover transition duration-300 group-hover:grayscale-0 grayscale"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-sans text-5xl text-gray-400">
            {uye.isim?.charAt(0) ?? "?"}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <p className="font-bold text-black">{uye.isim}</p>
        {uye.rol && (
          <p className="mt-1 font-sans text-sm font-medium text-gray-800">
            {uye.rol}
          </p>
        )}
        {uye.unvan && (
          <p className="mt-0.5 font-sans text-xs text-gray-500">{uye.unvan}</p>
        )}
        {uye.birim && (
          <p className="mt-1 font-sans text-xs uppercase tracking-wide text-gray-400">
            {birimLabel(uye.birim)}
          </p>
        )}
      </div>
    </Link>
  );
}

export default async function EkibimizPage() {
  const uyeler: Uye[] = await client
    .fetch(ekipUyesiQuery)
    .catch((err) => {
      console.error("[ekibimiz] Sanity fetch error:", err);
      return [];
    });

  console.log("[ekibimiz] Ekip verisi:", JSON.stringify(uyeler, null, 2));

  const yonetim = uyeler.filter((u) => u.kategori === "yonetim");
  const denetim = uyeler.filter((u) => u.kategori === "denetim").slice(0, 3);
  const ekip = uyeler.filter((u) => u.kategori === "ekip" || !u.kategori);

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <header className="py-20 text-center">
        <h1 className="text-5xl font-normal md:text-6xl">Ekibimizle Tanışın</h1>
        <div className="mx-auto mt-6 h-px max-w-xs bg-black" />
      </header>

      <main className="px-6 pb-16 md:px-12">
        {uyeler.length === 0 ? (
          <p className="py-16 text-center font-sans text-gray-500">
            Henüz ekip üyesi eklenmemiş.
          </p>
        ) : (
          <>
            {/* Section 1: Yönetim */}
            {yonetim.length > 0 && (
              <section className="mb-20">
                <h2 className="mb-8 text-center font-sans text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                  Yönetim
                </h2>
                <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-8">
                  {yonetim.map((uye) => (
                    <MemberCard key={uye._id} uye={uye} />
                  ))}
                </div>
              </section>
            )}

            {/* Section 2: Denetim Kurulu */}
            {denetim.length > 0 && (
              <section className="mb-20">
                <h2 className="mb-8 text-center font-sans text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                  Denetim Kurulu
                </h2>
                <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-8">
                  {denetim.map((uye) => (
                    <MemberCard key={uye._id} uye={uye} />
                  ))}
                </div>
              </section>
            )}

            {/* Section 3: Ekibimiz */}
            {ekip.length > 0 && (
              <section>
                <h2 className="mb-8 text-center font-sans text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                  Ekibimiz
                </h2>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {ekip.map((uye) => (
                    <MemberCard key={uye._id} uye={uye} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
