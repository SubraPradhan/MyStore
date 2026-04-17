import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector, useDispatch } from "react-redux";
import { removeItem, increaseQty, decreaseQty, clearCart } from "./redux/slice";
import { Link, useNavigate } from "react-router-dom";

const CartList = () => {

  const cartItems = useSelector(state => state.cart) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Price calculations
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.18;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  return (

    <div className="cart-container">

      <div className="cart-items">

        {cartItems.length === 0 ? (
          <h2 className="Empty">
            Your cart is empty 🛒
            <br />
            <Link to="/product">
              <button className="shop-btn">Go Shopping</button>
            </Link>
          </h2>
        ) : (

          cartItems.map((item) => (
            <div className="cart-card" key={item.id}>

              <img src={item.image} alt={item.title} />

              <div className="cart-info">

                <h3>{item.title || item.name}</h3>

                <p>₹{item.price}</p>

                <div className="qty">

                  <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => dispatch(increaseQty(item.id))}>+</button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>

              </div>

            </div>
          ))

        )}

      </div>

      {cartItems.length > 0 && (

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax (18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>

          <button
            className="clear-btn"
            onClick={() => {
              if (window.confirm("Are you sure you want to clear the cart?")) {
                dispatch(clearCart())
              }
            }}
          >
            Clear Cart
          </button>


        </div>

      )}

    </div>

  );
};

export default CartList;


//