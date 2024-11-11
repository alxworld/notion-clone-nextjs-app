'use server'

//import { doc } from 'firebase/firestore'
import { adminDB } from '../firebase-admin'
import { auth } from '@clerk/nextjs/server'
import liveblocks from '@/lib/liveblocks'

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

export async function deleteDocument(roomId: string) {
  auth.protect() // ensure the user is authenticated

  console.log('Deleting document ', roomId)

  try {
    // STEP ONE - deleting doc in documents collection
    await adminDB.collection('documents').doc(roomId).delete()

    // STEP TWO - now we need to delete in users collection, wherever this room id is present
    // first fectch this list
    const query = await adminDB.collectionGroup('rooms').where('roomId', '==', roomId).get()
    // get batch and delete each
    const batch = adminDB.batch()
    query.docs.forEach(doc => {
      batch.delete(doc.ref)
    })
    await batch.commit()
    // STEP 3 - delete the room in liveblocks
    await liveblocks.deleteRoom(roomId)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function inviteUser(roomId: string, email: string) {
  auth.protect() // ensure the user is authenticated
  console.log('Inviting User to ', roomId, ' for user ', email)

  try {
    await adminDB.collection('users').doc(email).collection('rooms').doc(roomId).set({ userId: email, role: 'editor', createdAt: new Date(), roomId })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function removeUserFromDocument(roomId: string, userId: string) {
  auth.protect() // ensure the user is authenticated
  console.log('RemoveUserFromDocument ', roomId, ' - ', userId)

  try {
    await adminDB.collection('users').doc(userId).collection('rooms').doc(roomId).delete()
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}
