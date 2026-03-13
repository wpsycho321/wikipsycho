export const yazilarQuery = `*[_type == "yazi" && durum == "yayinda"] | order(tarih desc) {
  _id, baslik, slug, tarih, kategori, ozet, kapakGorseli, birim,
  "yazar": yazar->{ isim, unvan, fotograf }
}`

export const yazarlarQuery = `*[_type == "ekipUyesi" && aktif == true] | order(isim asc) {
  _id, isim, slug, unvan, biyografi, fotograf, birim, rol, sosyalMedya
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

