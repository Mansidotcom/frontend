import OrderCard from '@/components/OrderCard'
import axios from 'axios'
import React, { useEffect,useState } from 'react'



const MyOrder = () => {
  const [userOrder, setUserOrders] = useState([
   {
    _id: "ORDER123",
    amount: 999,
    currency: "INR",
    user: {
      firstName: "Renu",
      lastName: "Sharma",
      email: "renu@gmail.com"
    }
  },
  {
    _id: "ORDER124",
    amount: 1499,
    currency: "INR",
    user: {
      firstName: "Amit",
      lastName: "Verma",
      email: "amit@gmail.com"
    }
  },
  {
    _id: "ORDER125",
    amount: 799,
    currency: "INR",
    user: {
      firstName: "Pooja",
      lastName: "Singh",
      email: "pooja@gmail.com"
    }
  },
  {
    _id: "ORDER126",
    amount: 2199,
    currency: "INR",
    user: {
      firstName: "Rahul",
      lastName: "Mehta",
      email: "rahul@gmail.com"
    }
  }
  ])



  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken")

    
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/orders/my-orders`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )


      if (res.data.success) {
        setUserOrders(res.data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }


  
  return (
   <>
   <OrderCard userOrder={userOrder}/>
   </>
  )

}

export default MyOrder
