import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { yazilarListQuery } from "@/lib/queries";

const playfair = Playfair_Display({ subsets: ["latin"] });

function kategoriLabel(k: string | undefined) {
  const map: Record<string, string> = {
    Arastirma: "Araştırma",
    Klinik: "Klinik Psikoloji",
    Gelisim: "Gelişim Psikolojisi",
    Sosyal: "Toplum & Kültür",
    Guncel: "Güncel",
  };
  return (k && map[k]) ?? k ?? "";
}

export default async function YazilarPage() {
  let yazilar: {
    _id: string;
    baslik: string;
    slug: { current: string };
    kategori?: string;
    ozet?: string;
    kapakGorseli?: string;
    yazar?: { isim?: string };
  }[] = [];

  try {
    yazilar = await client.fetch(yazilarListQuery);
  } catch {
    yazilar = [];
  }

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <header className="w-full px-6 py-16 md:px-12">
        <h1 className="leading-tight">
          <span className="block text-6xl md:text-8xl">Yazılar</span>
          <span className="mt-2 inline-block text-2xl italic md:text-3xl">
            ve{" "}
          </span>
          <span className="inline-block font-sans text-2xl font-bold uppercase tracking-[0.25em] md:text-3xl">
            HABERLERİ
          </span>
        </h1>
        <div className="mt-6 h-1 w-full bg-black" />
      </header>

      <main className="px-6 py-12 md:px-12">
        {yazilar.length === 0 ? (
          <p className="py-16 text-center font-sans text-gray-500">
            Henüz yazı yayınlanmamış.
          </p>
        ) : (
          <div className="divide-y divide-black/10">
            {yazilar.map((yazi) => (
              <Link
                key={yazi._id}
                href={`/yazilar/${yazi.slug?.current ?? ""}`}
                className="group block"
              >
                <div className="flex flex-col gap-6 py-6 md:flex-row">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm italic text-gray-500">
                      {kategoriLabel(yazi.kategori)}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold leading-snug transition group-hover:text-gray-500">
                      {yazi.baslik}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-gray-600">
                      {yazi.ozet ?? ""}
                    </p>
                    <p className="mt-2 font-sans text-xs italic uppercase tracking-wide text-gray-700">
                      by {yazi.yazar?.isim ?? ""}
                    </p>
                  </div>
                  <div className="w-full flex-shrink-0 md:w-[30%]">
                    {yazi.kapakGorseli ? (
                      <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
                        <Image
                          src={yazi.kapakGorseli}
                          alt={yazi.baslik}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 30vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square w-full bg-gray-200" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
