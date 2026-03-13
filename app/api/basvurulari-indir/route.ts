import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { client } from "@/lib/sanity";

export async function GET(request: NextRequest) {
  const ilanSlug = request.nextUrl.searchParams.get("ilanSlug");
  if (!ilanSlug) {
    return NextResponse.json(
      { error: "ilanSlug parametresi gerekli" },
      { status: 400 }
    );
  }

  const ilan = await client
    .fetch<{ _id: string; sorular?: { soru?: string }[] } | null>(
      `*[_type == "ilan" && slug.current == $slug][0]{ _id, sorular }`,
      { slug: ilanSlug }
    )
    .catch(() => null);

  if (!ilan?._id) {
    return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
  }

  const basvurular = await client
    .fetch<
      { _id: string; tarih?: string; cevaplar?: { soru?: string; cevap?: string }[] }[]
    >(`*[_type == "basvuru" && references($ilanId)] | order(tarih asc) {
      _id, tarih, cevaplar
    }`, { ilanId: ilan._id })
    .catch(() => []);

  const soruBasliklari = [
    "Tarih",
    ...(ilan.sorular ?? []).map((s) => s.soru ?? "Soru"),
  ];

  const rows = basvurular.map((b) => {
    const cevapMap: Record<string, string> = {};
    (b.cevaplar ?? []).forEach((c) => {
      if (c.soru) cevapMap[c.soru] = c.cevap ?? "";
    });
    const tarihStr = b.tarih
      ? new Date(b.tarih).toLocaleString("tr-TR")
      : "";
    const row: string[] = [tarihStr];
    (ilan.sorular ?? []).forEach((s) => {
      row.push(cevapMap[s.soru ?? ""] ?? "");
    });
    return row;
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([soruBasliklari, ...rows]);
  XLSX.utils.book_append_sheet(wb, ws, "Başvurular");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buf, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="basvurular-${ilanSlug}.xlsx"`,
    },
  });
}
