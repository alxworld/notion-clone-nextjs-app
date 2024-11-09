'use client'

import { useRoom } from '@liveblocks/react/suspense'
import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { LiveBlockYjsProvider } from '@liveblocks/yjs'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from './ui/button'

function Editor() {
  const room = useRoom()
  const [doc, setDoc] = useState<Y.Doc>() // document content
  const [provider, setProvider] = useState<Y.LiveBlockYjsProvider>()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const styleDarkMode = `hover:text-white ${isDarkMode ? 'text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700' : 'text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700'}`

  useEffect(() => {
    const yDoc = new Y.Doc()
    const provider = new LiveBlockYjsProvider(room, yDoc)
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        {/* Translate Document */}
        {/* Chat To Document */}

        {/* Dark Mode */}
        <Button className={styleDarkMode} onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      {/* BlockNote */}
    </div>
  )
}
export default Editor
