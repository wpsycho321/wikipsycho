import { defineField, defineType } from "sanity";

export default defineType({
  name: "etkinlik",
  title: "Etkinlik",
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
      options: { source: "baslik", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tarih",
      title: "Tarih",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "konum",
      title: "Konum",
      type: "string",
      description: '"Online" veya fiziksel adres',
    }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Atölye", value: "Atolye" },
          { title: "Konferans", value: "Konferans" },
          { title: "Webinar", value: "Webinar" },
          { title: "Diğer", value: "Diger" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "aciklama",
      title: "Açıklama",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "gorsel",
      title: "Görsel",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "durum",
      title: "Durum",
      type: "string",
      description: "Tarihe göre otomatik hesaplanabilir, manuel override mümkün",
      options: {
        list: [
          { title: "Yaklaşan", value: "yaklasan" },
          { title: "Devam ediyor", value: "devam-ediyor" },
          { title: "Tamamlandı", value: "tamamlandi" },
        ],
        layout: "radio",
      },
    }),
  ],
});
