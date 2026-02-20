import type { CollectionConfig } from 'payload'

import { authenticated } from '@/payload/auth/authenticated'
import { authenticatedOrPublished } from '@/payload/auth/authenticatedOrPublished'
import { slugField } from '@/payload/fields/slug'

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'startDate', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    ...slugField(),
  ],
}
