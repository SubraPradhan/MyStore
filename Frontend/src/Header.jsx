import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

const Header = ({search,setSearch}) => {

  const items = useSelector((state)=>state.cart) || []

  const count = items.reduce(
    (sum,item)=> sum + item.quantity,
    0
  )
  const [openCart,setOpenCart] = useState(false)
  
  const location = useLocation()   // ✅ must be inside component

  const [dark,setDark] = useState(localStorage.getItem("theme") === "dark")

  const toggleTheme = () => {

    const newTheme = !dark
    setDark(newTheme)

    if(newTheme){
      document.body.classList.add("dark")
      localStorage.setItem("theme","dark")
    }else{
      document.body.classList.remove("dark")
      localStorage.setItem("theme","light")
    }

  }

  return (

    <header className="header">

      <div className="logo">
        <h2>MyStore</h2>
      </div>

      {/* ✅ Show search only on product page */}
      {location.pathname === "/product" && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
      )}

      <nav>
        <Link to="/">Home</Link>
        <Link to="/product">Products</Link>
        <Link to="/cartlist" className="cart-link">
          🛒 Cart
          <span className="cart-count">{count}</span>
        </Link>
      </nav>

      <button className="theme-btn" onClick={toggleTheme}>
        {dark ? "☀️" : "🌙"}
      </button>

    </header>
  )
}

export default Header;