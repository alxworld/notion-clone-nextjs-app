'use client'
import * as React from 'react'
import Document from '@/components/Document'
import { useEffect, useState } from 'react'

type tParams = { id: string }

function DocumentPage({ params }: { params: Promise<tParams> }): JSX.Element {
  const [resolvedParams, setResolvedParams] = useState<tParams | null>(null)

  useEffect(() => {
    async function resolveParams() {
      const unwrappedParams = await params // Unwrap the Promise
      setResolvedParams(unwrappedParams)
    }
    resolveParams()
  }, [params])

  if (!resolvedParams) {
    return <div>Loading...</div> // Handle loading state
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={resolvedParams.id || ''} />
    </div>
  )
}

export default DocumentPage
