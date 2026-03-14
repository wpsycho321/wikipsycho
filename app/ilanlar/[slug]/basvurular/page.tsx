import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { ilanBySlugQuery } from "@/lib/queries";

export const dynamic = "force-dynamic";

const playfair = Playfair_Display({ subsets: ["latin"] });

type Soru = { soru?: string };
type Cevap = { soru?: string; cevap?: string };

export default async function BasvurularPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ilan = await client
    .fetch<
      | {
          _id: string;
          baslik: string;
          slug: { current: string };
          sorular?: Soru[];
        }
      | null
    >(ilanBySlugQuery, { slug })
    .catch(() => null);

  if (!ilan) notFound();

  const basvurular = await client
    .fetch<
      {
        _id: string;
        tarih?: string;
        cevaplar?: Cevap[];
      }[]
    >(
      `*[_type == "basvuru" && references($ilanId)] | order(tarih desc) {
        _id, tarih, cevaplar
      }`,
      { ilanId: ilan._id }
    )
    .catch(() => []);

  const sorular = ilan.sorular ?? [];
  const ilanSlug = ilan.slug?.current ?? slug;

  function cevapBul(cevaplar: Cevap[] | undefined, soru: string): string {
    return cevaplar?.find((c) => c.soru === soru)?.cevap ?? "";
  }

  function formatTarih(d: string | undefined) {
    if (!d) return "";
    return new Date(d).toLocaleString("tr-TR");
  }

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{ilan.baslik}</h1>
            <p className="mt-1 font-sans text-sm text-gray-500">
              Başvurular ({basvurular.length})
            </p>
          </div>
          <a
            href={`/api/basvurulari-indir?ilanSlug=${ilanSlug}`}
            className="rounded border border-black px-4 py-2 font-sans text-sm font-medium transition hover:bg-gray-100"
          >
            Excel İndir
          </a>
        </div>

        <Link
          href={`/ilanlar/${slug}`}
          className="mb-6 inline-block font-sans text-sm text-gray-500 underline hover:text-gray-700"
        >
          ← İlana dön
        </Link>

        {basvurular.length === 0 ? (
          <p className="font-sans text-gray-500">
            Henüz başvuru bulunmuyor.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-sans text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Tarih
                  </th>
                  {sorular.map((s, i) => (
                    <th
                      key={i}
                      className="max-w-[200px] px-4 py-3 text-left font-medium text-gray-600"
                    >
                      {s.soru ?? ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {basvurular.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {formatTarih(b.tarih)}
                    </td>
                    {sorular.map((s, i) => (
                      <td
                        key={i}
                        className="max-w-[200px] truncate px-4 py-3"
                        title={cevapBul(b.cevaplar, s.soru ?? "")}
                      >
                        {cevapBul(b.cevaplar, s.soru ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
