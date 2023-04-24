import React from 'react'
import Cart from '../pages/Cart.jsx'
import Checkout from '../pages/Checkout.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import ProductDetails from '../pages/ProductDetails.jsx'
import Shop from '../pages/Shop.jsx'
import Signup from '../pages/Signup.jsx'
import { Routes,Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.js'

const Routers = () => {
  return (
    <>
    <Routes>
        <Route path = "/" element = {<Navigate to = "home"/>} /> 
        <Route path = "home" element = {<Home />} />
        <Route path = "shop" element = {<Shop />} />
        <Route path = "shop/:id" element = {<ProductDetails />} />
        <Route path = "cart" element = {<Cart />} />
        <Route path = "checkout" element = {<ProtectedRoute>
          <Checkout />
        </ProtectedRoute>} />
        <Route path = "login" element = {<Login />} />
        <Route path = "signup" element = {<Signup />} />
    </Routes>
    </>
  )
}

export default Routers