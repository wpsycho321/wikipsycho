"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Soru = {
  soru?: string;
  tip?: string;
  secenekler?: string[];
  zorunlu?: boolean;
};

const HARFLER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function BasvuruFormClient({
  ilanSlug,
  sorular,
}: {
  ilanSlug: string;
  sorular: Soru[];
}) {
  const router = useRouter();
  const [cevaplar, setCevaplar] = useState<Record<string, string>>({});
  const [hata, setHata] = useState("");

  const handleChange = (soru: string, cevap: string) => {
    setCevaplar((p) => ({ ...p, [soru]: cevap }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata("");
    const zorunluBos = sorular.find(
      (s) => s.zorunlu && s.tip === "secenekli" && !cevaplar[s.soru ?? ""]
    );
    if (zorunluBos) {
      setHata("Lütfen tüm zorunlu soruları cevaplayın.");
      return;
    }
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
      router.replace("/ilanlar/" + ilanSlug);
    } catch (err) {
      setHata(err instanceof Error ? err.message : "Bir hata oluştu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {hata && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 font-sans text-sm text-red-700">
          {hata}
        </div>
      )}
      {sorular.map((s, i) => (
        <div key={i} className="space-y-3">
          <label className="block font-sans text-sm text-gray-800">
            {s.soru}
            {s.zorunlu && <span className="ml-0.5 text-red-500">*</span>}
          </label>
          {s.tip === "kisa-metin" && (
            <input
              type="text"
              required={s.zorunlu}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-sans text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={cevaplar[s.soru ?? ""] ?? ""}
              onChange={(e) => handleChange(s.soru ?? "", e.target.value)}
            />
          )}
          {s.tip === "uzun-metin" && (
            <textarea
              rows={4}
              required={s.zorunlu}
              className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 font-sans text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={cevaplar[s.soru ?? ""] ?? ""}
              onChange={(e) => handleChange(s.soru ?? "", e.target.value)}
            />
          )}
          {s.tip === "secenekli" && (
            <div className="flex flex-wrap gap-2">
              {(s.secenekler ?? []).map((opt, j) => {
                const harf = HARFLER[j] ?? "";
                const secili = cevaplar[s.soru ?? ""] === opt;
                return (
                  <button
                    key={j}
                    type="button"
                    onClick={() => handleChange(s.soru ?? "", opt)}
                    className={`rounded-lg border px-4 py-2.5 font-sans text-sm transition ${
                      secili
                        ? "border-gray-800 bg-gray-800 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {harf} {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full rounded-lg bg-black px-6 py-4 font-sans text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Başvuruyu Gönder
      </button>
    </form>
  );
}
