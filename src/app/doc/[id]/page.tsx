'use client'
import * as React from 'react'

import Document from '@/components/Document'

type tParams = { id: string }

//function DocumentPage({ params: { id } }): { params: { id: string } ): JSX.Element {
function DocumentPage({ params: tParams }: { params: tParams }): JSX.Element {
  const { id } = tParams
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  )
}
export default DocumentPage
