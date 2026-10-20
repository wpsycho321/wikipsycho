"use client";

import { useState } from "react";

/** "Açılınca haber verelim" e-posta kutusu */
export default function HaberVer() {
  const [eposta, setEposta] = useState("");
  const [onay, setOnay] = useState(false);
  const [durum, setDurum] = useState<"" | "gonderiliyor" | "tamam" | "hata">("");

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    if (!onay) return;
    setDurum("gonderiliyor");
    try {
      const r = await fetch("/api/wikisosyal-haber", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eposta }) });
      setDurum(r.ok ? "tamam" : "hata");
    } catch {
      setDurum("hata");
    }
  }

  if (durum === "tamam") return <div className="text-[15px] font-semibold text-[#13835F]">Teşekkürler! WikiSosyal açıldığında sana haber vereceğiz.</div>;

  return (
    <form onSubmit={gonder} className="flex flex-col gap-2 w-full md:w-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={eposta}
          onChange={(e) => setEposta(e.target.value)}
          placeholder="e-posta adresin"
          className="h-12 min-w-0 sm:flex-1 md:w-72 rounded-full border border-[#D6D1E6] px-5 outline-none focus:border-[#5B47C8]"
        />
        <button disabled={durum === "gonderiliyor" || !onay} className="h-12 px-6 rounded-full bg-[#1E1B33] text-white font-semibold disabled:opacity-50">
          {durum === "gonderiliyor" ? "Gönderiliyor..." : "Haber ver"}
        </button>
      </div>
      <label className="flex gap-2 items-start text-[12px] text-[#6E6B80] max-w-sm">
        <input type="checkbox" checked={onay} onChange={(e) => setOnay(e.target.checked)} className="mt-0.5 accent-[#5B47C8]" />
        <span>E-postamın yalnız WikiSosyal’in açılış duyurusu için saklanmasını kabul ediyorum. İstediğimde silinmesini isteyebilirim.</span>
      </label>
      {durum === "hata" && <div className="text-[13px] text-[#C0392B]">Kaydedilemedi, biraz sonra tekrar dener misin?</div>}
    </form>
  );
}
