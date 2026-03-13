import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { ekibimizQuery } from "@/lib/queries";

const playfair = Playfair_Display({ subsets: ["latin"] });

function birimLabel(birim: string | undefined) {
  const map: Record<string, string> = {
    Akademi: "AKADEMİ BİRİMİ",
    Icerik: "İÇERİK BİRİMİ",
    Proje: "PROJE & UYGULAMA BİRİMİ",
    EgitimGelisim: "EĞİTİM & GELİŞİM BİRİMİ",
    Yayin: "YAYIN BİRİMİ",
    Produksiyon: "PRODÜKSİYON BİRİMİ",
  };
  return (birim && map[birim]) ?? birim ?? "";
}

export default async function EkibimizPage() {
  const uyeler = await client
    .fetch<
      {
        _id: string;
        isim?: string;
        slug?: { current: string };
        unvan?: string;
        birim?: string;
        rol?: string;
        fotograf?: string;
      }[]
    >(ekibimizQuery)
    .catch(() => []);

  const gruplar = uyeler.reduce<
    Record<string, { isim: string; unvan: string; slug: string; fotograf?: string; isLeader: boolean }[]>
  >((acc, u) => {
    const birim = u.birim ?? "Diger";
    if (!acc[birim]) acc[birim] = [];
    acc[birim].push({
      isim: u.isim ?? "",
      unvan: u.unvan ?? "",
      slug: u.slug?.current ?? "",
      fotograf: u.fotograf,
      isLeader: u.rol === "birimlideri",
    });
    return acc;
  }, {});

  const birimSira = ["Akademi", "EgitimGelisim", "Proje", "Icerik", "Yayin", "Produksiyon"];

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <header className="py-20 text-center">
        <h1 className="text-5xl font-normal md:text-6xl">
          Ekibimizle Tanışın
        </h1>
        <div className="mx-auto mt-6 h-px max-w-xs bg-black" />
      </header>

      <main className="px-6 pb-16 md:px-12">
        {uyeler.length === 0 ? (
          <p className="py-16 text-center font-sans text-gray-500">
            Henüz ekip üyesi eklenmemiş.
          </p>
        ) : (
          birimSira.filter((b) => gruplar[b]?.length).map((birim) => (
            <section key={birim} className="mb-16">
              <p className="mb-6 text-center font-sans text-xs uppercase tracking-[0.25em] text-gray-400">
                {birimLabel(birim)}
              </p>
              <div className="rounded-2xl bg-[#f5f0eb] p-8 md:p-10">
                <div className="flex flex-wrap justify-center gap-8">
                  {gruplar[birim].map((member) => (
                    <Link
                      key={member.isim + member.slug}
                      href={member.slug ? `/ekip/${member.slug}` : "#"}
                      className="group flex w-44 flex-shrink-0 flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                      <div
                        className={`aspect-square w-full overflow-hidden rounded-t-2xl bg-gray-200 ${
                          member.isLeader
                            ? "border-2 border-black"
                            : "border border-gray-200"
                        }`}
                      >
                        {member.fotograf ? (
                          <Image
                            src={member.fotograf}
                            alt={member.isim}
                            width={176}
                            height={176}
                            className="h-full w-full object-cover transition duration-300 group-hover:grayscale-0 grayscale"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-sans text-4xl text-gray-400">
                            {member.isim?.charAt(0) ?? "?"}
                          </div>
                        )}
                      </div>
                      <div className="bg-white px-4 pb-4 pt-3">
                        <p className="font-bold">{member.isim}</p>
                        <p className="mt-0.5 font-sans text-xs uppercase tracking-wide text-gray-500">
                          {member.unvan}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}
