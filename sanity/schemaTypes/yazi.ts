import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'yazi',
  title: 'Yazı',
  type: 'document',
  fields: [
    defineField({
      name: 'baslik',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required().min(5),
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
      name: 'yazar',
      title: 'Yazar',
      type: 'reference',
      to: [{ type: 'yazar' }, { type: 'ekipUyesi' }],
    }),
    defineField({
      name: 'tarih',
      title: 'Tarih',
      type: 'date',
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Araştırma', value: 'Arastirma'},
          {title: 'Klinik', value: 'Klinik'},
          {title: 'Gelişim', value: 'Gelisim'},
          {title: 'Sosyal', value: 'Sosyal'},
          {title: 'Güncel', value: 'Guncel'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'ozet',
      title: 'Özet',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icerik',
      title: 'İçerik',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'kapakGorseli',
      title: 'Kapak Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ses',
      title: 'Ses Dosyası',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'sesDosyasiUrl',
      title: 'Harici Ses Linki',
      type: 'url',
      description: 'Yüklenen dosya yerine harici URL kullanılacaksa',
    }),
    defineField({
      name: 'durum',
      title: 'Durum',
      type: 'string',
      options: {
        list: [
          {title: 'Taslak', value: 'taslak'},
          {title: 'Onayda', value: 'onayda'},
          {title: 'Yayında', value: 'yayinda'},
          {title: 'Reddedildi', value: 'reddedildi'},
        ],
        layout: 'radio',
      },
      initialValue: 'taslak',
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

