import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { addAddress, deleteAddress, setCart, setSelectedAddress } from '@/redux/productSlice'
import { Label } from '@radix-ui/react-label'
import { Separator } from '@radix-ui/react-select'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  })

  const { cart, addresses, selectedAddress } = useSelector((store) => store.product)
  const [showForm, setShowForm] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    dispatch(addAddress(formData))
    setShowForm(false)
  }

  const subtotal = cart.totalPrice
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2))
  const total = subtotal + shipping + tax

  console.log(cart);

  const handlePayment = async () => {
    const accessToken = localStorage.getItem("accessToken")

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/orders/create-order`,
        {
          products: cart?.items?.map(item => ({
            productId: item.productId,
            quantity: item.quantity
          })),
          tax,
          shipping,
          amount: total,
          currency: "INR"
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      )

      if (!data.success) {
        toast.error("Something went wrong")
        return
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "ekart",
        description: "Order Payment",

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
              response,
              {
                headers: { Authorization: `Bearer ${accessToken}` }
              }
            )

            if (verifyRes.data.success) {
              toast.success("Payment successful")
              dispatch(setCart({ items: [], totalPrice: 0 }))
              navigate("/order-success")
            } else {
              toast.error("Payment verification failed")
            }
          } catch (err) {
            toast.error("Error verifying payment")
          } 
        },

        modal: {
          ondismiss: async function () {
            await axios.post(
              `${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
              {
                razorpay_order_id: data.order.id,
                paymentFailed: true
              },
              {
                headers: { Authorization: `Bearer ${accessToken}` }
              }
            )
            toast.error("Payment cancelled")
          }
        },

        prefill: {
          name: formData.fullname,
          email: formData.email,
          contact: formData.phone
        },

        theme: {
          color: "#472B6"
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while processing payment")
    }
  }

  return (
    <div className="max-w-7xl mx-auto grid place-items-center p-10">
      <div className="grid grid-cols-2 gap-20 mt-10 max-w-7xl mx-auto">
        <div className="space-y-4 p-6 bg-white rounded-lg shadow">

          {showForm ? (
            <>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Zip</Label>
                  <Input
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-black text-white"
              >
                Save & Continue
              </Button>
            </>
          ) : (

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Saved Addresses</h2>

              {addresses.map((addr, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setSelectedAddress(index))}
                  className={`border p-4 rounded-md cursor-pointer ${selectedAddress === index
                      ? "border-pink-600 bg-pink-50"
                      : "border-gray-300"
                    }`}
                >
                  <p className="font-medium">{addr.fullname}</p>
                  <p>{addr.phone}</p>
                  <p>{addr.email}</p>
                  <p>
                    {addr.address}, {addr.city}, {addr.state}, {addr.zip},{" "}
                    {addr.country}
                  </p>
                  <button
                    onClick={(e) => dispatch(deleteAddress(index))}
                    className="absolute text-red-500 hover:text-red-700 text-sm">Delete</button>
                </div>
              ))}

              <Button variant='outline' className="w-full" onClick={() => setShowForm(true)}>+ Add New Address</Button>

              <Button disabled={selectedAddress === null} 
               onClick={handlePayment}
              className="w-full bg-pink-600">Proceed To Checkout</Button>
            </div>
          )}
        </div>

        {/*right side order summary*/}
        <div>
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className='flex justify-between'>
                <span>Subtotal ({cart.items.length}) items</span>
                <span>₹ {subtotal.toLocaleString("en-IN")}</span>
              </div>


              <div className='flex justify-between'>
                <span>Shipping ({cart.length}) items</span>
                <span>₹ {shipping}</span>
              </div>

              <div className='flex justify-between'>
                <span>Tax ({tax}) items</span>
                <span>₹ {subtotal.toLocaleString("en-IN")}</span>
              </div>
              <Separator />
              <div className='flex justify-between font-bold text-lg'>
                <span>Total</span>
                <span>₹ {total}</span>
              </div>

              <div className='text-sm text-muted-foreground pt-4'>
                <p>* Free Shipping on orders over 340</p>
                <p>* 30-days return policy</p>
                <p>* Secure checkout with SSL encryption</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddressForm
