import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { AreaChart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const AdminSales = () => {
  const [state, setStates] = useState({
    totalUsers: 0,
    totalProduct: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: []
  });

  const fetchStates = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken")
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/orders/sales`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        setStates(res.data)
      }
    }
    catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    fetchStates()
  }, [])

  return (
    <div className='pl-[350px] bg-gray-100 py-20 pr-20 mx-auto px-4'>
      <div className='p-6 grid gap-6 lg:grid-cols-4'>
        {/*starts card*/}
        <Card className="bg-pink-500 text:white shadow">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{state.totalUsers}</CardContent>
        </Card>

        <Card className="bg-pink-500 text:white shadow">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{state.totalProduct}</CardContent>
        </Card>

        <Card className="bg-pink-500 text:white shadow">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{state.totalOrders}</CardContent>
        </Card>

        <Card className="bg-pink-500 text:white shadow">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{state.totalSales}</CardContent>
        </Card>

        {/* sales chart */}

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales (Last 30 Days)</CardTitle>
          </CardHeader>

          <CardContent style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={state.sales}>
                <XAxis dataKey="date" />    
                <YAxis />                  
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#F47286"
                  fill="#fbcfe8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
      admisales
    </div>
  )
}

export default AdminSales
