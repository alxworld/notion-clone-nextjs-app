'use client'
import * as React from 'react'

import Document from '@/components/Document'

type tParams = { id: string }

function DocumentPage({ params }: { params: tParams }): JSX.Element {
  //function DocumentPage({ params: tParams }: { params: tParams }): JSX.Element {
  //const idRef = React.useRef<string | null>(null)

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={params.id || ''} />
    </div>
  )
}
export default DocumentPage
