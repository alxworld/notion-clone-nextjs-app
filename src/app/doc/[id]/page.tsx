'use client'
import * as React from 'react'

import Document from '@/components/Document'

type tParams = Promise<{ id: string }>

function DocumentPage({ params }: { params: tParams }): JSX.Element {
  //function DocumentPage({ params: tParams }: { params: tParams }): JSX.Element {
  //const idRef = React.useRef<string | null>(null)
  let id: string = ''

  React.useEffect(() => {
    async function fetchData() {
      const fetchedId = await params
      id = fetchedId
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  )
}
export default DocumentPage
