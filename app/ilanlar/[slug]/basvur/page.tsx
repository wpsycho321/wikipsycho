import { redirect, notFound } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { ilanBySlugQuery } from "@/lib/queries";
import BasvuruFormClient from "./BasvuruFormClient";

const playfair = Playfair_Display({ subsets: ["latin"] });

type Soru = {
  soru?: string;
  tip?: string;
  secenekler?: string[];
  zorunlu?: boolean;
};

export default async function BasvurPage({
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
          sonTarih?: string;
          sorular?: Soru[];
        }
      | null
    >(ilanBySlugQuery, { slug })
    .catch(() => null);

  if (!ilan) notFound();

  const now = new Date();
  const sonTarih = ilan.sonTarih ? new Date(ilan.sonTarih) : null;
  const doldu = sonTarih && sonTarih < now;

  if (doldu) {
    redirect(`/ilanlar/${slug}`);
  }

  const sorular = ilan.sorular ?? [];
  const ilanSlug = ilan.slug?.current ?? slug;

  return (
    <div
      className={`${playfair.className} min-h-screen bg-white text-black`}
    >
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="mb-2 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
          {ilan.baslik}
        </p>
        <h1 className="mb-12 text-2xl font-semibold">Başvuru Formu</h1>

        {sorular.length > 0 ? (
          <BasvuruFormClient ilanSlug={ilanSlug} sorular={sorular} />
        ) : (
          <p className="font-sans text-sm text-gray-500">
            Bu ilan için başvuru formu tanımlanmamış.
          </p>
        )}

        <Link
          href={`/ilanlar/${slug}`}
          className="mt-12 inline-block font-sans text-sm text-gray-500 underline hover:text-gray-700"
        >
          ← İlana dön
        </Link>
      </div>
    </div>
  );
}
