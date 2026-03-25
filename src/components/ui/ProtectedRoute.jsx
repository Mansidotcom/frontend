import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((store) => store.user)

  // user not logged in
  if (!user) {
    return <Navigate to="/login" />
  }

  // admin route but user not admin
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />
  }

  // ✅ MOST IMPORTANT (THIS WAS MISSING)
  return children
}

export default ProtectedRoute
