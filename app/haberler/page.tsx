import Link from "next/link";
import Image from "next/image";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { client } from "@/lib/sanity";
import { haberlerQuery } from "@/lib/queries";

export const dynamic = "force-dynamic";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const dmSans = DM_Sans({ subsets: ["latin"] });

type Haber = {
  _id: string;
  baslik: string;
  slug: { current: string };
  ozet?: string;
  tarih?: string;
  kategori?: string;
  kapakGorseli?: string;
};

const KATEGORI_DISPLAY: Record<string, string> = {
  Arastirma: "Araştırma",
  Klinik: "Klinik",
  Gelisim: "Gelişim",
  Sosyal: "Sosyal",
  Guncel: "Güncel",
};

function kategoriLabel(k: string | undefined) {
  return (k && KATEGORI_DISPLAY[k]) ?? k ?? "";
}

function formatTarih(tarih: string | undefined) {
  if (!tarih) return "";
  return new Date(tarih).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function HaberLink({ haber, children }: { haber: Haber; children: React.ReactNode }) {
  const slug = haber.slug?.current ?? "";
  return (
    <Link
      href={slug ? `/haberler/${slug}` : "/haberler"}
      className="group block transition-transform duration-300 hover:-translate-y-1"
    >
      {children}
    </Link>
  );
}

export default async function HaberlerPage() {
  const haberler = await client.fetch<Haber[]>(haberlerQuery).catch(() => []);

  const vitrin = haberler.slice(0, 5);
  const tumHaberler = haberler.slice(5);

  const ana = vitrin[0];
  const orta = vitrin.slice(1, 3);
  const sag = vitrin.slice(3, 5);

  return (
    <main className={`${dmSans.className} min-h-screen bg-white text-black`}>
      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 pb-10 pt-16 md:px-12">
        <h1 className={`${dmSerif.className} text-5xl font-bold md:text-7xl`}>
          PSİKOLOJİ HABERLERİ
        </h1>
        <div className="mt-6 h-px w-full bg-black/20" />
        <p className="mt-4 max-w-2xl text-sm text-black/70">
          Dünyadan psikoloji haberlerini takip edin
        </p>
      </header>

      {/* Vitrin */}
      <section className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-8 border-b border-black/10 pb-12 lg:grid-cols-[minmax(0,50fr)_minmax(0,28fr)_minmax(0,22fr)]">
          {/* Left: large */}
          <div className="min-w-0">
            {ana ? (
              <HaberLink haber={ana}>
                <article className="rounded-sm">
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black/5">
                    {ana.kapakGorseli ? (
                      <Image
                        src={ana.kapakGorseli}
                        alt={ana.baslik}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-black/5" />
                    )}
                  </div>
                  <div className="mt-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      {ana.kategori && (
                        <span className="inline-flex items-center rounded-full border border-teal-600/40 px-2.5 py-1 text-[11px] font-medium tracking-wide text-teal-700">
                          {kategoriLabel(ana.kategori)}
                        </span>
                      )}
                      {ana.tarih && (
                        <span className="text-[11px] tracking-wide text-black/50">
                          {formatTarih(ana.tarih)}
                        </span>
                      )}
                    </div>
                    <h2
                      className={`${dmSerif.className} mt-3 text-2xl leading-snug transition-colors group-hover:text-teal-800`}
                    >
                      {ana.baslik}
                    </h2>
                    {ana.ozet && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-black/70">
                        {ana.ozet}
                      </p>
                    )}
                  </div>
                </article>
              </HaberLink>
            ) : null}
          </div>

          {/* Middle: 2 stacked medium */}
          <div className="min-w-0 space-y-8">
            {orta.map((haber) => (
              <HaberLink key={haber._id} haber={haber}>
                <article className="flex gap-4 border-b border-black/10 pb-6 last:border-b-0 last:pb-0">
                  <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-sm bg-black/5">
                    {haber.kapakGorseli ? (
                      <Image
                        src={haber.kapakGorseli}
                        alt={haber.baslik}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        sizes="112px"
                      />
                    ) : (
                      <div className="h-full w-full bg-black/5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] tracking-wide text-black/50">
                      {formatTarih(haber.tarih)}
                    </p>
                    <h3
                      className={`${dmSerif.className} mt-2 text-lg leading-snug transition-colors group-hover:text-teal-800`}
                    >
                      {haber.baslik}
                    </h3>
                  </div>
                </article>
              </HaberLink>
            ))}
          </div>

          {/* Right: 2 text-only */}
          <div className="min-w-0 space-y-8">
            {sag.map((haber) => (
              <HaberLink key={haber._id} haber={haber}>
                <article className="border-b border-black/10 pb-6 last:border-b-0 last:pb-0">
                  <p className="text-[11px] tracking-wide text-black/50">
                    {formatTarih(haber.tarih)}
                  </p>
                  <h3
                    className={`${dmSerif.className} mt-2 text-base leading-snug transition-colors group-hover:text-teal-800`}
                  >
                    {haber.baslik}
                  </h3>
                  {haber.ozet && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-black/70">
                      {haber.ozet}
                    </p>
                  )}
                </article>
              </HaberLink>
            ))}
          </div>
        </div>
      </section>

      {/* Tüm Haberler */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-12">
        <h2 className={`${dmSerif.className} text-2xl`}>Tüm Haberler</h2>

        {tumHaberler.length === 0 ? (
          <p className="mt-8 text-sm text-black/60">Henüz haber eklenmemiş.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {tumHaberler.map((haber) => {
              const slug = haber.slug?.current ?? "";
              return (
                <div key={haber._id} className="border-b border-black/10 py-8">
                  <div className="flex flex-wrap items-center gap-3">
                    {haber.kategori && (
                      <span className="inline-flex items-center rounded-full border border-teal-600/40 px-2.5 py-1 text-[11px] font-medium tracking-wide text-teal-700">
                        {kategoriLabel(haber.kategori)}
                      </span>
                    )}
                    {haber.tarih && (
                      <span className="text-[11px] tracking-wide text-black/50">
                        {formatTarih(haber.tarih)}
                      </span>
                    )}
                  </div>

                  <h3 className={`${dmSerif.className} mt-3 text-xl leading-snug`}>
                    <Link
                      href={slug ? `/haberler/${slug}` : "/haberler"}
                      className="transition-colors hover:text-teal-800"
                    >
                      {haber.baslik}
                    </Link>
                  </h3>

                  {haber.ozet && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {haber.ozet}
                    </p>
                  )}

                  <Link
                    href={slug ? `/haberler/${slug}` : "/haberler"}
                    className="mt-4 inline-block text-sm font-medium text-teal-700 hover:text-teal-800"
                  >
                    Devamını Oku →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

