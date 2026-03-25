import React from 'react'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'
import AdminSales from './pages/admin/AdminSales'
import AddProduct from '@/pages/admin/AddProduct'
import AdminProduct from './pages/admin/AdminProduct'
import ShowUserOrder from './pages/admin/ShowUserOrder'
import UserInfo from './pages/admin/UserInfo'
import AdminUsers from './pages/admin/AdminUsers'
import ProtectedRoute from './components/ui/ProtectedRoute'
import SingleProduct from './pages/SingleProduct'
import AdminOrders from './pages/admin/AdminOrders'
import AddressForm from './pages/AddressForm'
import OrderSuccess from './pages/OrderSuccess'




const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><Home /><Footer /></>
  },
  {
    path: '/login',
    element: <><Login /></>
  },
  {
    path: '/signup',
    element: <><Signup /></>
  },
  {
    path: '/verify',
    element: <><Verify /></>
  },
  {
    path: '/verify/:token',
    element: <><VerifyEmail /></>
  },
  {
    path: '/profile/:userId',
    element: <ProtectedRoute><><Navbar /><Profile /></></ProtectedRoute>
  },
  {
    path: '/products',
    element: <><Navbar /><Products /></>
  },

 {
    path: '/products/:id',
    element: <><Navbar /><SingleProduct /></>
  },

  {
    path: '/cart',
    element: <ProtectedRoute><><Navbar /><Cart /></></ProtectedRoute>
  },

 {
    path: '/address',
    element: <ProtectedRoute><><AddressForm /></></ProtectedRoute>
  },

   {
    path: '/order-success',
    element: <ProtectedRoute><><OrderSuccess /></></ProtectedRoute>
  },

  {
    path: '/dashboard',
    element: <ProtectedRoute adminOnly={true}><Navbar/><Dashboard /></ProtectedRoute>,
    children: [
      {
        path: 'products',
        element: <AdminProduct />
      },
      {
        path: 'add-product',
        element: <AddProduct />
      },

      {
        path: 'orders',
        element: <AdminOrders />
      },
      {
        path: 'users/orders/:userId',
        element: <ShowUserOrder />
      },
      {
        path: 'users',
        element: <AdminUsers />
      },
      {
        path: 'users/:id',
        element: <UserInfo />
      },
      {
        path: 'sales',   
        element: <AdminSales />
      }
    ]
  }


])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
