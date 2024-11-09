import { Liveblocks } from '@liveblocks/node'

const key = process.env.NEXT_LIVEBLOCK_PRIVATE_KEY

if (!key) {
  throw new Error('NEXT_LIVEBLOCK_PRIVATE_KEY is required')
}

const liveblocks = new Liveblocks({ secret: key })

export default liveblocks
