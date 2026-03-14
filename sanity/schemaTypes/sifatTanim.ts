import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sifatTanim',
  title: 'Sıfat Tanımı',
  type: 'document',
  description: 'Ekip üyelerine atanacak sıfatlar: Başkan, Başkan Yardımcısı, Akademi Birimi Lideri, Akademi Birimi Üyesi vb.',
  fields: [
    defineField({
      name: 'ad',
      title: 'Sıfat',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Kartlarda görünecek sıfat (örn: Başkan, Akademi Birimi Lideri)',
    }),
    defineField({
      name: 'sira',
      title: 'Sıra',
      type: 'number',
      description: 'Seçim listesindeki sıralama',
    }),
  ],
  orderings: [
    { title: 'Sıra (artan)', name: 'siraAsc', by: [{ field: 'sira', direction: 'asc' }] },
    { title: 'Sıfat (A-Z)', name: 'adAsc', by: [{ field: 'ad', direction: 'asc' }] },
  ],
  preview: {
    select: { ad: 'ad', sira: 'sira' },
    prepare({ ad, sira }) {
      return {
        title: ad || 'Sıfat',
        subtitle: sira != null ? `Sıra: ${sira}` : undefined,
      }
    },
  },
})
