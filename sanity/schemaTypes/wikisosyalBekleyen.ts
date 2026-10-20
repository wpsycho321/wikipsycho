import { defineField, defineType } from "sanity";

/** WikiSosyal tanıtım sayfasında "Açılınca haber ver" diyenler */
export default defineType({
  name: "wikisosyalBekleyen",
  title: "WikiSosyal bekleyenler",
  type: "document",
  preview: {
    select: { title: "eposta", subtitle: "tarih" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? new Date(subtitle).toLocaleString("tr-TR") : "" };
    },
  },
  fields: [
    defineField({ name: "eposta", title: "E-posta", type: "string", readOnly: true }),
    defineField({ name: "tarih", title: "Tarih", type: "datetime", readOnly: true }),
  ],
});
