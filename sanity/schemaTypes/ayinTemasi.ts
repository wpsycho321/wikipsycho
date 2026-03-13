import { defineField, defineType } from "sanity";

export default defineType({
  name: "ayinTemasi",
  title: "Ayın Teması",
  type: "document",
  fields: [
    defineField({
      name: "ay",
      title: "Ay",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: 'Örn: "Nisan 2025"',
    }),
    defineField({
      name: "tema",
      title: "Tema",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: 'Örn: "Savaş Psikolojisi"',
    }),
    defineField({
      name: "aciklama",
      title: "Açıklama",
      type: "string",
      description: "Kısa açıklama",
    }),
    defineField({
      name: "gorsel",
      title: "Görsel",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
