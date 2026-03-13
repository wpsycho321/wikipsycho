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

// Test: basit aksiyon kayıt kontrolü için (çalışıyorsa menüde "Test Action" görünür)
function TestAction() {
  return {
    label: 'Test Action',
    onHandle: () => window.alert('Document actions çalışıyor!'),
  }
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  document: {
    actions: (prev, { schemaType }) => {
      const types = ['yazi', 'proje', 'eyayin', 'etkinlik']
      if (schemaType && types.includes(schemaType)) {
        return [...prev, TestAction, AiDoldurAction];
      }
      return prev;
    },
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
