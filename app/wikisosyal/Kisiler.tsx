"use client";

import { useState } from "react";

// "Sen kimsin?" — üç büyük kart; seçilene göre WikiSosyal'in o kişiye sunduğu özellikler açılır.
// Kartlar WikiSosyal panelinin pastelleri; altındaki ızgara sayfanın kendi çizgisel dili.

type Ozellik = { simge: string; baslik: string; metin: string; koyu?: boolean };
type Kisi = { id: string; etiket: string; baslik: string; alt: string; zemin: string; vurgu: string; giris: string; ozellikler: Ozellik[]; serit: [string, string] };

const KISILER: Kisi[] = [
  {
    id: "ogrenci",
    etiket: "Öğrenciyim",
    baslik: "Psikoloji, PDR ya da ilgili bir bölümde okuyorum",
    alt: "Öğrenci ağı, sınıflar, staj ve fırsatlar",
    zemin: "#C9B8FF",
    vurgu: "#5B47C8",
    giris: "Bölümünden, başka üniversitelerden öğrencilerle aynı yerde ol; fırsatları kaçırma, derslerini ve işlerini tek yerden yürüt.",
    ozellikler: [
      { simge: "◎", baslik: "Öğrenci ağı ve akış", metin: "Soru sor, kaynak paylaş, tartış. Öğrenci Ağı ile Meslek Ağı ayrı akar; kendi çevrende kalırsın." },
      { simge: "✎", baslik: "Sınıflar", metin: "Hocanın açtığı sınıfa kodla katıl: ödevler, ders rafı, duyurular ve grup çalışmaları bir arada." },
      { simge: "↗", baslik: "Staj ve iş ilanları", metin: "Topluluk ve kurumların ilanlarına özgeçmişinle tek dokunuşla başvur, durumunu takip et." },
      { simge: "◷", baslik: "Buluşmalar", metin: "Okuma grupları, atölyeler, yakınındaki etkinlikler; katıl ya da kendin düzenle." },
      { simge: "◧", baslik: "Gruplar ve topluluklar", metin: "Araştırma ekibini WhatsApp yerine buradan yönet: sohbet, görev, takvim ve kararlar." },
      { simge: "₺", baslik: "Takvim, alışkanlık, bütçe", metin: "Ders programın, zinciri kırma alışkanlıkların ve harcamaların. Yalnız sen görürsün.", koyu: true },
    ],
    serit: ["Özgeçmiş", "Yapay zekâ CV'ni okur, profilini dakikalar içinde doldurur."],
  },
  {
    id: "uzman",
    etiket: "Mezunum / uzmanım",
    baslik: "Alanda çalışıyorum: psikolog, PDR, psikiyatrist, sosyal hizmet…",
    alt: "Meslek ağı, uzman paneli, danışanlar",
    zemin: "#BDEBD5",
    vurgu: "#13835F",
    giris: "Meslektaşlarınla bağlantıda kal, danışan işlerini düzenle, yeni danışanlar seni bulsun.",
    ozellikler: [
      { simge: "◎", baslik: "Meslek ağı", metin: "Vaka dışı mesleki tartışmalar, kaynaklar, süpervizyon ve iş birliği arayışları." },
      { simge: "▤", baslik: "Uzman paneli", metin: "Danışan kartları, seans takvimi, notlar, tahsilat ve gelir raporu tek ekranda." },
      { simge: "♡", baslik: "Psikoloğum Ol", metin: "Doktor takvimi gibi herkese açık profil: danışan saatini seçer, onayladığın randevu takvimine düşer." },
      { simge: "⇄", baslik: "Süpervizyon", metin: "Süpervizör bul ya da süpervizyon ver; görüşmeleri ve notları düzenli tut." },
      { simge: "↗", baslik: "İlanlar ve araştırmalar", metin: "İş, staj ve araştırma çağrılarını gör; kendi çağrını paylaş, katılımcı bul." },
      { simge: "✓", baslik: "Doğrulanmış uzman rozeti", metin: "Diploma ve unvan kontrolünden geçenler rozet alır; danışanlar ve meslektaşlar bunu görür.", koyu: true },
    ],
    serit: ["Beta", "Psikoloğum Ol randevu sistemi beta sürecinde uzmanlara ücretsiz."],
  },
  {
    id: "kurum",
    etiket: "Kurumum / topluluğum var",
    baslik: "Bir topluluk, kulüp, dernek, klinik, okul ya da şirket yönetiyorum",
    alt: "Topluluk paneli, kurum sayfası, ilan ve başvurular",
    zemin: "#FFD3B0",
    vurgu: "#D2691E",
    giris: "Ekibinin işini tek yerden yürüt; dışarıya da sayfanla, ilanlarınla ve paylaşımlarınla görün.",
    ozellikler: [
      { simge: "✓", baslik: "Birim odaları ve görev panosu", metin: "Her birimin kendi akışı, görevleri, takvimi. Görev atanır, kontrol edilir, tamamlanır." },
      { simge: "◷", baslik: "Toplantı, yoklama, çalıştay", metin: "Meet bağlantısı kendiliğinden açılır, devam tutulur; çalıştaylarda odalar ve raporlar." },
      { simge: "◫", baslik: "Kurum ve topluluk sayfası", metin: "Logon, tanıtımın, ekibin, takipçilerin. Paylaşımları sayfa adına yap; ekibine editörlük ver." },
      { simge: "↗", baslik: "İlan ve başvuru kutusu", metin: "Staj ya da iş ilanı aç; başvuranların profili ve özgeçmişi panelindeki kutuya düşer." },
      { simge: "📣", baslik: "Duyurular ve mali panel", metin: "Bütün ekibe tek tıkla duyuru; gelir-gider, aidat ve bütçe. İstemediğin bölümü kapatırsın." },
      { simge: "◎", baslik: "Kim neyi görür, sen seçersin", metin: "Bölümleri aç-kapa, roller oluştur: görmez, görür, yönetir.", koyu: true },
    ],
    serit: ["5 dk", "Kurulum sihirbazı birimlerini, rollerini ve ekibini adım adım kurar."],
  },
];

export default function Kisiler() {
  const [secili, setSecili] = useState<string>("ogrenci");
  const k = KISILER.find((x) => x.id === secili)!;
  return (
    <div className="flex flex-col gap-10">
      <div className="grid md:grid-cols-3 gap-3">
        {KISILER.map((x) => {
          const acik = x.id === secili;
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => setSecili(x.id)}
              aria-pressed={acik}
              className={`text-left rounded-[26px] p-6 md:p-7 flex flex-col gap-3 min-h-[190px] transition-all duration-300 text-[#1E1B33] ${
                acik ? "shadow-[0_20px_50px_-20px_rgba(30,27,51,0.45)] -translate-y-1 ring-2 ring-[#1E1B33]" : "opacity-80 hover:opacity-100 hover:-translate-y-0.5"
              }`}
              style={{ background: x.zemin }}
            >
              <span className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-70">{x.alt}</span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[15px] font-bold ${acik ? "bg-[#1E1B33] text-white" : "bg-white/60"}`}>
                  {acik ? "✓" : "→"}
                </span>
              </span>
              <span className="font-bold text-[30px] md:text-[34px] leading-[1] tracking-tight mt-auto">{x.etiket}</span>
              <span className="text-[14px] leading-snug opacity-80">{x.baslik}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-[18px] md:text-[21px] leading-relaxed text-[#5E5B70] max-w-3xl">
          <span className="font-bold text-[#1E1B33]">{k.etiket}: </span>
          {k.giris}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E6E2EE] rounded-[22px] overflow-hidden border border-[#E6E2EE]">
          {k.ozellikler.map((o) => (
            <div key={o.baslik} className={`${o.koyu ? "bg-[#1E1B33] text-white" : "bg-white"} p-6 flex flex-col gap-2`}>
              <div
                className="w-9 h-9 rounded-full border flex items-center justify-center text-[13px] font-bold"
                style={o.koyu ? { borderColor: k.vurgu, color: k.vurgu } : { borderColor: "#1E1B33" }}
              >
                {o.simge}
              </div>
              <div className="font-bold text-[18px]">{o.baslik}</div>
              <p className={`text-[14px] ${o.koyu ? "text-white/70" : "text-[#5E5B70]"}`}>{o.metin}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 rounded-[22px] px-6 py-5 relative overflow-hidden" style={{ background: k.zemin + "55" }}>
          <div className="absolute right-0 top-0 bottom-0 w-48 noktalar"></div>
          <div className="text-[28px] font-bold" style={{ color: k.vurgu }}>{k.serit[0]}</div>
          <div className="text-[15px] max-w-md relative">{k.serit[1]}</div>
        </div>
      </div>
    </div>
  );
}
