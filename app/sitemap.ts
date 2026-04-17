import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

const BASE = "https://wikipsycho.org.tr";

/** Statik sayfalar (Studio hariç) */
const STATIC_PATHS: string[] = [
  "/",
  "/yazilar",
  "/haberler",
  "/hakkimizda/biz-kimiz",
  "/hakkimizda/ekibimiz",
  "/hakkimizda/birimler",
  "/hakkimizda/etkinlikler",
  "/yayinlar/e-yayinlar",
  "/yayinlar/proje-raporlari",
  "/medya/videolar",
  "/medya/podcastlar",
  "/projeler",
  "/ilanlar",
  "/iletisim",
];

function absUrl(path: string) {
  if (path === "/" || path === "") return BASE;
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

function slugToPathSegment(raw: string) {
  return String(raw).trim();
}

/** Sitemap yenileme aralığı (saniye) */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [yaziDocs, haberDocs, ekipDocs] = await Promise.all([
    client
      .fetch<Array<{ slug?: string | null; _updatedAt?: string }>>(
        `*[_type == "yazi" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
      )
      .catch(() => []),
    client
      .fetch<Array<{ slug?: string | null; _updatedAt?: string }>>(
        `*[_type == "haber" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
      )
      .catch(() => []),
    client
      .fetch<Array<{ slug?: string | null; _updatedAt?: string }>>(
        `*[_type == "ekipUyesi" && aktif == true]{ "slug": slug.current, _updatedAt }`,
      )
      .catch(() => []),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const yaziEntries: MetadataRoute.Sitemap = yaziDocs
    .map((doc) => {
      const s = doc.slug != null ? slugToPathSegment(String(doc.slug)) : "";
      if (!s) return null;
      return {
        url: `${BASE}/yazilar/${encodeURIComponent(s)}`,
        lastModified: doc._updatedAt ? new Date(doc._updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  const haberEntries: MetadataRoute.Sitemap = haberDocs
    .map((doc) => {
      const s = doc.slug != null ? slugToPathSegment(String(doc.slug)) : "";
      if (!s) return null;
      return {
        url: `${BASE}/haberler/${encodeURIComponent(s)}`,
        lastModified: doc._updatedAt ? new Date(doc._updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  const ekipEntries: MetadataRoute.Sitemap = ekipDocs
    .map((doc) => {
      const s = doc.slug != null ? slugToPathSegment(String(doc.slug)) : "";
      if (!s) return null;
      return {
        url: `${BASE}/ekip/${encodeURIComponent(s)}`,
        lastModified: doc._updatedAt ? new Date(doc._updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return [...staticEntries, ...yaziEntries, ...haberEntries, ...ekipEntries];
}
