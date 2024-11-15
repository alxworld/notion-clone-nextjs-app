import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import liveblocks from '../../lib/liveblocks'
import { adminDB } from '../../../firebase-admin'

export async function POST(req: NextRequest) {
  // authenticate the user
  const { sessionClaims } = await auth()
  const { room } = await req.json()

  console.log('sessionClaims', sessionClaims)

  if (!sessionClaims?.email) {
    return NextResponse.json({ error: 'Email is required for authentication' }, { status: 400 })
  }
  const session = liveblocks.prepareSession(sessionClaims.email, {
    userInfo: {
      name: sessionClaims?.fullName,
      email: sessionClaims?.email,
      avatar: sessionClaims?.image,
    },
  })

  const usersInRoom = await adminDB.collectionGroup('rooms').where('userId', '==', sessionClaims?.email).get()

  const userInRoom = usersInRoom.docs.find(doc => doc.id === room)

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS)
    const { body, status } = await session.authorize()
    console.log('You are authorized to access this room. ')
    return new Response(body, { status })
  } else {
    return NextResponse.json({ error: 'You are not allowed to access this room' }, { status: 403 })
  }
}
