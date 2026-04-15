import { defineField, defineType } from "sanity";

export default defineType({
  name: "ilan",
  title: "İlan",
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
      name: "aciklama",
      title: "Açıklama",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "afis",
      title: "Afiş (Instagram görseli)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "birim",
      title: "Birim",
      type: "string",
      options: {
        list: [
          { title: "Akademi", value: "Akademi" },
          { title: "İçerik", value: "Icerik" },
          { title: "Proje", value: "Proje" },
          { title: "Eğitim & Gelişim", value: "EgitimGelisim" },
          { title: "Yayın", value: "Yayin" },
          { title: "Prodüksiyon", value: "Produksiyon" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Üye Alımı", value: "UyeAlimi" },
          { title: "Staj", value: "Staj" },
          { title: "Gönüllü", value: "Gonullu" },
          { title: "Diğer", value: "Diger" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "sonTarih",
      title: "Son başvuru tarihi",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aktif",
      title: "Aktif",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "basvuruListesiLinki",
      title: "Başvuru Listesi Linki",
      type: "url",
      description: "Başvuruları görüntülemek için admin linki",
    }),
    defineField({
      name: "sorular",
      title: "Başvuru soruları",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "soru", title: "Soru metni", type: "string", validation: (Rule) => Rule.required() },
            {
              name: "tip",
              title: "Soru tipi",
              type: "string",
              options: {
                list: [
                  { title: "Kısa metin", value: "kisa-metin" },
                  { title: "Uzun metin", value: "uzun-metin" },
                  { title: "Seçenekli", value: "secenekli" },
                  { title: "Dosya Yükleme", value: "dosya" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "secenekler",
              title: "Seçenekler",
              type: "array",
              of: [{ type: "string" }],
              hidden: ({ parent }) => parent?.tip !== "secenekli",
            },
            { name: "zorunlu", title: "Zorunlu", type: "boolean", initialValue: false },
          ],
        },
      ],
    }),
  ],
});
