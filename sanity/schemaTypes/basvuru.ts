import { defineField, defineType } from "sanity";

export default defineType({
  name: "basvuru",
  title: "Başvuru",
  type: "document",
  preview: {
    select: {
      title: "ilan.baslik",
      subtitle: "tarih",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "İlansız Başvuru",
        subtitle: subtitle
          ? new Date(subtitle).toLocaleString("tr-TR")
          : "",
      };
    },
  },
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
          preview: {
            select: { title: "soru", subtitle: "cevap" },
            prepare({ title, subtitle }) {
              return {
                title: title || "Soru",
                subtitle: subtitle
                  ? String(subtitle).slice(0, 80) +
                    (String(subtitle).length > 80 ? "…" : "")
                  : "",
              };
            },
          },
        },
      ],
    }),
  ],
});
