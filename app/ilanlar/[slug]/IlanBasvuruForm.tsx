"use client";

import { useState } from "react";

type Soru = {
  soru?: string;
  tip?: string;
  secenekler?: string[];
  zorunlu?: boolean;
};

export default function IlanBasvuruForm({
  ilanSlug,
  sorular,
}: {
  ilanSlug: string;
  sorular: Soru[];
}) {
  const [cevaplar, setCevaplar] = useState<Record<string, string>>({});
  const [gonderen, setGonderen] = useState(false);
  const [hata, setHata] = useState("");

  const handleChange = (soru: string, cevap: string) => {
    setCevaplar((p) => ({ ...p, [soru]: cevap }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata("");
    const arr = Object.entries(cevaplar).map(([soru, cevap]) => ({
      soru,
      cevap,
    }));
    try {
      const res = await fetch("/api/basvuru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ilanSlug, cevaplar: arr }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Başvuru gönderilemedi");
      setGonderen(true);
    } catch (err) {
      setHata(err instanceof Error ? err.message : "Bir hata oluştu");
    }
  };

  if (gonderen) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-sans font-medium text-green-800">
          Başvurunuz başarıyla alındı.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {hata && (
        <div className="rounded border border-red-200 bg-red-50 p-3 font-sans text-sm text-red-700">
          {hata}
        </div>
      )}
      {sorular.map((s, i) => (
        <div key={i}>
          <label className="mb-2 block font-sans text-sm font-medium">
            {s.soru}
            {s.zorunlu && <span className="text-red-500"> *</span>}
          </label>
          {s.tip === "kisa-metin" && (
            <input
              type="text"
              required={s.zorunlu}
              className="w-full rounded border border-black/20 px-3 py-2 font-sans text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={cevaplar[s.soru ?? ""] ?? ""}
              onChange={(e) => handleChange(s.soru ?? "", e.target.value)}
            />
          )}
          {s.tip === "uzun-metin" && (
            <textarea
              rows={4}
              required={s.zorunlu}
              className="w-full rounded border border-black/20 px-3 py-2 font-sans text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={cevaplar[s.soru ?? ""] ?? ""}
              onChange={(e) => handleChange(s.soru ?? "", e.target.value)}
            />
          )}
          {s.tip === "secenekli" && (
            <select
              required={s.zorunlu}
              className="w-full rounded border border-black/20 px-3 py-2 font-sans text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={cevaplar[s.soru ?? ""] ?? ""}
              onChange={(e) => handleChange(s.soru ?? "", e.target.value)}
            >
              <option value="">Seçiniz</option>
              {(s.secenekler ?? []).map((opt, j) => (
                <option key={j} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="rounded bg-black px-6 py-3 font-sans text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Başvuruyu Gönder
      </button>
    </form>
  );
}
