import type { CollectionConfig, User } from 'payload'
import { protectRoles } from './hooks/protectRoles'
import admin from './access/admin'
import editor from './access/editor'
import user from './access/user'
import { checkRole } from './access/checkRole'



export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: editor,
    read: user,
    update: user,
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
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      hooks: {
        beforeChange: [protectRoles], // we'll define this next
      },
      access: {
        update: ({ req: { user } }) => checkRole(['admin'], user as User),
      },
    }
  ],
  timestamps: true,
}
