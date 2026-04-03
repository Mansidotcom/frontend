import OrderCard from '@/components/OrderCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ShowUserOrder = () => {
  const { userId } = useParams()
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

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/orders/user-order/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    if (res.data.success) {
      setUserOrders(res.data.orders)
    }
  }


  return (
    <div>
      <OrderCard userOrder={userOrder} />
    </div>
  )
}

export default ShowUserOrder
