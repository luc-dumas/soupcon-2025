import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/lib/utils/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  
  const staticNavItems: NonNullable<Header['navItems']> = [
    {
      id: 'static-calendar',
      link: {
        type: 'custom',
        newTab: false,
        url: '/calendar',
        label: 'Calendar',
        reference: null,
      },
    },
    {
      id: 'static-contact',
      link: {
        type: 'custom',
        newTab: false,
        url: '/contact',
        label: 'Contact',
        reference: null,
      },
    },
    {
      id: 'static-auth', // 👈 rename id (optional but nice)
      link: {
        type: 'custom',
        newTab: false,
        url: '',           // 👈 leave empty
        label: 'Auth',     // 👈 THIS is the important change
        reference: null,
      },
    },
  ]
  const cmsNavItems = headerData?.navItems ?? []

    // de-dupe by resolved href (custom url OR referenced slug)
    const hrefOf = (item: any) => {
      if (item?.link?.type === 'custom') return item?.link?.url
      if (item?.link?.type === 'reference') return `/${item?.link?.reference?.value?.slug}`
      return null
    }

    const mergedNavItems = [
      ...staticNavItems,
      ...cmsNavItems.filter((cmsItem) => {
        const cmsHref = hrefOf(cmsItem)
        return !staticNavItems.some((s) => hrefOf(s) === cmsHref)
      }),
    ]

    return (
      <HeaderClient
        data={{
          ...headerData,
          navItems: mergedNavItems,
        }}
      />
    )

  // return <HeaderClient data={headerData} />
}
