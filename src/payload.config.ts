import { postgresAdapter } from '@payloadcms/db-postgres'

import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Events } from '@/payload/collections/Events'
import { Pages } from '@/payload/collections/Pages'
import { Users } from '@/payload/collections/Users'
import { defaultLexical } from '@/payload/fields/defaultLexical'
import { Footer } from '@/payload/globals/Footer/config'
import { Header } from '@/payload/globals/Header/config'

import { getServerSideURL } from '@/lib/utils/getURL'
import { plugins } from './payload/plugins'

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    // Disable automatic schema push to avoid interactive column-rename prompts.
    // Use explicit migrations instead (`pnpm payload migrate:create` then `pnpm payload migrate`).
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URI!,
    },
  }),
  collections: [Users, Events, Pages],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
  plugins: [
    ...plugins
  ],
})

  // During development, you can enable auto-login to test different permission levels. In your payload.config.ts:
//   autoLogin: process.env.NEXT_PUBLIC_ENABLE_AUTOLOGIN === 'true' ? {
//   email: 'nick+user@midlowebdesign.com',
//   password: 'user',
// } : false,
