import { defineField, defineType } from "sanity";

export default defineType({
  name: "haber",
  title: "Haber",
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
      name: "ozet",
      title: "Özet",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icerik",
      title: "İçerik",
      type: "text",
    }),
    defineField({
      name: "tarih",
      title: "Tarih",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Araştırma", value: "Arastirma" },
          { title: "Klinik", value: "Klinik" },
          { title: "Gelişim", value: "Gelisim" },
          { title: "Sosyal", value: "Sosyal" },
          { title: "Güncel", value: "Guncel" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "kapakGorseli",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "yazar",
      title: "Yazar / Kaynak Kişi",
      type: "reference",
      to: [{ type: "ekipUyesi" }],
      description: "Haberin yazarı veya kaynak kişisi (isteğe bağlı)",
    }),
    defineField({
      name: "kaynak",
      title: "Kaynak URL",
      type: "url",
      description: "Harici kaynak bağlantısı (varsa tıklanınca bu açılır)",
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
