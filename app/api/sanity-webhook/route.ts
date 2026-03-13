import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { sendIcerikOnayEmail } from "@/lib/send-icerik-onay-email";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const BIRIM_LIDERI_MAIL = "wpsycho321@gmail.com";

function createSanityClient() {
  return createClient({
    projectId: projectId!,
    dataset: dataset!,
    apiVersion,
    useCdn: false,
  });
}

type WebhookPayload = {
  _id?: string;
  _type?: string;
  baslik?: string;
  durum?: string;
  yazarIsim?: string;
  yazar?: { isim?: string };
};

export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "SANITY_WEBHOOK_SECRET tanımlı değil" },
      { status: 500 }
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature) {
    return NextResponse.json({ error: "İmza header eksik" }, { status: 401 });
  }

  const valid = await isValidSignature(rawBody, signature, secret);
  if (!valid) {
    return NextResponse.json({ error: "Geçersiz imza" }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }

  const documentId =
    payload._id ?? request.headers.get("sanity-document-id");
  const docType = payload._type ?? "yazi";

  let baslik = payload.baslik;
  let durum = payload.durum;
  let gonderecelikKisi =
    payload.yazarIsim ?? payload.yazar?.isim ?? "Bilinmiyor";

  if (!documentId) {
    return NextResponse.json(
      { error: "Belge ID bulunamadı" },
      { status: 400 }
    );
  }

  if (!baslik || !durum) {
    const client = createSanityClient();
    const doc = await client.fetch<
      {
        baslik?: string;
        durum?: string;
        yazarIsim?: string;
        yazar?: { isim?: string };
      } | null
    >(
      `*[_id == $id][0]{ baslik, durum, "yazarIsim": yazar->isim }`,
      { id: documentId }
    );
    if (!doc) {
      return NextResponse.json(
        { error: "Belge bulunamadı" },
        { status: 404 }
      );
    }
    baslik ??= doc.baslik;
    durum ??= doc.durum;
    gonderecelikKisi = doc.yazarIsim ?? gonderecelikKisi;
  }

  if (durum !== "onayda") {
    return NextResponse.json({ ok: true, skipped: "durum onayda değil" });
  }

  if (!baslik) {
    return NextResponse.json(
      { error: "Başlık bulunamadı" },
      { status: 400 }
    );
  }

  try {
    await sendIcerikOnayEmail({
      icerikTuru: docType,
      baslik,
      sanityId: documentId,
      gonderecelikKisi,
      birimLideriMail: BIRIM_LIDERI_MAIL,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "E-posta gönderilemedi" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
