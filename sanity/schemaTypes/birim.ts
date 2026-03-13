import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'birim',
  title: 'Birim',
  type: 'document',
  fields: [
    defineField({
      name: 'ad',
      title: 'Ad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'ad',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    }),
    defineField({
      name: 'hakkinda',
      title: 'Hakkında',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'kimleriBuyoruz',
      title: 'Kimleri Büyüyoruz',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'calismaAlanlari',
      title: 'Çalışma Alanları',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'gecmisCalismalari',
      title: 'Geçmiş Çalışmaları',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'lider',
      title: 'Lider',
      type: 'reference',
      to: [{type: 'ekipUyesi'}],
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
  ],
})

