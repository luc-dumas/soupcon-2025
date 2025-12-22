import type { FieldHook } from 'payload'

export const defaultFirstUserRole: FieldHook = async ({ req, originalDoc }) => {
  // updates: don't override
  if (originalDoc) return undefined

  const existing = await req.payload.find({
    collection: 'users',
    limit: 1,
  })

  // if this is the first user, force admin no matter what the UI sent
  if (existing.totalDocs === 0) return 'admin'

  // otherwise default to partner (if blank)
  return undefined
}
