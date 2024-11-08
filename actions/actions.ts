'use server'

import { adminDB } from '../firebase-admin'
import { auth } from '@clerk/nextjs/server'

export async function createDocument() {
  //auth().protect()

  const { sessionClaims } = await auth()

  const docCollectionRef = adminDB.collection('documents')
  const docRef = await docCollectionRef.add({
    title: 'New Document',
    content: 'dummy document content',
    created: new Date(),
    updated: new Date(),
  })

  if (!sessionClaims?.email) {
    throw new Error('User email is undefined')
  }

  await adminDB.collection('users').doc(sessionClaims.email).collection('rooms').doc(docRef.id).set({
    userId: sessionClaims.email,
    role: 'owner',
    createdAt: new Date(),
    roomId: docRef.id,
  })

  return { docId: docRef.id }
}
