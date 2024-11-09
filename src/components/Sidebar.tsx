'use client'

import { MenuIcon } from 'lucide-react'
import NewDocumentButton from './NewDocumentButton'
import SidebarOption from './SidebarOption'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useUser } from '@clerk/nextjs'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { useEffect, useState } from 'react'

interface RoomDocument extends DocumentData {
  createdAt: string
  role: 'owner' | 'editor'
  userId: string
  roomId: string
}

function Sidebar() {
  const { user } = useUser()

  const [data, loading, error] = useCollection(user && query(collectionGroup(db, 'rooms'), where('userId', '==', user?.emailAddresses[0].toString())))

  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[]
    editor: RoomDocument[]
  }>({ owner: [], editor: [] })

  console.log(data)
  console.log(loading)
  console.log(error)

  useEffect(() => {
    if (!data) return
    data.docs.map(doc => {
      console.log(doc.data())
    })
    // reduce data into a grouped object by roomId
    // [doc1, doc2, doc3] => { roomId1: [doc1, doc2], roomId2: [doc3] }
    const grouped = data.docs.reduce<{
      owner: RoomDocument[]
      editor: RoomDocument[]
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument
        if (roomData.role === 'owner') {
          acc.owner.push({ ...roomData, id: curr.id })
        } else {
          acc.editor.push({ ...roomData, id: curr.id })
        }
        return acc
      },
      // initial value
      { owner: [], editor: [] }
    )

    console.log(grouped)
    setGroupedData(grouped)
  }, [data])

  const menuOptions = (
    <>
      <NewDocumentButton />
      {/* My Documents */}
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">No Documents found</h2>
        ) : (
          <>
            <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
            {groupedData.owner.map(doc => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>
      {/* Shared with me */}
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {groupedData.editor.length > 0 && (
          <>
            <h2 className="text-gray-500 font-semibold text-sm">Shared with me</h2>
            {groupedData.owner.map(doc => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>
    </>
  )
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div> {menuOptions} </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  )
}
export default Sidebar
