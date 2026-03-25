import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userLogo from '../assets/user.png'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Trash2 } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setCart } from '@/redux/productSlice'
import { toast } from 'sonner'

const Cart = () => {
  const { cart } = useSelector(state => state.product)
  const items = cart?.items || []

  const subtotal = cart?.totalPrice || 0
  const shipping = subtotal > 299 ? 0 : 10
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const API = `${import.meta.env.VITE_API_BASE_URL}/cart`
  const accessToken = localStorage.getItem('accessToken')

  const loadCart = async ()=>{
   try{
    const res = await axios.get(API, {
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    })
    if(res.data.success){
      dispatch(setCart(res.data.cart))
    }
   }
   catch(error){

   }
  }

  const handleUpdateQuantity = async (productId, type) => {
    if (!productId) return

    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (res.data.success) {
        dispatch(setCart(res.data.cart))
      }
    } catch (error) {
      console.log(error)
    }
  }
   
const handleRemove = async (productId) => {
  try {
    const res = await axios.delete(
      `${API}/remove`,
      {
        data: { productId }, //DELETE me body yahin aati hai
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (res.data.success) {
      dispatch(setCart(res.data.cart || { items: [], totalPrice: 0 }));
      toast.success("Product removed from cart")
    }
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  loadCart()
}, [dispatch])

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {items.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-7">
            Shopping Cart
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* CART ITEMS */}
            <div className="flex-1 flex flex-col gap-4 md:gap-5">
              {items.map((product, index) => {
                // ✅ SAFETY GUARD (MOST IMPORTANT)
                if (!product?.productId) return null

                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow-sm gap-4"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={
                          product.productId.productimg?.[0]?.url
                        }
                        alt=""
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                      />

                      <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-sm sm:text-base truncate">
                          {product.productId.productName}
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                          ₹ {product.productId.productPrice}
                        </p>
                      </div>
                    </div>

                    {/* QUANTITY AND ACTIONS */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                      {/* QUANTITY */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateQuantity(
                              product.productId._id,
                              'decrease'
                            )
                          }
                        >
                          -
                        </Button>

                        <span className="px-2 min-w-[2rem] text-center">{product.quantity}</span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateQuantity(
                              product.productId._id,
                              'increase'
                            )
                          }
                        >
                          +
                        </Button>
                      </div>

                      {/* ITEM TOTAL */}
                      <p className="font-semibold text-sm sm:text-base whitespace-nowrap">
                        ₹{product.productId.productPrice * product.quantity}
                      </p>

                      {/* REMOVE */}
                      <button
                        onClick={() => handleRemove(product.productId._id)}
                        className="flex text-red-500 items-center gap-1 cursor-pointer hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ORDER SUMMARY */}
            <Card className="w-full lg:w-[400px]">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹ {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹ {shipping}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹ {tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹ {total.toFixed(2)}</span>
                </div>

                <Button 
                onClick={()=>navigate('/address')}
                className="w-full bg-pink-600">
                  PLACE ORDER
                </Button>

                <Button variant="outline" className="w-full">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-20 text-gray-500">
          <ShoppingCart className="w-16 h-16" />
          <h2 className="mt-4 text-xl font-bold">
            Your Cart is Empty
          </h2>
          <Button
            onClick={() => navigate('/products')}
            className="mt-4 bg-pink-600"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cart
