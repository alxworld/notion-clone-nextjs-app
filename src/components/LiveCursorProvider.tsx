'use client'

import { useMyPresence, useOthers } from '@liveblocks/react/suspense'
import { PointerEvent } from 'react'
import FollowPointer from './FollowPointer'

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
  // const [myPresence, updateMyPresence] = useMyPresence() // myPresence is removed as it is not used
  const [, updateMyPresence] = useMyPresence()
  const others = useOthers()

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    // Update my presence
    const cursor = { x: Math.floor(event.pageX), y: Math.floor(event.pageY) }
    updateMyPresence({ cursor })
  }

  function handlePointerLeave() {
    // Remove my cursor
    updateMyPresence({ cursor: null })
  }

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {others
        .filter(other => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer key={connectionId} info={info} x={presence.cursor!.x} y={presence.cursor?.y} />
        ))}
      {children}
    </div>
  )
}
export default LiveCursorProvider
