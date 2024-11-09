'use client'

import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Breadcrumbs from './Breadcrumbs'

function Header() {
  const user = useUser()

  return (
    <header className="flex items-center justify-between p-4">
      {user && (
        <h1 className="text-2xl">
          {user.user?.firstName} {`'s`} Space
        </h1>
      )}

      <Breadcrumbs />

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
export default Header
