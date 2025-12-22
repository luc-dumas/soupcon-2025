import type { Metadata } from 'next'
import PageClient from './page.client'

export const metadata: Metadata = {
  title: 'Calendar',
}

export default function CalendarPage() {
  return (
      <div>
         Calendar Page
         <PageClient />
      </div>
      )

}
