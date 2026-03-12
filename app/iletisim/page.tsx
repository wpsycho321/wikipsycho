"use client";

import { useState } from "react";

type Sekme = "genel" | "katil" | "isbirligi";

export default function IletisimPage() {
  const [aktifSekme, setAktifSekme] = useState<Sekme>("genel");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [gonderildi, setGonderildi] = useState(false);

  const [genelForm, setGenelForm] = useState({
    isim: "",
    eposta: "",
    mesaj: "",
  });
  const [katilForm, setKatilForm] = useState({
    isim: "",
    eposta: "",
    universite: "",
    fikir: "",
  });
  const [isbForm, setIsbForm] = useState({
    isim: "",
    eposta: "",
    kurum: "",
    mesaj: "",
  });

  const gonder = async (tip: Sekme, data: object) => {
    setYukleniyor(true);
    try {
      await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip, ...data }),
      });
      setGonderildi(true);
    } catch {
      alert("Bir hata oluştu, tekrar deneyin.");
    } finally {
      setYukleniyor(false);
    }
  };

  const inputClass =
    "w-full border-b border-gray-200 bg-transparent py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-black focus:outline-none transition-colors";
  const labelClass =
    "mb-2 block text-xs uppercase tracking-[0.2em] text-gray-400";

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="px-12 pb-6 pt-16">
        <h1 className="font-playfair text-6xl font-bold leading-none tracking-tight md:text-8xl">
          İletişim
        </h1>
        <div className="mt-6 h-1 bg-black" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-12 py-12 lg:grid-cols-2">
        {/* SOL — Formlar */}
        <div>
          {/* SEKMELER */}
          <div className="mb-10 flex gap-8 border-b border-gray-100">
            {[
              { id: "genel", label: "Mesaj Gönder" },
              { id: "katil", label: "Bize Katıl" },
              { id: "isbirligi", label: "İş Birliği" },
            ].map((sekme) => (
              <button
                key={sekme.id}
                onClick={() => {
                  setAktifSekme(sekme.id as Sekme);
                  setGonderildi(false);
                }}
                className={`-mb-px border-b-2 pb-4 text-sm transition-colors ${
                  aktifSekme === sekme.id
                    ? "border-black font-semibold text-black"
                    : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                {sekme.label}
              </button>
            ))}
          </div>

          {/* BAŞARILI MESAJ */}
          {gonderildi ? (
            <div className="py-16 text-center">
              <p className="font-playfair mb-3 text-3xl font-bold">
                Teşekkürler 🙏
              </p>
              <p className="text-sm text-gray-500">
                Mesajın bize ulaştı, en kısa sürede dönüş yapacağız.
              </p>
              <button
                onClick={() => setGonderildi(false)}
                className="mt-8 text-xs uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-black"
              >
                Yeni mesaj gönder →
              </button>
            </div>
          ) : (
            <>
              {/* GENEL FORM */}
              {aktifSekme === "genel" && (
                <div className="space-y-8">
                  <p className="text-sm leading-relaxed text-gray-500">
                    Aklında bir şey mi var? Merak ettiğin, önermek istediğin ya
                    da sadece selam vermek istediğin bir şey olabilir.
                    Yazabilirsin.
                  </p>
                  <div>
                    <label className={labelClass}>İsim</label>
                    <input
                      className={inputClass}
                      placeholder="Adın Soyadın"
                      value={genelForm.isim}
                      onChange={(e) =>
                        setGenelForm({ ...genelForm, isim: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>E-posta</label>
                    <input
                      className={inputClass}
                      type="email"
                      placeholder="ornek@mail.com"
                      value={genelForm.eposta}
                      onChange={(e) =>
                        setGenelForm({ ...genelForm, eposta: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Mesaj</label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={5}
                      placeholder="Mesajını buraya yazabilirsin..."
                      value={genelForm.mesaj}
                      onChange={(e) =>
                        setGenelForm({ ...genelForm, mesaj: e.target.value })
                      }
                    />
                  </div>
                  <button
                    onClick={() => gonder("genel", genelForm)}
                    disabled={yukleniyor}
                    className="bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                  >
                    {yukleniyor ? "Gönderiliyor..." : "Gönder"}
                  </button>
                </div>
              )}

              {/* KATIL FORMU */}
              {aktifSekme === "katil" && (
                <div className="space-y-8">
                  <p className="text-sm leading-relaxed text-gray-500">
                    Bir fikrin mi var? Psikoloji alanında üretmek, araştırmak
                    ya da toplulukla bir şeyler yapmak mı istiyorsun? Anlat,
                    birlikte değerlendirelim.
                  </p>
                  <div>
                    <label className={labelClass}>İsim</label>
                    <input
                      className={inputClass}
                      placeholder="Adın Soyadın"
                      value={katilForm.isim}
                      onChange={(e) =>
                        setKatilForm({ ...katilForm, isim: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>E-posta</label>
                    <input
                      className={inputClass}
                      type="email"
                      placeholder="ornek@mail.com"
                      value={katilForm.eposta}
                      onChange={(e) =>
                        setKatilForm({ ...katilForm, eposta: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Üniversite / Bölüm</label>
                    <input
                      className={inputClass}
                      placeholder="İstanbul Üniversitesi · Psikoloji"
                      value={katilForm.universite}
                      onChange={(e) =>
                        setKatilForm({
                          ...katilForm,
                          universite: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Fikrin veya Motivasyonun
                    </label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={5}
                      placeholder="Ne yapmak istediğini, ne üretebileceğini anlat..."
                      value={katilForm.fikir}
                      onChange={(e) =>
                        setKatilForm({ ...katilForm, fikir: e.target.value })
                      }
                    />
                  </div>
                  <button
                    onClick={() => gonder("katil", katilForm)}
                    disabled={yukleniyor}
                    className="bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                  >
                    {yukleniyor ? "Gönderiliyor..." : "Gönder"}
                  </button>
                </div>
              )}

              {/* İŞ BİRLİĞİ FORMU */}
              {aktifSekme === "isbirligi" && (
                <div className="space-y-8">
                  <p className="text-sm leading-relaxed text-gray-500">
                    Bir kurum, platform ya da birey olarak WikiPsycho ile iş
                    birliği yapmak mı istiyorsunuz? Teklifinizi duymaktan
                    memnuniyet duyarız.
                  </p>
                  <div>
                    <label className={labelClass}>İsim</label>
                    <input
                      className={inputClass}
                      placeholder="Adın Soyadın"
                      value={isbForm.isim}
                      onChange={(e) =>
                        setIsbForm({ ...isbForm, isim: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>E-posta</label>
                    <input
                      className={inputClass}
                      type="email"
                      placeholder="ornek@kurum.com"
                      value={isbForm.eposta}
                      onChange={(e) =>
                        setIsbForm({ ...isbForm, eposta: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Kurum / Pozisyon</label>
                    <input
                      className={inputClass}
                      placeholder="Kurum adı ve pozisyonun"
                      value={isbForm.kurum}
                      onChange={(e) =>
                        setIsbForm({ ...isbForm, kurum: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>İş Birliği Teklifi</label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={5}
                      placeholder="Ne tür bir iş birliği öneriyorsunuz?"
                      value={isbForm.mesaj}
                      onChange={(e) =>
                        setIsbForm({ ...isbForm, mesaj: e.target.value })
                      }
                    />
                  </div>
                  <button
                    onClick={() => gonder("isbirligi", isbForm)}
                    disabled={yukleniyor}
                    className="bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                  >
                    {yukleniyor ? "Gönderiliyor..." : "Gönder"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* SAĞ — Sosyal medya + WhatsApp + Konum */}
        <div className="space-y-16">
          {/* SOSYAL MEDYA */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-gray-400">
              Bizi Takip Edin
            </p>
            <div className="space-y-4">
              {[
                {
                  platform: "Instagram",
                  kullanici: "@wiki_psycho",
                  url: "https://instagram.com/wiki_psycho",
                },
                {
                  platform: "X / Twitter",
                  kullanici: "@wiki_psycho",
                  url: "https://x.com/wiki_psycho",
                },
                {
                  platform: "YouTube",
                  kullanici: "WikiPsycho",
                  url: "https://youtube.com/@wikipsycho",
                },
                {
                  platform: "LinkedIn",
                  kullanici: "WikiPsycho",
                  url: "https://linkedin.com/company/wikipsycho",
                },
              ].map((sosyal) => (
                <a
                  key={sosyal.platform}
                  href={sosyal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-gray-100 py-3 transition-colors hover:border-black"
                >
                  <span className="text-sm font-medium">{sosyal.platform}</span>
                  <span className="text-sm text-gray-400 transition-colors group-hover:text-black">
                    {sosyal.kullanici} →
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* WHATSAPP DUYURU GRUBU */}
          <div className="bg-gray-50 p-8">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-400">
              Duyuru Grubu
            </p>
            <h3 className="font-playfair mb-3 text-2xl font-bold">
              WhatsApp Grubuna Katıl
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              Yeni projelerimizden, etkinliklerimizden ve yayınlarımızdan
              anında haberdar olmak için duyuru grubuna katılabilirsin.
            </p>
            <a
              href="https://chat.whatsapp.com/GRUP_LINKI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-gray-800"
            >
              Gruba Katıl →
            </a>
          </div>

          {/* KONUM — mizahi */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-400">
              Neredeyiz?
            </p>
            <p className="font-playfair mb-3 text-xl font-bold">
              Ofisimiz: İnternet
            </p>
            <p className="text-sm leading-relaxed text-gray-500">
              Fiziksel bir adresimiz yok — ama her yerden ulaşabilirsiniz.
              WikiPsycho tamamen çevrimiçi yürüyen bir topluluk. Ekibimiz
              İstanbul&apos;dan Ankara&apos;ya, Edirne&apos;den Erzurum&apos;a
              dağılmış durumda. Bizi bulmak için harita uygulaması değil, bir
              tarayıcı yeterli. 🌐
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

