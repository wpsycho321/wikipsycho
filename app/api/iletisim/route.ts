import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tip, ...alanlar } = body as {
    tip: "genel" | "katil" | "isbirligi";
    [key: string]: string;
  };

  const konular = {
    genel: "WikiPsycho | Yeni Mesaj",
    katil: "WikiPsycho | Katılım Başvurusu",
    isbirligi: "WikiPsycho | İş Birliği Talebi",
  } as const;

  const icerikler = {
    genel: `
      <h2>Yeni Mesaj</h2>
      <p><strong>İsim:</strong> ${alanlar.isim}</p>
      <p><strong>E-posta:</strong> ${alanlar.eposta}</p>
      <p><strong>Mesaj:</strong></p>
      <p>${alanlar.mesaj}</p>
    `,
    katil: `
      <h2>Yeni Katılım Başvurusu</h2>
      <p><strong>İsim:</strong> ${alanlar.isim}</p>
      <p><strong>E-posta:</strong> ${alanlar.eposta}</p>
      <p><strong>Üniversite / Bölüm:</strong> ${alanlar.universite}</p>
      <p><strong>Fikir / Motivasyon:</strong></p>
      <p>${alanlar.fikir}</p>
    `,
    isbirligi: `
      <h2>Yeni İş Birliği Talebi</h2>
      <p><strong>İsim / Kurum:</strong> ${alanlar.isim}</p>
      <p><strong>E-posta:</strong> ${alanlar.eposta}</p>
      <p><strong>Kurum / Pozisyon:</strong> ${alanlar.kurum}</p>
      <p><strong>Teklif / Mesaj:</strong></p>
      <p>${alanlar.mesaj}</p>
    `,
  } as const;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!process.env.RESEND_API_KEY || !process.env.ILETISIM_MAIL) {
      throw new Error("Missing RESEND_API_KEY or ILETISIM_MAIL");
    }

    await resend.emails.send({
      from: "WikiPsycho <onboarding@resend.dev>",
      to: process.env.ILETISIM_MAIL!,
      subject: konular[tip],
      html: icerikler[tip],
    });

    return NextResponse.json({ basarili: true });
  } catch {
    return NextResponse.json({ basarili: false }, { status: 500 });
  }
}

