'use client'
import * as React from 'react'

import Document from '@/components/Document'

// function DocumentPage({ params: { id } }): { params: { id: string } } {
function DocumentPage({ params }): { params } {
  const { id } = React.use(params)
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  )
}
export default DocumentPage
