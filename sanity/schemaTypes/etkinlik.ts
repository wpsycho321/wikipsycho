import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'etkinlik',
  title: 'Etkinlik',
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
      rows: 4,
    }),
    defineField({
      name: 'tarih',
      title: 'Başlangıç Tarihi',
      type: 'datetime',
    }),
    defineField({
      name: 'bitisTarihi',
      title: 'Bitiş Tarihi',
      type: 'datetime',
    }),
    defineField({
      name: 'konum',
      title: 'Konum',
      type: 'string',
    }),
    defineField({
      name: 'konumTipi',
      title: 'Konum Tipi',
      type: 'string',
      options: {
        list: [
          {title: 'Online', value: 'online'},
          {title: 'Yüz Yüze', value: 'yüzyüze'},
          {title: 'Hibrit', value: 'hibrit'},
        ],
        layout: 'radio',
      },
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
      name: 'kayitLinki',
      title: 'Kayıt Linki',
      type: 'string',
    }),
    defineField({
      name: 'kapasite',
      title: 'Kapasite',
      type: 'number',
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
      name: 'durum',
      title: 'Durum',
      type: 'string',
      options: {
        list: [
          {title: 'Planlandı', value: 'planlandi'},
          {title: 'Aktif', value: 'aktif'},
          {title: 'Tamamlandı', value: 'tamamlandi'},
          {title: 'İptal', value: 'iptal'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'sunucular',
      title: 'Sunucular / Konuşmacılar',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'ekipUyesi'}]}],
    }),
  ],
})

