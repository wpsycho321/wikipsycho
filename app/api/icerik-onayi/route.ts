import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM ?? "onay@wikipsycho.org.tr";

type Body = {
  icerikTuru: string;
  baslik: string;
  sanityId: string;
  gonderecelikKisi: string;
  birimLideriMail: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const {
      icerikTuru,
      baslik,
      sanityId,
      gonderecelikKisi,
      birimLideriMail,
    } = body;

    if (
      !icerikTuru ||
      !baslik ||
      !sanityId ||
      !gonderecelikKisi ||
      !birimLideriMail
    ) {
      return NextResponse.json(
        {
          error:
            "Eksik alan: icerikTuru, baslik, sanityId, gonderecelikKisi, birimLideriMail gerekli",
        },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY tanımlı değil" },
        { status: 500 }
      );
    }

    const studioLink = `https://wikipsycho-hst.vercel.app/studio/structure/${icerikTuru};${sanityId}`;

    const html = `
      <h2>Onay Bekleyen İçerik</h2>
      <p><strong>İçerik türü:</strong> ${icerikTuru}</p>
      <p><strong>Başlık:</strong> ${baslik}</p>
      <p><strong>Gönderen:</strong> ${gonderecelikKisi}</p>
      <p><strong>Sanity Studio linki:</strong> <a href="${studioLink}">${studioLink}</a></p>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: birimLideriMail,
      subject: `[WikiPsycho] Onay Bekleyen İçerik: ${baslik}`,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Beklenmeyen hata" },
      { status: 500 }
    );
  }
}
