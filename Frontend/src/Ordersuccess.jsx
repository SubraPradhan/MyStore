import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

export default function OrderSuccess() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    try {
      const data = localStorage.getItem("lastOrder")
      if (data) setOrder(JSON.parse(data))
    } catch {
      // ignore
    }
  }, [])

  const formatDate = iso => {
    const d = new Date(iso)
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
  }

  const estimatedDelivery = () => {
    const d = new Date()
    d.setDate(d.getDate() + 5)
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div className="success-page">
      <div className="success-card">

        <div className="success-icon">✓</div>
        <h1>Order placed!</h1>
        <p className="success-sub">Thank you for your purchase. We'll send updates to your email.</p>

        {order && (
          <>
            <div className="order-meta">
              <div className="meta-item">
                <span>Order ID</span>
                <strong>{order.id}</strong>
              </div>
              <div className="meta-item">
                <span>Date</span>
                <strong>{formatDate(order.date)}</strong>
              </div>
              <div className="meta-item">
                <span>Est. delivery</span>
                <strong>{estimatedDelivery()}</strong>
              </div>
              <div className="meta-item">
                <span>Total paid</span>
                <strong>₹{order.total.toFixed(2)}</strong>
              </div>
            </div>

            <div className="success-items">
              {order.items.map(item => (
                <div className="success-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title.slice(0, 55)}</p>
                    <p className="success-item-price">₹{item.price} × {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="delivery-address">
              <strong>Delivering to:</strong>
              <p>{order.delivery.name}</p>
              <p>{order.delivery.address}, {order.delivery.city}, {order.delivery.state} – {order.delivery.pincode}</p>
            </div>
          </>
        )}

        <div className="success-actions">
          <Link to="/product">
            <button className="shop-btn">Continue shopping</button>
          </Link>
          <Link to="/">
            <button className="back-btn">Go home</button>
          </Link>
        </div>

      </div>
    </div>
  )
}