import { defineField, defineType } from "sanity";

export default defineType({
  name: "duyuru",
  title: "Duyuru",
  type: "document",
  fields: [
    defineField({
      name: "metin",
      title: "Metin",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: 'Örn: "Yeni videomuz yayında →"',
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "Tıklanınca gidilecek sayfa",
    }),
    defineField({
      name: "aktif",
      title: "Aktif",
      type: "boolean",
      initialValue: true,
      description: "Göster / Gizle",
    }),
    defineField({
      name: "sira",
      title: "Sıra",
      type: "number",
      description: "Sıralama (küçükten büyüğe)",
    }),
  ],
});
