import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { ekipGruplariQuery, ekipGrupsuzUyelerQuery } from "@/lib/queries";

const playfair = Playfair_Display({ subsets: ["latin"] });

type Grup = {
  _id: string;
  ad: string;
  sira?: number;
  uyeler: {
    _id: string;
    isim?: string;
    slug?: { current: string };
    unvan?: string;
    foto?: string;
  }[];
};

export default async function EkibimizPage() {
  const [gruplar, grupsuzUyeler] = await Promise.all([
    client.fetch<Grup[]>(ekipGruplariQuery).catch(() => []),
    client.fetch<Grup["uyeler"]>(ekipGrupsuzUyelerQuery).catch(() => []),
  ]);

  const gruplarWithUyeler = gruplar.filter((g) => g.uyeler && g.uyeler.length > 0);
  if (grupsuzUyeler.length > 0) {
    gruplarWithUyeler.push({ _id: "grupsuz", ad: "Ekibimiz", uyeler: grupsuzUyeler });
  }
  const toplamUye = gruplarWithUyeler.reduce((acc, g) => acc + g.uyeler.length, 0);

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <header className="py-20 text-center">
        <h1 className="text-5xl font-normal md:text-6xl">Ekibimizle Tanışın</h1>
        <div className="mx-auto mt-6 h-px max-w-xs bg-black" />
      </header>

      <main className="px-6 pb-24 md:px-12">
        {toplamUye === 0 ? (
          <p className="py-16 text-center font-sans text-gray-500">
            Henüz ekip üyesi eklenmemiş.
          </p>
        ) : (
          <div className="mx-auto max-w-6xl space-y-16">
            {gruplarWithUyeler.map((grup) => (
              <section key={grup._id}>
                <h2 className="mb-8 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">
                  {grup.ad}
                </h2>
                <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
                  {grup.uyeler.map((uye) => {
                    const slug = uye.slug?.current ?? "";

                    return (
                      <Link
                        key={uye._id}
                        href={slug ? `/ekip/${slug}` : "#"}
                        className="group block w-44 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                      >
                        <div className="aspect-square w-full overflow-hidden bg-gray-200">
                          {uye.foto ? (
                            <Image
                              src={uye.foto}
                              alt={uye.isim ?? ""}
                              width={176}
                              height={176}
                              className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center font-sans text-4xl text-gray-400">
                              {uye.isim?.charAt(0) ?? "?"}
                            </div>
                          )}
                        </div>
                        <div className="px-4 py-4">
                          <p className="font-bold">{uye.isim}</p>
                          {uye.unvan && (
                            <p className="mt-1 font-sans text-sm text-gray-600">
                              {uye.unvan}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
