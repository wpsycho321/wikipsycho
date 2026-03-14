export const yazilarQuery = `*[_type == "yazi"] | order(tarih desc) {
  _id, baslik, slug, tarih, kategori, ozet, kapakGorseli, birim,
  "yazar": yazar->{ isim, unvan, fotograf }
}`

export const yazilarListQuery = `*[_type == "yazi" && durum == "yayinda"] | order(tarih desc) {
  _id, baslik, slug, tarih, kategori, ozet,
  "kapakGorseli": kapakGorseli.asset->url,
  "yazar": yazar->{ isim, unvan }
}`

export const yazarlarQuery = `*[_type == "ekipUyesi" && aktif == true] | order(isim asc) {
  _id, isim, slug, unvan, biyografi, fotograf, birim, rol, sosyalMedya
}`

export const ekibimizQuery = `*[_type == "ekipUyesi" && aktif == true] | order(birim asc, isim asc) {
  _id, isim, slug, unvan, birim, rol,
  "fotograf": fotograf.asset->url
}`

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

export const raporlarQuery = `*[_type == "rapor"] | order(tarih desc) {
  _id, id, baslik, slug, altBaslik, yil, tarih, ozet, kapakGorseli,
  hazirlayanlar, sayfaSayisi
}`

export const eyayinlarQuery = `*[_type == "eyayin"] | order(tarih desc) {
  _id, baslik, slug, altBaslik, seriNo, tur, yil, kategori, ozet, kapakGorseli, sayfaSayisi, hazirlayanlar
}`

export const videolarQuery = `*[_type == "video"] | order(tarih desc) {
  _id, baslik, altBaslik, youtubeUrl, thumbnailUrl, tarih, sure, kategori, aciklama
}`

export const podcastlarQuery = `*[_type == "podcast"] | order(tarih desc) {
  _id, baslik, altBaslik, spotifyUrl, gorselUrl, tarih, sure, kategori, aciklama
}`

export const birimlerQuery = `*[_type == "birim"] {
  _id, ad, slug, slogan, hakkinda, gorsel,
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
  "yazilari": *[_type == "yazi" && references(^._id) && durum == "yayinda"] | order(tarih desc) [0..2] {
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

export const basvurularByIlanQuery = `*[_type == "basvuru" && references($ilanId)] | order(tarih desc) {
  _id, tarih, cevaplar
}`

