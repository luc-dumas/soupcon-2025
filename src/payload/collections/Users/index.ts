import type { CollectionConfig, User } from 'payload'
import { protectRoles } from './hooks/protectRoles'
import admin from './access/admin'
import { canReadUsers } from './hooks/canReadUsers'
import { checkRole } from './access/checkRole'
import { defaultFirstUserRole } from './hooks/defaultFirstUserRole'




export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: admin,
    read: canReadUsers,
    update: admin,
    delete: admin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      access: {
        update: ({ req: { user } }) => checkRole(['admin'], user as User),
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Partner', value: 'partner' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'partner',
      admin: {
        condition: (_, { operation }) => {
          // hide ONLY when creating a user
          return operation !== 'create'
        },
      },
      hooks: {
        beforeChange: [protectRoles, defaultFirstUserRole],
      },
      access: {
        update: ({ req: { user } }) => checkRole(['admin'], user as User),
        read: ({ req: { user } }) => checkRole(['admin'], user as User),
      },
    }
  ],
  timestamps: true,
}
