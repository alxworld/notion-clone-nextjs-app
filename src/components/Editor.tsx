'use client'

import { useRoom, useSelf } from '@liveblocks/react/suspense'
import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from './ui/button'
import { BlockNoteView } from '@blocknote/shadcn'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/shadcn/style.css'

import { BlockNoteEditor } from '@blocknote/core'
import { useCreateBlockNote } from '@blocknote/react'
import stringToColor from '@/lib/stringToColor'
import TranslateDocument from './TranslateDocument'
import ChatToDocument from './ChatToDocument'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EditorProps = {
  doc: Y.Doc
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any
  darkMode: boolean
}

function BlockNote({ doc, provider, darkMode }: EditorProps) {
  const userInfo = useSelf(me => me.info)
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment('document-store'),
      user: {
        name: userInfo?.name,
        color: stringToColor(userInfo?.email),
      },
    },
  })
  return (
    <div className="relative max-w-6xl mx-auto">
      <BlockNoteView editor={editor} className="min-h-screen" theme={darkMode ? 'dark' : 'light'} />
    </div>
  )
}

function Editor() {
  const room = useRoom()
  const [doc, setDoc] = useState<Y.Doc>() // document content
  const [provider, setProvider] = useState<LiveblocksYjsProvider>()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const yDoc = new Y.Doc()
    const provider = new LiveblocksYjsProvider(room, yDoc)
    setDoc(yDoc)
    setProvider(provider)

    // cleanup - when you leave the room
    return () => {
      yDoc?.destroy()
      provider?.destroy()
    }
  }, [room])

  if (!doc || !provider) {
    return null
  }

  const styleDarkMode = `hover:text-white ${isDarkMode ? 'text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700' : 'text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700'}`

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        {/* Translate Document */}
        <TranslateDocument doc={doc} />
        {/* Chat To Document */}
        <ChatToDocument doc={doc} />

        {/* Dark Mode */}
        <Button className={styleDarkMode} onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      {/* BlockNote */}
      <BlockNote doc={doc} provider={provider} darkMode={isDarkMode} />
    </div>
  )
}

export default Editor
