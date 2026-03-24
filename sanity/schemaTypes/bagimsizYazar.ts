import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bagimsizYazar',
  title: 'Bağımsız Yazar',
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
      options: {source: 'isim', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unvan',
      title: 'Ünvan',
      type: 'string',
      description: 'Psikolog, Araştırmacı vb.',
    }),
    defineField({
      name: 'biyografi',
      title: 'Biyografi',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'fotograf',
      title: 'Fotoğraf',
      type: 'image',
      options: {hotspot: true},
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
  ],
})
