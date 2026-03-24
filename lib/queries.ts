export const yazilarQuery = `*[_type == "yazi"] | order(tarih desc) {
  _id, baslik, slug, tarih, kategori, ozet, kapakGorseli, birim,
  "yazar": yazar->{ isim, unvan, fotograf }
}`

export const yaziBySlugQuery = `*[_type == "yazi" && slug.current == $slug][0] {
  _id, baslik, slug, tarih, kategori, ozet, icerik, birim,
  "kapakGorseli": kapakGorseli.asset->url,
  "sesUrl": ses.asset->url,
  sesDosyasiUrl,
  "yazar": yazar->{ isim, unvan, biyografi, slug, "fotograf": fotograf.asset->url, sosyalMedya }
}`;

export const yazilarListQuery = `*[_type == "yazi"] | order(tarih desc) {
  _id, baslik, slug, tarih, kategori, ozet,
  "kapakGorseli": kapakGorseli.asset->url,
  "yazar": yazar->{ isim, unvan }
}`

export const yazarlarQuery = `*[_type == "ekipUyesi" && onecikar == true && aktif == true] | order(sira asc) {
  _id, isim, slug, rol, unvan, biyografi,
  "foto": fotograf.asset->url,
  sosyalMedya
}`

export const ekibimizQuery = `*[_type == "ekipUyesi" && aktif == true] | order(birim asc, isim asc) {
  _id, isim, slug, unvan, birim, rol,
  "fotograf": fotograf.asset->url
}`;

export const ekipUyesiBySlugQuery = `*[_type == "ekipUyesi" && slug.current == $slug][0] {
  isim, rol, unvan,
  "sifat": sifat->ad,
  biyografi,
  "foto": fotograf.asset->url,
  sosyalMedya,
  "yazilari": *[_type == "yazi" && references(^._id)] | order(tarih desc) {
    baslik, slug, kategori, ozet, tarih,
    "kapak": kapakGorseli.asset->url
  }
}`;

export const ekipGruplariQuery = `*[_type == "ekipGrubu"] | order(coalesce(sira, 999) asc) {
  _id, ad, sira, slug,
  "uyeler": *[_type == "ekipUyesi" && references(^._id)] | order(coalesce(sira, 999) asc) {
    _id, isim, slug, unvan,
    "sifat": sifat->ad,
    "foto": fotograf.asset->url
  }
}`;

export const ekipGrupsuzUyelerQuery = `*[_type == "ekipUyesi" && (grup == null || !defined(grup))] | order(coalesce(sira, 999) asc) {
  _id, isim, slug, unvan,
  "sifat": sifat->ad,
  "foto": fotograf.asset->url
}`;

export const ekipTumUyelerQuery = `*[_type == "ekipUyesi"] | order(coalesce(sira, 999) asc) {
  _id, isim, slug, unvan,
  "foto": fotograf.asset->url,
  "grupRef": grup._ref
}`;

export const ekipQuery = `*[_type == "ekipUyesi"] | order(coalesce(sira, 999) asc) {
  _id, isim, slug, rol, kategori, unvan,
  "foto": fotograf.asset->url
}`;

export const ekipUyesiQuery = `*[_type == "ekipUyesi" && (!defined(aktif) || aktif == true)] | order(kategori asc, sira asc) {
  _id, isim, slug, unvan, rol, kategori, sira, biyografi, birim,
  "fotograf": fotograf.asset->url,
  sosyalMedya
}`;

export const projelerQuery = `*[_type == "proje"] | order(yil desc) {
  _id,
  baslik,
  slug,
  altBaslik,
  aciklama,
  durum,
  yil,
  kategori,
  "gorsel": gorsel.asset->url,
  istatistikler,
  ortaklar
}`

export const projeRaporlariQuery = `*[_type == "projeRaporu"] | order(yil desc) {
  _id, baslik, slug, altBaslik, yil, tarih, ozet, katilimciSayisi, yasGrubu, mekan, hazirlayanlar, sayfaSayisi,
  "kapakGorseli": kapakGorseli.asset->url
}`;

export const projeRaporuBySlugQuery = `*[_type == "projeRaporu" && slug.current == $slug][0] {
  _id, baslik, slug, altBaslik, yil, tarih, ozet, bulgular, sayfaSayisi, hazirlayanlar,
  pdfUrl,
  "kapakGorseli": kapakGorseli.asset->url
}`;

export const raporlarQuery = `*[_type == "rapor"] | order(tarih desc) {
  _id, id, baslik, slug, altBaslik, yil, tarih, ozet, hazirlayanlar, sayfaSayisi,
  "kapakGorseli": kapakGorseli.asset->url
}`;

export const raporBySlugQuery = `*[_type == "rapor" && slug.current == $slug][0] {
  _id, id, baslik, slug, altBaslik, yil, tarih, ozet, hazirlayanlar, sayfaSayisi,
  pdfUrl,
  "kapakGorseli": kapakGorseli.asset->url
}`;

export const eyayinlarQuery = `*[_type == "eyayin"] | order(tarih desc) {
  _id, baslik, slug, altBaslik, seriNo, tur, yil, kategori, ozet, sayfaSayisi, hazirlayanlar,
  "kapakGorseli": kapakGorseli.asset->url
}`;

export const eyayinBySlugQuery = `*[_type == "eyayin" && (slug.current == $slugTrimmed || slug.current == $slugWithSpace)][0] {
  _id, baslik, slug, altBaslik, seriNo, tur, yil, tarih, kategori, ozet, hedef, bulgular, sayfaSayisi, hazirlayanlar,
  pdfUrl, editor, danismanlar, yayin,
  "kapakGorseli": kapakGorseli.asset->url
}`;

export const videolarQuery = `*[_type == "video"] | order(tarih desc) {
  _id, baslik, altBaslik, youtubeUrl, "thumbnail": thumbnail.asset->url, tarih, sure, kategori, aciklama
}`

export const podcastlarQuery = `*[_type == "podcast"] | order(tarih desc) {
  _id, baslik, altBaslik, spotifyUrl, gorselUrl, tarih, sure, kategori, aciklama
}`

export const birimlerQuery = `*[_type == "birim"] {
  _id, ad, slug, slogan, hakkinda,
  "gorsel": gorsel.asset->url,
  "lider": lider->{ _id, slug, isim, unvan, fotograf }
}`

export const duyurularQuery = `*[_type == "duyuru" && aktif == true] | order(sira asc) {
  _id, metin, link
}`

export const ayinTemasiQuery = `*[_type == "ayinTemasi"] | order(_createdAt desc) [0] {
  ay, tema, aciklama,
  "gorsel": gorsel.asset->url
}`

export const oncuYazarQuery = `*[_type == "ekipUyesi" && onecikar == true && aktif == true] [0] {
  _id, isim, slug, unvan, biyografi,
  "fotograf": fotograf.asset->url,
  "yazilari": *[_type == "yazi" && references(^._id) && durum == "yayinda"] | order(tarih desc) [0..3] {
    baslik, slug, ozet,
    "kapakGorseli": kapakGorseli.asset->url
  }
}`

export const yazilarHomepageQuery = `*[_type == "yazi" && durum == "yayinda"] | order(tarih desc) [0...7] {
  _id, baslik, slug, tarih, kategori, ozet,
  "kapakGorseli": kapakGorseli.asset->url,
  "yazar": yazar->{ isim, unvan }
}`

export const eyayinlarHomepageQuery = `*[_type == "eyayin"] | order(tarih desc) [0] {
  _id, baslik, slug, altBaslik, ozet, hazirlayanlar,
  "kapakGorseli": kapakGorseli.asset->url
}`

export const etkinliklerQuery = `*[_type == "etkinlik"] | order(tarih asc) {
  _id, baslik, slug, tarih, konum, kategori, aciklama,
  "gorsel": gorsel.asset->url,
  durum
}`


export const ilanlarQuery = `*[_type == "ilan" && aktif == true && sonTarih > now()] | order(sonTarih asc) {
  _id, baslik, slug, aciklama, birim, kategori, sonTarih,
  "afis": afis.asset->url
}`

export const ilanlarAllQuery = `*[_type == "ilan" && aktif == true] | order(sonTarih asc) {
  _id, baslik, slug, aciklama, birim, kategori, sonTarih,
  "afis": afis.asset->url
}`

export const ilanBySlugQuery = `*[_type == "ilan" && slug.current == $slug][0] {
  _id, baslik, slug, aciklama, birim, kategori, sonTarih, sorular,
  "afis": afis.asset->url
}`

export const haberlerHomepageQuery = `*[_type == "haber"] | order(tarih desc) [0..2] {
  _id, baslik, slug, ozet, tarih, kategori,
  "kapakGorseli": kapakGorseli.asset->url,
  kaynak,
  "yazar": yazar->{ isim, "foto": fotograf.asset->url }
}`;

export const haberlerQuery = `*[_type == "haber"] | order(tarih desc) {
  _id, baslik, slug, ozet, tarih, kategori,
  "kapakGorseli": kapakGorseli.asset->url,
  kaynak,
  "yazar": yazar->{ isim, "foto": fotograf.asset->url }
}`;

export const haberBySlugQuery = `*[_type == "haber" && slug.current == $slug][0] {
  _id, baslik, slug, ozet, icerik, tarih, kategori, kaynak,
  "kapakGorseli": kapakGorseli.asset->url,
  "yazar": yazar->{ isim, unvan, biyografi, slug, "fotograf": fotograf.asset->url }
}`;

export const basvurularByIlanQuery = `*[_type == "basvuru" && references($ilanId)] | order(tarih desc) {
  _id, tarih, cevaplar
}`

