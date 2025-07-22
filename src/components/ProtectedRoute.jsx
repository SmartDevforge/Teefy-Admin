"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { LoadingPage } from "./ui/Loading"

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth()

  
  if (isLoading) {
      return (
        <LoadingPage />
      )
    }
  

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
