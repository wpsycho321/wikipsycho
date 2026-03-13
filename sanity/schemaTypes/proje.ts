import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'proje',
  title: 'Proje',
  type: 'document',
  fields: [
    defineField({
      name: 'baslik',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'baslik',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altBaslik',
      title: 'Alt Başlık',
      type: 'string',
    }),
    defineField({
      name: 'aciklama',
      title: 'Açıklama',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'detay',
      title: 'Detay',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'durum',
      title: 'Durum',
      type: 'string',
      options: {
        list: [
          {title: 'Tamamlandı', value: 'Tamamlandı'},
          {title: 'Devam Ediyor', value: 'Devam Ediyor'},
          {title: 'Planlama', value: 'Planlama'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'yil',
      title: 'Yıl',
      type: 'string',
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
    }),
    defineField({
      name: 'gorsel',
      title: 'Görsel',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'galeri',
      title: 'Galeri',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'ortaklar',
      title: 'Ortaklar',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'istatistikler',
      title: 'İstatistikler',
      type: 'array',
      of: [
        defineField({
          name: 'istatistik',
          title: 'İstatistik',
          type: 'object',
          fields: [
            {
              name: 'sayi',
              title: 'Sayı',
              type: 'string',
            },
            {
              name: 'aciklama',
              title: 'Açıklama',
              type: 'string',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'raporSlug',
      title: 'İlgili Rapor Slug',
      type: 'string',
    }),
    defineField({
      name: 'kitapcikUrl',
      title: 'Kitapçık URL',
      type: 'string',
    }),
    defineField({
      name: 'fon',
      title: 'Fon',
      type: 'string',
    }),
    defineField({
      name: 'metaBaslik',
      title: 'SEO Meta Başlık',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaAciklama',
      title: 'SEO Meta Açıklama',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'anahtarKelimeler',
      title: 'Anahtar Kelimeler',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],
})

