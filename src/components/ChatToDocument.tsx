'use client'

import * as Y from 'yjs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FormEvent, useState, useTransition } from 'react'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { BotIcon, MessageCircleCode } from 'lucide-react'
import Markdown from 'react-markdown'

function ChatToDocument({ doc }: { doc: Y.Doc }) {
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [summary, setSummary] = useState('')
  const [question, setQuestion] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleAskQuestion = async (e: FormEvent) => {
    console.log('Handling AskQuestion')
    e.preventDefault()
    setQuestion(input)

    startTransition(async () => {
      const documentData = doc.get('document-store').toJSON()
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chatToDocument`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentData,
          question: input,
        }),
      })
      if (res.ok) {
        const { message } = await res.json()
        setInput('')
        setSummary(message)
        toast.success('Question asked successfully')
      } else {
        toast.error('Failed to ask the question')
      }
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <MessageCircleCode /> Chat to Document
        </DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat to the Document!</DialogTitle>
          <DialogDescription>Ask a question and chat to the document with AI</DialogDescription>

          <hr className="mt-5" />

          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        </DialogHeader>

        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">GPT {isPending ? 'is thinking...' : 'Says: '}</p>
            </div>
            <p>{isPending ? 'Thinking...' : <Markdown>{summary}</Markdown>}</p>
          </div>
        )}

        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <Input
            type="text"
            placeholder="i.e. What is this about?"
            className="w-full"
            value={input}
            onChange={e => {
              setInput(e.target.value)
            }}
          />

          <Button type="submit" disabled={!input || isPending}>
            {isPending ? 'Asking...' : 'Ask'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChatToDocument