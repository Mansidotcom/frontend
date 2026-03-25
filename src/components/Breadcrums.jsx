import React from 'react'
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const Breadcrums = ({product}) => {
  return (
    <nav>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
         <BreadcrumbLink href="/products">products</BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{product.productName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </nav>
  )
}

export default Breadcrums
