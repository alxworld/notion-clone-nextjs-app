import { auth } from '@clerk/nextjs/server'

import RoomProvider from '@/components/RoomProvider'
import * as React from 'react'

//function DocLayout({ children, params: { id } }: { children: React.ReactNode; params: { id: string } }) {
function DocLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  auth.protect() // this redirects to /sign-in if not authenticated
  const { id } = params
  return <RoomProvider roomId={id}>{children}</RoomProvider>
}
export default DocLayout
