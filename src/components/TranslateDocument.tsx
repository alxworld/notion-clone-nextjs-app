'use client'

import * as Y from 'yjs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { FormEvent, useState, useTransition } from 'react'
import { BotIcon, LanguagesIcon } from 'lucide-react'
import Markdown from 'react-markdown'

type Language = 'english' | 'spanish' | 'french' | 'german' | 'hindi' | 'tamil'

const languages: Language[] = ['english', 'spanish', 'french', 'german', 'hindi', 'tamil']

function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState<string>('')
  const [summary, setSummary] = useState()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [question, setQuestion] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const documentData = doc.get('document-store').toJSON()
      // const lastQuestion = documentData.questions[documentData.questions.length - 1]
      // setQuestion(lastQuestion)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/translateDocument`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentData,
          targetLanguage: language,
        }),
      })
      if (res.ok) {
        const { translated_text } = await res.json()
        setSummary(translated_text)
        toast.success('Document translated successfully')
      } else {
        toast.error('Failed to translate the document')
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon /> Translate
        </DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the document</DialogTitle>
          <DialogDescription>Select a Language and AI will translate a summary of the document in the selected language</DialogDescription>

          <hr className="mt-5" />

          {question && <p className="mt-5 text-gray-500">Question: {question}</p>}
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
          <Select value={language} onValueChange={val => setLanguage(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>

            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" disabled={!language || isPending}>
            {isPending ? 'Translating...' : 'Translate'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TranslateDocument
