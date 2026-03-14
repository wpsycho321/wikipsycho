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

export async function POST(request: Request) {
  console.log("ALL ENV KEYS:", Object.keys(process.env).filter((k) => k.includes("GEMINI")));
  console.log("GEMINI KEY VALUE:", process.env.GEMINI_API_KEY);
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY tanımlı değil" },
      { status: 500 }
    );
  }

  let body: { hamIcerik?: string; tur?: Tur };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Geçersiz JSON gövdesi" },
      { status: 400 }
    );
  }

  const { hamIcerik, tur } = body;
  if (!hamIcerik || typeof hamIcerik !== "string") {
    return NextResponse.json(
      { error: "hamIcerik gerekli (string)" },
      { status: 400 }
    );
  }

  const validTur: Tur[] = ["yazi", "proje", "eyayin", "etkinlik"];
  if (!tur || !validTur.includes(tur)) {
    return NextResponse.json(
      { error: "tur gerekli: yazi | proje | eyayin | etkinlik" },
      { status: 400 }
    );
  }

  const prompt = PROMPT(hamIcerik, tur);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Gemini API error:", res.status, err);
      return NextResponse.json(
        { error: `Gemini API hatası: ${res.status}` },
        { status: 502 }
      );
    }

    const data = (await res.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) {
      return NextResponse.json(
        { error: "Gemini boş yanıt döndü" },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(text) as Record<string, unknown>;
    return NextResponse.json(parsed);
  } catch (e) {
    console.error("ai-doldur error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "İşlem başarısız" },
      { status: 500 }
    );
  }
}
