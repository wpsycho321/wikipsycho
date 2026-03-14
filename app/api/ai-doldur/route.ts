import { NextResponse } from "next/server";

type Tur = "yazi" | "proje" | "eyayin" | "etkinlik";

const PROMPT = (hamIcerik: string, tur: Tur) => `Sen WikiPsycho psikoloji platformu için içerik editörüsün. Aşağıdaki ham içeriği analiz et ve JSON formatında döndür. Sadece JSON döndür, başka hiçbir şey yazma:

Ham içerik: ${hamIcerik}

İçerik türü: ${tur}

Döndür:
{
  "baslik": "Dikkat çekici, SEO uyumlu başlık (max 80 karakter)",
  "altBaslik": "Açıklayıcı alt başlık (max 120 karakter)",
  "ozet": "2-3 cümlelik özet",
  "kategori": "En uygun kategori",
  "metaBaslik": "SEO meta başlığı (max 60 karakter)",
  "metaAciklama": "SEO meta açıklaması (max 160 karakter)",
  "anahtarKelimeler": ["kelime1", "kelime2", "kelime3", "kelime4", "kelime5"]
}`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { hamIcerik, tur } = body;

    if (!hamIcerik || typeof hamIcerik !== "string") {
      return NextResponse.json({ error: "hamIcerik gerekli (string)" }, { status: 400 });
    }

    const validTur: Tur[] = ["yazi", "proje", "eyayin", "etkinlik"];
    if (!tur || !validTur.includes(tur)) {
      return NextResponse.json(
        { error: "tur gerekli: yazi | proje | eyayin | etkinlik" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("HATA: GEMINI_API_KEY bulunamadı. .env dosyanızı kontrol edin.");
      return NextResponse.json({ error: "API Anahtarı yapılandırılmamış" }, { status: 500 });
    }

    const prompt = PROMPT(hamIcerik, tur);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const geminiData = (await geminiResponse.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      error?: { message?: string };
    };

    if (!geminiResponse.ok) {
      console.error("Gemini API Hatası Detayı:", JSON.stringify(geminiData, null, 2));
      return NextResponse.json(
        {
          error: "Gemini API hatası verdi",
          detay: geminiData.error?.message || "Bilinmeyen hata",
        },
        { status: geminiResponse.status }
      );
    }

    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) {
      console.error("Gemini boş yanıt:", JSON.stringify(geminiData, null, 2));
      return NextResponse.json(
        { error: "Gemini yanıt üretemedi", detay: "Boş yanıt" },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(text) as Record<string, unknown>;
    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("Sistem Hatası:", error);
    return NextResponse.json(
      {
        error: "Sunucu hatası oluştu",
        detay: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 }
    );
  }
}
