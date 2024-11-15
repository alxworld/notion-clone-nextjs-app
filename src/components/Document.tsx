'use client'

import { FormEvent, useEffect, useState, useTransition } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Editor from './Editor'
import useOwner from '@/lib/useOwner'
import DeleteDocument from './DeleteDocument'
import InviteUser from './InviteUser'
import ManageUsers from './ManageUsers'
import Avatars from './Avatars'

function Document({ id }: { id: string }) {
  const [input, setInput] = useState('')
  const [isUpdating, startTransition] = useTransition()
  const [data, loading, error] = useDocumentData(doc(db, 'documents', id))
  // Custom Hook
  const isOwner = useOwner()

  useEffect(() => {
    // fetch document title
    if (data) {
      setInput(data.title)
      console.log('loading: ', loading)
      console.log('error: ', error)
    }
  }, [data, error, loading])

  const updateTitle = (e: FormEvent) => {
    e.preventDefault()

    if (input.trim()) {
      startTransition(async () => {
        // update title
        console.log('updating title')
        await updateDoc(doc(db, 'documents', id), {
          title: input,
        })
      })
    }
  }

  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          {/* update title */}
          <Input
            value={input}
            onChange={e => {
              setInput(e.target.value)
            }}
          />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? 'Updating...' : 'Update'}
          </Button>

          {/* if owner, allow to edit, else disable */}
          {isOwner && (
            <>
              {/* Invite User Option */}
              <InviteUser />
              {/* Delete Document Option */}
              <DeleteDocument />
            </>
          )}
        </form>
      </div>

      <div className="flex flex-1 gap-4 p-4">
        {/* Manage Users */}
        <ManageUsers />

        {/* Avatars */}
        <Avatars />
      </div>

      {/* Collabrative Editor */}
      <Editor />
    </div>
  )
}
export default Document
