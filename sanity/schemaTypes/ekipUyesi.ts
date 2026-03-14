import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ekipUyesi',
  title: 'Ekip Üyesi',
  type: 'document',
  fields: [
    defineField({
      name: 'isim',
      title: 'İsim',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'isim',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unvan',
      title: 'Ünvan',
      type: 'string',
    }),
    defineField({
      name: 'biyografi',
      title: 'Biyografi',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'fotograf',
      title: 'Fotoğraf',
      type: 'image',
      options: {hotspot: true},
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
      name: 'rol',
      title: 'Rol',
      type: 'string',
      description: 'Serbest metin, örn: "Başkan", "Eğitim & Gelişim Birim Lideri", "Denetim Kurulu Üyesi"',
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Yönetim', value: 'yonetim'},
          {title: 'Denetim Kurulu', value: 'denetim'},
          {title: 'Ekip', value: 'ekip'},
        ],
        layout: 'radio',
      },
      description: 'Sayfada gruplamak için',
    }),
    defineField({
      name: 'sira',
      title: 'Sıra',
      type: 'number',
      description: 'Aynı grupta sıralama için',
    }),
    defineField({
      name: 'eposta',
      title: 'E-posta',
      type: 'string',
    }),
    defineField({
      name: 'sosyalMedya',
      title: 'Sosyal Medya',
      type: 'object',
      fields: [
        {name: 'instagram', title: 'Instagram', type: 'string'},
        {name: 'twitter', title: 'X / Twitter', type: 'string'},
        {name: 'linkedin', title: 'LinkedIn', type: 'string'},
      ],
    }),
    defineField({
      name: 'aktif',
      title: 'Aktif',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'onecikar',
      title: 'Öne Çıkar',
      type: 'boolean',
      initialValue: false,
      description:
        'Bu true ise yazar "Yazarlarımız" bölümünde öne çıkar',
    }),
  ],
})

