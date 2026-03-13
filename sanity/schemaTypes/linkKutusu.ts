import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'linkKutusu',
  title: 'Link Kutusu',
  type: 'document',
  fields: [
    defineField({
      name: 'baslik',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aciklama',
      title: 'Açıklama',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'linkler',
      title: 'Linkler',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            {
              name: 'ad',
              title: 'Ad',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
            },
            {
              name: 'ikon',
              title: 'İkon',
              type: 'string',
            },
            {
              name: 'renk',
              title: 'Renk',
              type: 'string',
              description:
                'Tailwind veya HEX renk kodu (ör. #000000 veya bg-black)',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'konum',
      title: 'Konum',
      type: 'string',
      options: {
        list: [
          {title: 'Anasayfa', value: 'anasayfa'},
          {title: 'Sidebar', value: 'sidebar'},
          {title: 'Footer', value: 'footer'},
          {title: 'Etkinlikler', value: 'etkinlikler'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'aktif',
      title: 'Aktif',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})

