'use client'

import { usePathname } from 'next/navigation'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

function Breadcrumbs() {
  const path = usePathname()
  // http://localhost:3000/doc/8cqbMdsPGZWn9tUK1yGb

  const segments = path.split('/')

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {segments.map((segment, index) => {
          if (segment === 'doc') {
            return (
              // <BreadcrumbItem key={index}>
              //   <BreadcrumbLink href="/">doc</BreadcrumbLink>
              //   <BreadcrumbSeparator />
              // </BreadcrumbItem>
              null
            )
          }

          if (index === segments.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{segment}</BreadcrumbPage>
              </BreadcrumbItem>
            )
          }

          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={`/${segment}`}>{segment}</BreadcrumbLink>
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default Breadcrumbs
