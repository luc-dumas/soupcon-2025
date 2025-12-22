import type { Access } from 'payload'
import type { User } from '@/payload-types'

export const canReadUsers: Access = ({ req }) => {
  const u = req.user as User | null
  if (!u) return false

  if (u.role === 'admin') return true

  return {
    id: { equals: u.id },
  }
}
