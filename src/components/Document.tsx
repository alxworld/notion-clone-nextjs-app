'use client'

import { FormEvent, useEffect, useState, useTransition } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { Edit } from 'lucide-react'
import Editor from './Editor'

function Document({ id }): { id: string } {
  const [input, setInput] = useState('')
  const [isUpdating, startTransition] = useTransition()
  const [data, loading, error] = useDocumentData(doc(db, 'documents', id))

  useEffect(() => {
    // fetch document title
    console.log('fetching document title')
    if (data) {
      setInput(data.title)
    }
  }, [data])

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
    <div>
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
        </form>
      </div>

      <div>
        {/* Manage Users */}

        {/* Avatars */}
      </div>

      {/* Collabrative Editor */}
      <Editor />
    </div>
  )
}
export default Document
