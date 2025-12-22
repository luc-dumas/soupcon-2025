import type { Access } from 'payload'
import type { User } from '@/payload-types'

const admin: Access = ({ req }) => {
  const user = req.user as User | null
  return user?.role === 'admin'
}

export default admin
