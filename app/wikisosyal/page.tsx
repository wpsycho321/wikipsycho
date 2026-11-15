import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Kisiler from "./Kisiler";

// WikiSosyal tanıtım sayfası. Önce "sen kimsin?" (öğrenci / uzman / kurum), seçilene göre özellikler açılır.

const baslikYazi = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--ws-baslik", weight: ["600", "700", "800"] });
const govdeYazi = Figtree({ subsets: ["latin", "latin-ext"], variable: "--ws-govde" });

const WS = process.env.NEXT_PUBLIC_WIKISOSYAL_URL ?? "https://sosyal.wikipsycho.org.tr";
const VITRIN = WS + "/vitrin";
const KAYIT = WS + "/kayit";
const GIRIS = WS + "/giris";
const PSIKOLOGUM_OL = "https://psikologumol.wikipsycho.org.tr";

export const metadata: Metadata = {
  title: "WikiSosyal · Ruh sağlığı alanının ortak evi",
  description:
    "Psikoloji öğrencileri, alanda çalışan uzmanlar ve topluluklar/kurumlar için ücretsiz platform: öğrenci ve meslek ağı, sınıflar, uzman paneli, topluluk yönetimi, ilan ve başvurular. WikiPsycho gönüllülerinin sosyal projesi.",
  alternates: { canonical: "https://wikipsycho.org.tr/wikisosyal" },
  openGraph: {
    title: "WikiSosyal · Ruh sağlığı alanının ortak evi",
    description: "Öğrenciler, uzmanlar ve topluluklar için ücretsiz platform. Reklamsız, bir sosyal proje.",
    url: "https://wikipsycho.org.tr/wikisosyal",
    siteName: "WikiPsycho",
    locale: "tr_TR",
    type: "website",
  },
};

export default function WikiSosyal() {
  return (
    <main className={`${baslikYazi.variable} ${govdeYazi.variable} ws-sayfa bg-white text-[#1E1B33]`}>
      <style>{`
        .ws-sayfa { font-family: var(--ws-govde), system-ui, sans-serif; }
        .ws-sayfa h1, .ws-sayfa h2, .ws-sayfa .font-bold { font-family: var(--ws-baslik), var(--ws-govde), sans-serif; }
        .noktalar { background-image: radial-gradient(#D6D1E6 1.2px, transparent 1.2px); background-size: 18px 18px; }
        .noktalar-koyu { background-image: radial-gradient(#34304F 1.2px, transparent 1.2px); background-size: 18px 18px; }
      `}</style>
{/* GİRİŞ */}
<section className="relative overflow-hidden">
  <div className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full border border-[#E6E2EE]"></div>
  <div className="absolute -right-6 top-24 w-[220px] h-[220px] rounded-full border border-dashed border-[#5B47C8]/40"></div>
  <div className="absolute left-0 bottom-0 w-72 h-40 noktalar opacity-70"></div>
  <div className="relative max-w-6xl mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-16 grid md:grid-cols-[1.05fr_1fr] gap-12 items-center">
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] uppercase"><span className="w-8 h-px bg-[#5B47C8]"></span>WikiSosyal · Yayında</div>
      <h1 className="text-[44px] md:text-[54px] lg:text-[64px] leading-[0.98] font-bold tracking-tight"><span className="lg:whitespace-nowrap">Ruh sağlığı alanının</span><br />ortak evi<span className="text-[#5B47C8]">.</span></h1>
      <p className="text-[17px] md:text-[19px] leading-relaxed text-[#5E5B70] max-w-[36ch]">Öğrenciler, alanda çalışan uzmanlar ve topluluklar/kurumlar tek yerde: ağ, sınıflar, uzman paneli, topluluk yönetimi, ilanlar. <b className="text-black">Ücretsiz, reklamsız.</b></p>
      <div className="flex flex-wrap gap-3 pt-1">
        <a href="#sen-kimsin" className="h-12 px-6 rounded-full bg-[#1E1B33] text-white font-semibold flex items-center hover:bg-[#5B47C8] transition-colors">Sana neler sunuyor? ↓</a>
        <a href={KAYIT} className="h-12 px-6 rounded-full border border-[#1E1B33] font-semibold flex items-center hover:bg-[#F6F5FA] transition-colors">Hemen katıl</a>
      </div>
      <div className="text-[12px] text-[#6E6B80]">Önce bakmak mı istiyorsun? <a href={VITRIN} className="font-semibold underline underline-offset-2">Kayıt olmadan örnek paneli gez</a>.</div>
    </div>
    {/* Panel çizimi */}
    <div className="relative">
      <div className="absolute -inset-4 rounded-[32px] bg-[#F6F5FA]"></div>
      <div className="relative bg-white rounded-[22px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden border border-[#E6E2EE]">
        <div className="flex">
          <div className="w-14 bg-[#1E1B33] flex flex-col items-center gap-3 py-4"><div className="w-8 h-8 rounded-[10px] bg-[#5B47C8]"></div><div className="w-8 h-8 rounded-full bg-white/15"></div><div className="w-8 h-8 rounded-full bg-white/15"></div></div>
          <div className="flex-1 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2"><div className="font-bold text-[15px]">Akademi birimi</div><div className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[#F6F5FA] font-semibold">12 görev</div></div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="flex flex-col gap-1.5"><div className="font-bold text-[#6E6B80] uppercase tracking-wider">Atandı</div><div className="rounded-[8px] border border-[#E6E2EE] p-2">Literatür taraması<div className="mt-1 h-1 rounded bg-[#5B47C8] w-2/3"></div></div><div className="rounded-[8px] border border-[#E6E2EE] p-2">Katılımcı çağrısı</div></div>
              <div className="flex flex-col gap-1.5"><div className="font-bold text-[#6E6B80] uppercase tracking-wider">Devam</div><div className="rounded-[8px] border border-[#E6E2EE] p-2">Anket maddeleri</div><div className="rounded-[8px] border border-[#E6E2EE] p-2">Etik kurul formu</div></div>
              <div className="flex flex-col gap-1.5"><div className="font-bold text-[#6E6B80] uppercase tracking-wider">Bitti</div><div className="rounded-[8px] bg-[#F6F5FA] p-2 line-through text-[#6E6B80]">Okuma notları</div></div>
            </div>
            <div className="rounded-[10px] bg-[#1E1B33] text-white p-3 text-[11px] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#5B47C8]"></span>Perşembe 19:00 · Genel toplantı · 8 kişi katılıyor</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* 01 SEN KİMSİN */}
<section id="sen-kimsin" className="relative border-t border-[#E6E2EE] scroll-mt-20">
  <div className="absolute -left-20 top-40 w-64 h-64 rounded-full border border-[#E6E2EE]"></div>
  <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24 flex flex-col gap-10">
    <div className="flex flex-col gap-3 max-w-2xl">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] uppercase text-[#6E6B80]"><span className="text-[#5B47C8]">01</span><span className="w-8 h-px bg-neutral-300"></span>Sen kimsin?</div>
      <h2 className="text-[34px] md:text-[48px] leading-[1.02] font-bold tracking-tight">Herkes için ayrı bir alan, hepsi aynı evde.</h2>
      <p className="text-[16px] text-[#5E5B70]">Kendini seç; WikiSosyal&apos;in sana neler sunduğunu görelim.</p>
    </div>
    <Kisiler />
  </div>
</section>

{/* 02 PSİKOLOĞUM OL */}
<section className="bg-[#E4F4EE] relative overflow-hidden">
  <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border border-[#D6D1E6]"></div>
  <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] uppercase text-[#6E6B80]"><span className="text-[#13835F]">02</span><span className="w-8 h-px bg-neutral-400"></span>Danışanlar için de</div>
      <h2 className="text-[34px] md:text-[48px] leading-[1.02] font-bold tracking-tight">Psikoloğum Ol: doğrulanmış uzmanla randevu.</h2>
      <p className="text-[16px] text-[#5E5B70] max-w-md">Danışanlar üye olmadan uzmanları inceler, uygun saati seçer, randevu talebi bırakır. Uzmanlar her şeyi WikiSosyal Uzman panelinden yönetir.</p>
      <div className="flex flex-wrap gap-3 pt-2">
        <a href={PSIKOLOGUM_OL} className="h-12 px-6 rounded-full bg-[#1E1B33] text-white font-semibold flex items-center hover:bg-[#13835F] transition-colors">Psikolog bul →</a>
        <a href={PSIKOLOGUM_OL + "/uzmanlar"} className="h-12 px-6 rounded-full border border-[#1E1B33] font-semibold flex items-center hover:bg-white transition-colors">Uzman olarak yer al</a>
      </div>
    </div>
    <div className="bg-white rounded-[22px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#C9B8FF]"></div>
        <div><div className="font-bold">Psk. Ayşe Yılmaz <span className="text-[#13835F]">✓</span></div><div className="text-[12px] text-[#6E6B80]">Online · İstanbul, Kadıköy</div></div>
      </div>
      <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
        <div className="font-bold">Bugün</div><div className="font-bold">Yarın</div><div className="font-bold">Çar</div><div className="font-bold">Per</div>
        <div className="rounded-[10px] bg-[#BDEBD5] py-2 font-bold">16:40</div><div className="py-2 text-[#B5B3AE]">–</div><div className="rounded-[10px] bg-[#1E1B33] text-white py-2 font-bold">13:50</div><div className="rounded-[10px] bg-[#BDEBD5] py-2 font-bold">10:00</div>
        <div className="rounded-[10px] bg-[#BDEBD5] py-2 font-bold">17:30</div><div className="py-2"></div><div className="rounded-[10px] bg-[#BDEBD5] py-2 font-bold">14:40</div><div className="rounded-[10px] bg-[#BDEBD5] py-2 font-bold">11:00</div>
      </div>
      <div className="rounded-[12px] bg-[#1E1B33] text-white p-3 text-[12px]">Randevu talebi gönderildi · uzman onayı bekleniyor</div>
    </div>
  </div>
</section>

{/* 03 YAPAY ZEKA */}
<section className="bg-[#1E1B33] text-white relative overflow-hidden">
  <div className="absolute inset-y-0 right-0 w-1/2 noktalar-koyu"></div>
  <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] uppercase text-white/50"><span className="text-[#5B47C8]">03</span><span className="w-8 h-px bg-white/30"></span>Yapay zekânla</div>
      <h2 className="text-[34px] md:text-[48px] leading-[1.02] font-bold tracking-tight">Claude’una ya da ChatGPT’ne bağla.</h2>
      <p className="text-[16px] text-white/70 max-w-md">Görevlerini özetlesin, birimine görev açsın, harcamanı bütçene yazsın. Senin yetkinle, senin aboneliğinle; bize ödeme yok.</p>
    </div>
    <div className="flex flex-col gap-3 text-[14px]">
      <div className="self-end max-w-[80%] rounded-[18px] rounded-br-[6px] bg-[#5B47C8] px-4 py-3">Bu hafta Akademi’de neler bekliyor?</div>
      <div className="self-start max-w-[85%] rounded-[18px] rounded-bl-[6px] bg-white/10 border border-white/15 px-4 py-3">3 açık görev var; “Literatür taraması” perşembe bitiyor. Perşembe 19:00’da genel toplantı var. Hatırlatma ekleyeyim mi?</div>
    </div>
  </div>
</section>

{/* 04 NEDEN ÜCRETSİZ */}
<section className="relative">
  <div className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24 grid md:grid-cols-[1fr_1.1fr] gap-10">
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] uppercase text-[#6E6B80]"><span className="text-[#D2691E]">04</span><span className="w-8 h-px bg-neutral-300"></span>Neden ücretsiz?</div>
      <h2 className="text-[34px] md:text-[48px] leading-[1.02] font-bold tracking-tight">Bir şirket değil, bir sosyal proje.</h2>
      <p className="text-[16px] text-[#5E5B70] max-w-md">WikiSosyal’i WikiPsycho’nun gönüllüleri kendi ekiplerini yönetmek için yaptı. Şimdi bütün psikoloji öğrencilerine, alanda çalışanlara, topluluklara ve kurumlara açık.</p>
    </div>
    <div className="grid sm:grid-cols-3 gap-3 self-end">
      <div className="rounded-[18px] border border-[#E6E2EE] p-5"><div className="w-10 h-10 rounded-full bg-[#FCEEE3] mb-3"></div><div className="font-bold">Reklam yok</div><div className="text-[13px] text-[#5E5B70]">Akışında satış yok.</div></div>
      <div className="rounded-[18px] border border-[#E6E2EE] p-5"><div className="w-10 h-10 rounded-full bg-[#FCEEE3] mb-3"></div><div className="font-bold">Verin satılmaz</div><div className="text-[13px] text-[#5E5B70]">Kimseyle paylaşılmaz.</div></div>
      <div className="rounded-[18px] bg-[#1E1B33] text-white p-5"><div className="w-10 h-10 rounded-full border border-[#D2691E] mb-3"></div><div className="font-bold">Kişisel alan sana ait</div><div className="text-[13px] text-white/70">Takvimini, bütçeni biz de göremeyiz.</div></div>
    </div>
  </div>
</section>

{/* 05 NASIL BAŞLARSIN */}
<section className="bg-[#F6F5FA] relative overflow-hidden">
  <div className="absolute right-10 -bottom-24 w-72 h-72 rounded-full border border-dashed border-[#5B47C8]/40"></div>
  <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24 flex flex-col gap-10">
    <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] uppercase text-[#6E6B80]"><span className="text-[#5B47C8]">05</span><span className="w-8 h-px bg-neutral-400"></span>Nasıl başlarsın</div>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="flex flex-col gap-2"><div className="text-[56px] font-bold leading-none text-[#5B47C8]">1</div><div className="font-bold text-[18px]">Hesabını aç</div><div className="text-[14px] text-[#5E5B70]">Öğrenci misin, mezun ya da uzman mı? Profilinde seç; ağın ona göre açılır.</div></div>
      <div className="flex flex-col gap-2"><div className="text-[56px] font-bold leading-none">2</div><div className="font-bold text-[18px]">Profilini kur</div><div className="text-[14px] text-[#5E5B70]">CV&apos;ni yükle, yapay zekâ profilini doldursun. Uzmansan doğrulamanı başlat.</div></div>
      <div className="flex flex-col gap-2"><div className="text-[56px] font-bold leading-none">3</div><div className="font-bold text-[18px]">Topluluğunu ya da kurumunu ekle</div><div className="text-[14px] text-[#5E5B70]">Topluluk ya da kurum sayfası için başvur; WikiPsycho ekibi inceler, sihirbazla kurarsın.</div></div>
    </div>
    <div className="bg-white rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row gap-5 md:items-center shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <div className="flex-1"><div className="font-bold text-[22px]">WikiSosyal yayında</div><div className="text-[14px] text-[#5E5B70]">Web&apos;den ya da iPhone uygulamasından kullanabilirsin. Ücretsiz, reklamsız.</div></div>
      <div className="flex flex-wrap gap-3">
        <a href={KAYIT} className="h-12 px-6 rounded-full bg-[#1E1B33] text-white font-semibold flex items-center hover:bg-[#5B47C8] transition-colors">Hemen katıl</a>
        <a href={GIRIS} className="h-12 px-6 rounded-full border border-[#1E1B33] font-semibold flex items-center hover:bg-[#F6F5FA] transition-colors">Giriş yap</a>
      </div>
    </div>
  </div>
</section>
<div className="max-w-6xl mx-auto px-5 md:px-10 py-8 text-[12px] text-[#6E6B80] flex flex-wrap gap-2 justify-between"><span>WikiSosyal, WikiPsycho gönüllülerinin sosyal projesidir.</span><span>KVKK · İletişim</span></div>

    </main>
  );
}
