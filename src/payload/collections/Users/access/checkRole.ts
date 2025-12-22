import type { User } from '@/payload-types'

export const checkRole = (
  allowedRoles: Array<User['role']>,
  user?: User | null
): boolean => {
  if (!user) return false
  return allowedRoles.includes(user.role)
}
