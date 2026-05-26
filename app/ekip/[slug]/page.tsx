import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { ekipUyesiBySlugQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import EkipTabs from "@/components/EkipTabs";

export const dynamic = "force-dynamic";

const playfair = Playfair_Display({ subsets: ["latin"] });

type SosyalMedya = {
  twitter?: string;
  instagram?: string;
  linkedin?: string;
};

export default async function EkipProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const uye = await client
    .fetch<{
      isim?: string;
      rol?: string;
      unvan?: string;
      yazarGoster?: boolean;
      sifat?: string;
      biyografi?: string;
      foto?: string;
      sosyalMedya?: SosyalMedya;
      yazilari?: {
        baslik: string;
        slug?: { current: string };
        kategori?: string;
        ozet?: string;
        tarih?: string;
        kapak?: string;
      }[];
    } | null>(ekipUyesiBySlugQuery, { slug })
    .catch(() => null);

  if (!uye) notFound();

  const sosyal = uye.sosyalMedya ?? {};
  const hasTwitter = !!sosyal.twitter;
  const hasInstagram = !!sosyal.instagram;
  const hasLinkedIn = !!sosyal.linkedin;
  const yazilari = uye.yazilari ?? [];

  return (
    <div className={`${playfair.className} min-h-screen bg-white text-black`}>
      {/* Hero */}
      <section className="w-full bg-[#f5f0eb] px-8 py-20 md:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
          <div className="flex-1 lg:w-[70%]">
            <h1 className="text-5xl font-bold md:text-7xl">{uye.isim}</h1>
            <p className="mt-2 font-serif text-2xl italic text-gray-600">
              {[uye.sifat, uye.unvan].filter(Boolean).join(" · ")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {uye.yazarGoster && (
                <span className="inline-block border border-black px-3 py-1 font-sans text-xs uppercase tracking-[0.2em]">
                  WikiPsycho Yazarı
                </span>
              )}
            </div>
            <div className="mt-4 flex gap-3">
              {hasTwitter && (
                <a
                  href={sosyal.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center border border-gray-400 transition hover:border-black hover:bg-black hover:text-white"
                  aria-label="X"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {hasInstagram && (
                <a
                  href={sosyal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center border border-gray-400 transition hover:border-black hover:bg-black hover:text-white"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                  </svg>
                </a>
              )}
              {hasLinkedIn && (
                <a
                  href={sosyal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center border border-gray-400 transition hover:border-black hover:bg-black hover:text-white"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>

            <div className="mt-6 flex justify-start lg:hidden">
              {uye.foto ? (
                <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden border-4 border-black">
                  <Image
                    src={uye.foto}
                    alt={uye.isim ?? ""}
                    fill
                    className="object-cover grayscale"
                    sizes="192px"
                  />
                </div>
              ) : (
                <div className="flex h-48 w-48 items-center justify-center border-4 border-gray-300 bg-gray-200 font-sans text-6xl text-gray-400">
                  {uye.isim?.charAt(0) ?? "?"}
                </div>
              )}
            </div>

            {uye.biyografi && (
              <>
                <div className="my-6 h-px w-full bg-black/20" />
                <div className="max-w-2xl space-y-4 font-serif text-lg leading-relaxed text-gray-700">
                  {uye.biyografi.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="hidden flex-shrink-0 items-start justify-end lg:flex lg:w-[30%]">
            {uye.foto ? (
              <div className="group/photo relative h-72 w-72 flex-shrink-0 overflow-hidden border-4 border-black">
                <Image
                  src={uye.foto}
                  alt={uye.isim ?? ""}
                  fill
                  className="object-cover grayscale transition-all duration-300 group-hover/photo:grayscale-0"
                  sizes="288px"
                />
              </div>
            ) : (
              <div className="flex h-72 w-72 flex-shrink-0 items-center justify-center border-4 border-gray-300 bg-gray-200 font-sans text-6xl text-gray-400">
                {uye.isim?.charAt(0) ?? "?"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <EkipTabs yazilari={yazilari} />
    </div>
  );
}
