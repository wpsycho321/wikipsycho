import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'baslik',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altBaslik',
      title: 'Alt Başlık',
      type: 'string',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Küçük Görsel URL',
      type: 'string',
    }),
    defineField({
      name: 'tarih',
      title: 'Tarih',
      type: 'date',
    }),
    defineField({
      name: 'sure',
      title: 'Süre',
      type: 'string',
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
    }),
    defineField({
      name: 'aciklama',
      title: 'Açıklama',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'yazar',
      title: 'Yazar',
      type: 'string',
    }),
    defineField({
      name: 'birim',
      title: 'Birim',
      type: 'string',
      options: {
        list: [
          {title: 'Akademi', value: 'Akademi'},
          {title: 'İçerik', value: 'Icerik'},
          {title: 'Proje', value: 'Proje'},
          {title: 'Eğitim & Gelişim', value: 'EgitimGelisim'},
          {title: 'Yayın', value: 'Yayin'},
          {title: 'Prodüksiyon', value: 'Produksiyon'},
        ],
        layout: 'dropdown',
      },
    }),
  ],
})

