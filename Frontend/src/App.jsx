import "bootstrap/dist/css/bootstrap.min.css"
import ProductDetails from "./ProductDetails"
import Header from "./Header"
import Footer from "./Footer"
import Product from "./Product"
import CartList from "./CartList"
import Home from "./Home"
import ScrollTop from "./ScrollTop"
import { Link } from "react-router-dom"
import Helpcenter from "./Helpcenter"
import Shippinginfo from "./Shippinginfo"
import  Returns  from "./Returns"
import Privacypolicy from "./Privacypolicy"
import Checkout from "./Checkout"
import OrderSuccess from "./OrderSuccess"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState,useEffect } from "react"

export default function App() {

  useEffect(()=>{

  const savedTheme = localStorage.getItem("theme")

  if(savedTheme === "dark"){
    document.body.classList.add("dark")
  }

},[])

  const [search,setSearch] = useState("")


  return (
    
    <BrowserRouter>

      <Header search={search} setSearch={setSearch}/>
      
      
      <Routes>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/" element={<Home/>} />
        <Route path="/product" element={<Product search={search} />} />
        <Route path="/cartlist" element={<CartList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/helpcenter" element={<Helpcenter />} />
        <Route path="/shippinginfo" element={<Shippinginfo />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />
        <Route path="*" element={<h1 className="text-center text-3xl mt-20">404 Not Found</h1>} />

        

      </Routes>

      <Footer/>
      <ScrollTop />

    </BrowserRouter>
  )
}