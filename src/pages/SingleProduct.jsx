import React from 'react'
import Breadcrums from '@/components/Breadcrums'
import ProductImg from '@/components/ProductImg'
import ProductDesc from '@/components/ProductDesc'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
  const { id } = useParams()
  const { products } = useSelector(store => store.product)

  const product = products.find(item => item._id === id)

  if (!product) {
    return <div className="pt-20 text-center">Loading...</div>
  }

  return (
    <div className="pt-20 py-10 max-w-7xl mx-auto">
      <Breadcrums product={product} />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 items-start gap-8">
        <ProductImg images={product.productimg} />
        <ProductDesc product={product} />
      </div>
    </div>
  )
}

export default SingleProduct
