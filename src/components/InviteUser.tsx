'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FormEvent, useState, useTransition } from 'react'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { inviteUser } from '../../actions/actions'
import { toast } from 'sonner'
import { Input } from './ui/input'

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const router = useRouter()

  const handleInvite = async (e: FormEvent) => {
    console.log('Inviting User to Room')

    e.preventDefault()

    const roomId = pathname.split('/').pop()
    console.log('Room ID:', roomId)

    if (!roomId) return

    startTransition(async () => {
      const { success } = await inviteUser(roomId, email)

      if (success) {
        setIsOpen(false)
        setEmail('')
        router.replace('/')
        toast.success('User added to Room sucessfully.')
      } else {
        toast.error('Failed to add user to room.')
      }
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to Invite User?</DialogTitle>
          <DialogDescription>This action cannot be undone. </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleInvite} className="flex gap-2">
          <Input
            type="email"
            placeholder="email"
            className="w-full"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
          />

          <Button type="submit" disabled={!email || isPending}>
            {isPending ? 'Inviting...' : 'Invite'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InviteUser
