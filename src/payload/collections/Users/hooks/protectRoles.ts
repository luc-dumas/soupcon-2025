import type { FieldHook } from 'payload'
import type { User } from '@/payload-types'

export const protectRoles: FieldHook = ({ req, data, originalDoc }) => {
  // First-user bootstrap: nobody is logged in yet, allow whatever default/hook sets
  if (!req.user) return data?.role

  const me = req.user as User
  const isAdmin = me.role === 'admin'

  // non-admins can’t set their role higher than partner (or can’t change at all)
  if (!isAdmin) return originalDoc?.role ?? 'partner'

  return data?.role
}