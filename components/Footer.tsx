import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* PODCAST BANNER — dikkat çekici küçük şerit */}
      <div className="flex items-center justify-between border-b border-white/10 px-12 py-5">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Bizi her yerde dinleyebilirsin
        </p>
        <Link
          href="/medya/podcastlar"
          className="text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:text-white/60"
        >
          Podcastleri Keşfet →
        </Link>
      </div>

      {/* ANA FOOTER İÇERİĞİ */}
      <div className="grid grid-cols-1 gap-12 px-12 py-16 md:grid-cols-4">
        {/* LOGO + AÇIKLAMA */}
        <div className="md:col-span-2">
          <Link
            href="/"
            className="font-playfair text-3xl font-bold tracking-tight"
          >
            WikiPsycho
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
            Psikoloji araştırmaları ve gelişim topluluğu. Araştırmadan sanata,
            klinik bilgiden günlük yaşama kadar psikolojiyi herkes için
            erişilebilir kılıyoruz.
          </p>

          {/* SOSYAL MEDYA */}
          <div className="mt-8 flex gap-5">
            {[
              { label: "Instagram", url: "https://instagram.com/wiki_psycho" },
              { label: "X", url: "https://x.com/wiki_psycho" },
              { label: "YouTube", url: "https://youtube.com/@wikipsycho" },
              {
                label: "LinkedIn",
                url: "https://linkedin.com/company/wikipsycho",
              },
            ].map((sosyal) => (
              <a
                key={sosyal.label}
                href={sosyal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
              >
                {sosyal.label}
              </a>
            ))}
          </div>
        </div>

        {/* NAVİGASYON */}
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/30">
            Keşfet
          </p>
          <ul className="space-y-3">
            {[
              { label: "Yazılar", href: "/yazilar" },
              { label: "Projeler", href: "/projeler" },
              { label: "Yayınlar", href: "/yayinlar/proje-raporlari" },
              { label: "E-Yayınlar", href: "/yayinlar/e-yayinlar" },
              { label: "Videolar", href: "/medya/videolar" },
              { label: "Podcastlar", href: "/medya/podcastlar" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* BİZE ULAŞIN */}
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/30">
            Bize Ulaşın
          </p>
          <p className="mb-6 text-sm leading-relaxed text-white/50">
            Bir fikrin mi var? Bir proje mi önermek istiyorsun? Ya da sadece
            merhaba demek mi?
          </p>
          <Link
            href="/iletisim"
            className="inline-block border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
          >
            İletişime Geç →
          </Link>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/30">
              Hakkımızda
            </p>
            <ul className="space-y-3">
              {[
                { label: "Biz Kimiz", href: "/hakkimizda/biz-kimiz" },
                { label: "Ekibimiz", href: "/hakkimizda/ekibimiz" },
                { label: "Birimler", href: "/hakkimizda/birimler" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* TELİF HAKKI */}
      <div className="flex items-center justify-between border-t border-white/10 px-12 py-5">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} WikiPsycho. Tüm hakları saklıdır.
        </p>
        <p className="text-xs text-white/20">wikipsycho.org.tr</p>
      </div>
    </footer>
  );
}

