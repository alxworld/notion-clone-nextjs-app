import { auth } from '@clerk/nextjs/server'

import RoomProvider from '@/components/RoomProvider'
import * as React from 'react'

//function DocLayout({ children, params: { id } }: { children: React.ReactNode; params: { id: string } }) {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DocLayout({ children, params }: { children: React.ReactNode; params: any }) {
  auth.protect() // this redirects to /sign-in if not authenticated
  const { id } = React.use(params)
  return <RoomProvider roomId={id}>{children}</RoomProvider>
}
export default DocLayout
