'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useTransition } from 'react'
import { createDocument } from '../../actions/actions'

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleCreateNewDocument = () => {
    // Create a new document
    startTransition(async () => {
      const { docId } = await createDocument()
      router.push(`/document/${docId}`)
    })
  }

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? 'Creating...' : 'New Document'}
    </Button>
  )
}

export default NewDocumentButton
