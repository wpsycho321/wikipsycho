import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const EPOSTA = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** WikiSosyal "açılınca haber ver" listesi: e-postalar Studio'da "WikiSosyal bekleyenler" altında görünür. */
export async function POST(request: Request) {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) return NextResponse.json({ error: "yapilandirma" }, { status: 500 });
  const { eposta } = (await request.json().catch(() => ({}))) as { eposta?: string };
  const e = String(eposta ?? "").trim().toLowerCase().slice(0, 200);
  if (!EPOSTA.test(e)) return NextResponse.json({ error: "gecersiz" }, { status: 400 });
  const client = createClient({ projectId: projectId!, dataset: dataset!, apiVersion, token, useCdn: false });
  // Aynı adres ikinci kez yazılmaz (belge kimliği adresten türetilir)
  const id = "wsb-" + Buffer.from(e).toString("base64url").slice(0, 100);
  await client.createIfNotExists({ _id: id, _type: "wikisosyalBekleyen", eposta: e, tarih: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
