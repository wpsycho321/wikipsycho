import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

type Body = {
  ilanSlug: string;
  cevaplar: { soru: string; cevap: string; dosyaUrl?: string }[];
};

export async function POST(request: Request) {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "SANITY_API_TOKEN tanımlı değil" },
      { status: 500 }
    );
  }

  try {
    const client = createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion,
      token,
      useCdn: false,
    });

    const body = (await request.json()) as Body;
    const { ilanSlug, cevaplar } = body;

    if (!ilanSlug || !Array.isArray(cevaplar)) {
      return NextResponse.json(
        { error: "ilanSlug ve cevaplar gerekli" },
        { status: 400 }
      );
    }

    const ilan = await client.fetch<{ _id: string } | null>(
      `*[_type == "ilan" && slug.current == $slug][0]{ _id }`,
      { slug: ilanSlug }
    );
    const ilanId = ilan?._id;

    if (!ilanId) {
      return NextResponse.json(
        { error: "İlan bulunamadı" },
        { status: 404 }
      );
    }

    const doc = {
      _type: "basvuru",
      ilan: { _type: "reference", _ref: ilanId },
      tarih: new Date().toISOString(),
      cevaplar: cevaplar.map((c) => ({
        _key: Math.random().toString(36).slice(2),
        soru: c.soru,
        cevap: c.dosyaUrl ? c.dosyaUrl : c.cevap,
      })),
    };

    await client.create(doc);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Beklenmeyen hata" },
      { status: 500 }
    );
  }
}
