
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setCart } from '@/redux/productSlice'

const ProductDesc = ({product}) => {

  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch()
  const addToCart = async(productId)=>{
    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) {
      toast.error("Please login to add items to cart")
      return
    }

    try{
     const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/cart/add`, {productId}, {
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
     })
     if(res.data.success){
      toast.success("Product added to cart")
      dispatch(setCart(res.data.cart))
     }
    }
    catch(error){
      console.log("Add to cart error:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.")
        localStorage.removeItem("accessToken")
      } else {
        toast.error("Failed to add product to cart")
      }
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-bold text-4xl text-gray-800'>{product.productName}</h1>
    <p className='text-gray-800'>{product.category} | {product.brand}</p>
    <h2 className='text-pink-500 font-bold text-2xl'>₹ {product.productPrice}</h2>
    <p className='line-clamp-3 text-muted-foreground'>{product.productDesc}</p>
    <div className='flex gap-2 items-center w-full max-w-xs'>
      <p className='text-gray-800 font-semibold'>Quantity :</p>
      <Input type='number' className='w-14'  defaulValue={1}/>
    </div>
    <Button onClick={()=>addToCart(product._id)} className='bg-pink-600 w-max'>Add To Cart</Button>
    </div>
  )
}

export default ProductDesc
