import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Edit, Eye, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import UserLogo from "../../assets/user.png"
import { Button } from '@/components/ui/button'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const  navigate  = useNavigate()


  const getAllUsers = async () => {

    const accessToken = localStorage.getItem("accessToken")
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/all-users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data.success) {
        setUsers(res.data.users)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

 const filteredUsers = users.filter(user=>
  `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase())
 )
   

  useEffect(() => {
    getAllUsers();

  }, [])


  return (

    <div className='pl-[350px] py-20 pr-20 mx-auto px-4'>
      <h1 className='font-bold text-2xl'>User Management</h1>
      <p>view and manage registered users</p>
      <div className='flex relative w-[300px] mt-6'>
        <Search className='absolute left-2  top-1 text-gray-600 w-5' />
        <Input type="text" 
         value={searchTerm} 
         onChange={(e)=>setSearchTerm(e.target.value)}
        className="pl-10" placeholder="Search Users..." />
      </div>
      <div className='grid grid-cols-3 gap-7 mt-7'>
        {
          filteredUsers.slice(0, 2).map((user, index) => {
            console.log("USER:", users)

            
            return <div key={index} className='bg-pink-100 p-5 rounded-lg'>
              <div className='flex items-center gap-2'>
                <img src={user?.profilePic || UserLogo} alt=""
                  className='rounded-full w-16 aspect-square object-cover border border-pink-600'
                />
                <div>
                  <h1>{user?.firstname} {user?.lastname}</h1>
                  <h3>{user?.email}</h3>
                </div>
              </div>

              <div className='flex gap-3 mt-3'>
                <Button onClick={()=>navigate(`/dashboard/users/${user._id}`)}  variant='outline'><Edit/>Edit</Button>
                <Button onClick={()=>navigate(`/dashboard/users/orders/${user._id}`)}  variant='outline'><Eye />Show Order</Button>
              </div>
            </div>
          }) 
        }
      </div>

      <Outlet />
    </div>
  )
}

export default AdminUsers
