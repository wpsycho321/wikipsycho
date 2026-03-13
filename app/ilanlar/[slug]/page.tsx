import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { ilanBySlugQuery } from "@/lib/queries";
import IlanBasvuruForm from "./IlanBasvuruForm";

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
  return Math.ceil(
    (son.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
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

type Soru = {
  soru?: string;
  tip?: string;
  secenekler?: string[];
  zorunlu?: boolean;
};

export default async function IlanDetayPage({
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
          aciklama?: string;
          birim?: string;
          kategori?: string;
          sonTarih?: string;
          afis?: string;
          sorular?: Soru[];
        }
      | null
    >(ilanBySlugQuery, { slug })
    .catch(() => null);

  if (!ilan) notFound();

  const gun = kalanGun(ilan.sonTarih);
  const doldu = gun !== null && gun < 0;
  const formId = "basvuru-formu";

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      <article className="mx-auto max-w-4xl">
        {/* Afiş */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 md:aspect-[16/9]">
          {ilan.afis ? (
            <Image
              src={ilan.afis}
              alt={ilan.baslik}
              fill
              className="object-contain"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center font-sans text-gray-400">
              Afiş yok
            </div>
          )}
        </div>

        {/* İçerik */}
        <div className="px-6 py-10 md:px-0">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {ilan.birim} · {kategoriLabel(ilan.kategori)}
          </p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">{ilan.baslik}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 font-sans text-sm text-gray-600">
            <span>Son başvuru: {formatTarih(ilan.sonTarih)}</span>
            {doldu ? (
              <span className="rounded bg-gray-700 px-3 py-1 text-white">
                Başvuru tarihi doldu
              </span>
            ) : (
              gun !== null &&
              gun >= 0 && (
                <span className="rounded bg-black px-3 py-1 text-white">
                  {gun === 0 ? "Son gün" : `${gun} gün kaldı`}
                </span>
              )
            )}
          </div>

          {ilan.aciklama && (
            <div className="mt-8 font-sans text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
              {ilan.aciklama}
            </div>
          )}

          {/* Başvur butonu / Form */}
          {!doldu && (
            <>
              <a
                href={`#${formId}`}
                className="mt-10 inline-block rounded bg-black px-6 py-3 font-sans text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Başvur
              </a>
              <div className="mt-10" id={formId}>
                <h2 className="text-2xl font-bold">Başvuru Formu</h2>
                <div className="mt-6">
                  {(ilan.sorular ?? []).length > 0 ? (
                    <IlanBasvuruForm
                      ilanSlug={ilan.slug?.current ?? ""}
                      sorular={ilan.sorular ?? []}
                    />
                  ) : (
                    <p className="font-sans text-sm text-gray-500">
                      Bu ilan için başvuru formu tanımlanmamış.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </article>
    </div>
  );
}
