import { NextResponse } from "next/server";
import { sendIcerikOnayEmail } from "@/lib/send-icerik-onay-email";

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

    const { data, error } = await sendIcerikOnayEmail({
      icerikTuru,
      baslik,
      sanityId,
      gonderecelikKisi,
      birimLideriMail,
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
