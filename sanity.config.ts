'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {AiDoldurAction} from './sanity/components/AiDoldurButon'
import {BasvurulariGorAction} from './sanity/components/BasvurulariGorAction'

// Test: basit aksiyon kayıt kontrolü için (çalışıyorsa menüde "Test Action" görünür)
function TestAction() {
  return {
    label: 'Test Action',
    onHandle: () => window.alert('Document actions çalışıyor!'),
  }
}

export default defineConfig([
  {
    name: 'default',
    title: 'WikiPsycho',
    basePath: '/studio',
    projectId: projectId!,
    dataset: dataset!,
    schema,
    document: {
      actions: (prev, { schemaType }) => {
        const aiTypes = ['yazi', 'proje', 'eyayin', 'etkinlik']
        if (schemaType && aiTypes.includes(schemaType)) {
          return [...prev, TestAction, AiDoldurAction]
        }
        if (schemaType === 'basvuru') {
          return [...prev, BasvurulariGorAction]
        }
        return prev
      },
    },
    plugins: [
      structureTool({structure}),
      visionTool({defaultApiVersion: apiVersion}),
    ],
  },
])
