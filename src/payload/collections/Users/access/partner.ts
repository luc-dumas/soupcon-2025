import type {Access} from 'payload'
import { checkRole } from './checkRole'

const partner: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'partner'], user)) {
      return true
    }
  }

  return false
}

export default partner