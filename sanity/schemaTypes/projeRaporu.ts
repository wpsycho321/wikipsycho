import { defineField, defineType } from "sanity";

export default defineType({
  name: "projeRaporu",
  title: "Proje Raporu",
  type: "document",
  fields: [
    defineField({
      name: "baslik",
      title: "Başlık",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "baslik",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "altBaslik",
      title: "Alt Başlık",
      type: "string",
    }),
    defineField({
      name: "yil",
      title: "Yıl",
      type: "string",
    }),
    defineField({
      name: "tarih",
      title: "Tarih",
      type: "string",
    }),
    defineField({
      name: "ozet",
      title: "Özet",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "hedef",
      title: "Hedef",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "katilimciSayisi",
      title: "Katılımcı Sayısı",
      type: "number",
    }),
    defineField({
      name: "yasGrubu",
      title: "Yaş Grubu",
      type: "string",
      description: 'e.g. "10-14 yaş"',
    }),
    defineField({
      name: "mekan",
      title: "Mekan",
      type: "string",
      description: 'e.g. "Ortaokul sınıfı", "Online"',
    }),
    defineField({
      name: "yontemler",
      title: "Yöntemler",
      type: "array",
      of: [{ type: "string" }],
      description: 'e.g. "Atölye", "Rol canlandırma", "Anket"',
    }),
    defineField({
      name: "bulgular",
      title: "Bulgular",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "sonuclar",
      title: "Sonuçlar",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "kapakGorseli",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gorselGalerisi",
      title: "Görsel Galerisi",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "pdfUrl",
      title: "PDF URL",
      type: "url",
    }),
    defineField({
      name: "sayfaSayisi",
      title: "Sayfa Sayısı",
      type: "number",
    }),
    defineField({
      name: "hazirlayanlar",
      title: "Hazırlayanlar",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "editor",
      title: "Editör",
      type: "string",
    }),
    defineField({
      name: "danismanlar",
      title: "Danışmanlar",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ilgiliProje",
      title: "İlgili Proje",
      type: "reference",
      to: [{ type: "proje" }],
    }),
    defineField({
      name: "metaBaslik",
      title: "SEO Meta Başlık",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "metaAciklama",
      title: "SEO Meta Açıklama",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "anahtarKelimeler",
      title: "Anahtar Kelimeler",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],
});
