import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearCart } from "./redux/slice"
import "bootstrap/dist/css/bootstrap.min.css"

const STEPS = ["Delivery", "Payment", "Review"]

const EMPTY_DELIVERY = {
  name: "", email: "", phone: "",
  address: "", city: "", state: "", pincode: ""
}

const EMPTY_PAYMENT = {
  method: "card",
  cardNumber: "", expiry: "", cvv: "", cardName: "",
  upiId: ""
}

export default function Checkout() {
  const cartItems = useSelector(s => s.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [delivery, setDelivery] = useState(EMPTY_DELIVERY)
  const [payment, setPayment] = useState(EMPTY_PAYMENT)
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  const subtotal = cartItems.reduce((t, i) => t + i.price * i.quantity, 0)
  const tax = subtotal * 0.18
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + tax + shipping

  // ── validation ──────────────────────────────────────────────
  const validateDelivery = () => {
    const e = {}
    if (!delivery.name.trim()) e.name = "Name is required"
    if (!delivery.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(delivery.email)) e.email = "Enter a valid email"
    if (!delivery.phone.trim()) e.phone = "Phone is required"
    else if (!/^\d{10}$/.test(delivery.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit number"
    if (!delivery.address.trim()) e.address = "Address is required"
    if (!delivery.city.trim()) e.city = "City is required"
    if (!delivery.state.trim()) e.state = "State is required"
    if (!delivery.pincode.trim()) e.pincode = "Pincode is required"
    else if (!/^\d{6}$/.test(delivery.pincode)) e.pincode = "Enter a valid 6-digit pincode"
    return e
  }

  const validatePayment = () => {
    const e = {}
    if (payment.method === "card") {
      if (!payment.cardName.trim()) e.cardName = "Name on card is required"
      if (!payment.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) e.cardNumber = "Enter a valid 16-digit card number"
      if (!payment.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) e.expiry = "Enter expiry as MM/YY"
      if (!payment.cvv.match(/^\d{3}$/)) e.cvv = "Enter a valid 3-digit CVV"
    }
    if (payment.method === "upi") {
      if (!payment.upiId.trim()) e.upiId = "UPI ID is required"
      else if (!payment.upiId.includes("@")) e.upiId = "Enter a valid UPI ID (e.g. name@upi)"
    }
    return e
  }

  const next = () => {
    if (step === 0) {
      const e = validateDelivery()
      if (Object.keys(e).length) { setErrors(e); return }
    }
    if (step === 1) {
      const e = validatePayment()
      if (Object.keys(e).length) { setErrors(e); return }
    }
    setErrors({})
    setStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const back = () => {
    setErrors({})
    setStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const placeOrder = () => {
    setPlacing(true)
    setTimeout(() => {
      dispatch(clearCart())
      const order = {
        id: "ORD" + Date.now(),
        items: cartItems,
        delivery,
        payment: { method: payment.method },
        subtotal, tax, shipping, total,
        date: new Date().toISOString()
      }
      localStorage.setItem("lastOrder", JSON.stringify(order))
      navigate("/order-success")
    }, 1500)
  }

  // ── field helpers ────────────────────────────────────────────
  const d = (field, val) => setDelivery(prev => ({ ...prev, [field]: val }))
  const p = (field, val) => setPayment(prev => ({ ...prev, [field]: val }))
  const err = field => errors[field] ? <span className="field-error">{errors[field]}</span> : null

  const fmtCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
  const fmtExpiry = v => {
    const raw = v.replace(/\D/g, "").slice(0, 4)
    return raw.length >= 3 ? raw.slice(0, 2) + "/" + raw.slice(2) : raw
  }

  if (cartItems.length === 0 && !placing) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <button className="shop-btn" onClick={() => navigate("/product")}>Go Shopping</button>
      </div>
    )
  }

  return (
    <div className="checkout-page">

      {/* STEPPER */}
      <div className="stepper">
        {STEPS.map((label, i) => (
          <div key={label} className={`step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}>
            <div className="step-circle">{i < step ? "✓" : i + 1}</div>
            <span>{label}</span>
            {i < STEPS.length - 1 && <div className="step-line" />}
          </div>
        ))}
      </div>

      <div className="checkout-body">

        {/* ── STEP 0: DELIVERY ── */}
        {step === 0 && (
          <div className="checkout-form">
            <h2>Delivery details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Full name:  </label>
                <input value={delivery.name} onChange={e => d("name", e.target.value)} placeholder="Ravi Kumar" className={errors.name ? "input-error" : ""} />
                {err("name")}
              </div>
              <div className="form-group">
                <label>Email:   </label>
                <input value={delivery.email} onChange={e => d("email", e.target.value)} placeholder="ravi@example.com" className={errors.email ? "input-error" : ""} />
                {err("email")}
              </div>
            </div>

            <div className="form-group">
              <label>Phone number:   </label>
              <input value={delivery.phone} onChange={e => d("phone", e.target.value)} placeholder="10-digit mobile number" maxLength={10} className={errors.phone ? "input-error" : ""} />
              {err("phone")}
            </div>

            <div className="form-group">
              <label>Address:  </label>
              <input value={delivery.address} onChange={e => d("address", e.target.value)} placeholder="House no., Street, Area" className={errors.address ? "input-error" : ""} />
              {err("address")}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City:  </label>
                <input value={delivery.city} onChange={e => d("city", e.target.value)} placeholder="Chennai" className={errors.city ? "input-error" : ""} />
                {err("city")}
              </div>
              <div className="form-group">
                <label>State:  </label>
                <input value={delivery.state} onChange={e => d("state", e.target.value)} placeholder="Tamil Nadu" className={errors.state ? "input-error" : ""} />
                {err("state")}
              </div>
              <div className="form-group">
                <label>Pincode:  </label>
                <input value={delivery.pincode} onChange={e => d("pincode", e.target.value)} placeholder="635109" maxLength={6} className={errors.pincode ? "input-error" : ""} />
                {err("pincode")}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 1: PAYMENT ── */}
        {step === 1 && (
          <div className="checkout-form">
            <h2>Payment method</h2>

            <div className="payment-tabs">
              {["card", "upi", "cod"].map(m => (
                <button key={m} className={`pay-tab ${payment.method === m ? "active" : ""}`} onClick={() => p("method", m)}>
                  {m === "card" ? "💳 Card" : m === "upi" ? "📱 UPI" : "💵 Cash on Delivery"}
                </button>
              ))}
            </div>

            {payment.method === "card" && (
              <div className="card-form">
                <div className="form-group">
                  <label>Name on card</label>
                  <input value={payment.cardName} onChange={e => p("cardName", e.target.value)} placeholder="Ravi Kumar" className={errors.cardName ? "input-error" : ""} />
                  {err("cardName")}
                </div>
                <div className="form-group">
                  <label>Card number</label>
                  <input value={payment.cardNumber} onChange={e => p("cardNumber", fmtCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} className={errors.cardNumber ? "input-error" : ""} />
                  {err("cardNumber")}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry</label>
                    <input value={payment.expiry} onChange={e => p("expiry", fmtExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} className={errors.expiry ? "input-error" : ""} />
                    {err("expiry")}
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input value={payment.cvv} onChange={e => p("cvv", e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="123" maxLength={3} className={errors.cvv ? "input-error" : ""} />
                    {err("cvv")}
                  </div>
                </div>
                <p className="secure-note">🔒 Your card details are encrypted and secure</p>
              </div>
            )}

            {payment.method === "upi" && (
              <div className="form-group" style={{ marginTop: "16px" }}>
                <label>UPI ID</label>
                <input value={payment.upiId} onChange={e => p("upiId", e.target.value)} placeholder="yourname@upi" className={errors.upiId ? "input-error" : ""} />
                {err("upiId")}
                <p className="secure-note">📱 You'll get a payment request on your UPI app</p>
              </div>
            )}

            {payment.method === "cod" && (
              <div className="cod-note">
                <p>💵 Pay in cash when your order is delivered.</p>
                <p>No extra charges apply.</p>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: REVIEW ── */}
        {step === 2 && (
          <div className="checkout-form">
            <h2>Review your order</h2>

            <div className="review-section">
              <div className="review-header">
                <span>Delivery to</span>
                <button className="edit-btn" onClick={() => setStep(0)}>Edit</button>
              </div>
              <p>{delivery.name}</p>
              <p>{delivery.address}, {delivery.city}, {delivery.state} – {delivery.pincode}</p>
              <p>{delivery.phone} · {delivery.email}</p>
            </div>

            <div className="review-section">
              <div className="review-header">
                <span>Payment</span>
                <button className="edit-btn" onClick={() => setStep(1)}>Edit</button>
              </div>
              <p>
                {payment.method === "card" && `💳 Card ending in ${payment.cardNumber.replace(/\s/g, "").slice(-4)}`}
                {payment.method === "upi" && `📱 UPI — ${payment.upiId}`}
                {payment.method === "cod" && "💵 Cash on Delivery"}
              </p>
            </div>

            <div className="review-section">
              <div className="review-header"><span>Items ({cartItems.length})</span></div>
              {cartItems.map(item => (
                <div className="review-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title.slice(0, 50)}</p>
                    <p className="review-price">₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDER SUMMARY SIDEBAR */}
        <div className="checkout-summary">
          <h3>Order summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Tax (18%)</span><span>₹{tax.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
          <hr />
          <div className="summary-total"><span>Total</span><span>₹{total.toFixed(2)}</span></div>

          <div className="checkout-actions">
            {step > 0 && <button className="back-btn" onClick={back}>← Back</button>}
            {step < 2 && <button className="next-btn" onClick={next}>Continue →</button>}
            {step === 2 && (
              <button className="place-btn" onClick={placeOrder} disabled={placing}>
                {placing ? "Placing order..." : "Place order"}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}