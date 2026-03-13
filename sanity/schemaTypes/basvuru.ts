import { defineField, defineType } from "sanity";

export default defineType({
  name: "basvuru",
  title: "Başvuru",
  type: "document",
  fields: [
    defineField({
      name: "ilan",
      title: "İlan",
      type: "reference",
      to: [{ type: "ilan" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tarih",
      title: "Tarih",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "cevaplar",
      title: "Cevaplar",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "soru", title: "Soru", type: "string" },
            { name: "cevap", title: "Cevap", type: "text" },
          ],
        },
      ],
    }),
  ],
});
