import { defineField, defineType } from "sanity";

export default defineType({
  name: "ekipGrubu",
  title: "Ekip Grubu",
  type: "document",
  fields: [
    defineField({
      name: "ad",
      title: "Ad",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: 'Örn: "Yönetim Kurulu", "Akademi Birimi"',
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "ad",
        maxLength: 96,
      },
    }),
    defineField({
      name: "sira",
      title: "Sıra",
      type: "number",
      description: "Sayfada grupların gösterim sırası",
    }),
  ],
});
