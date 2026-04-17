import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "./redux/slice"
import { toast } from "react-toastify"

const ProductDetails = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart)

  useEffect(() => {

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching product:", err)
        setLoading(false)
      })

  }, [id])

  if (loading) {
    return (
      <div className="product-details skeleton"></div>
    )
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <p style={{ padding: "40px", color: "red" }}>Failed to load product. Please try again.</p>
      </div>
    )
  }

  const isInCart = cartItems.some(item => item.id === product.id)

  const handleAddToCart = () => {

    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: Math.floor(product.price * 80),
      image: product.image
    }))

    toast.success("Item added to cart ✅")
  }

  return (

    <div className="product-details-page">

      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      <div className="product-details">

        <img src={product.image} alt={product.title} />

        <div className="details-info">

          <h2>{product.title}</h2>

          <p className="category">
            Category: {product.category}
          </p>

          <p className="price">
            ₹{Math.floor(product.price * 80)}
          </p>

          <p className="desc">
            {product.description}
          </p>

          <p className="rating">
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </p>

          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={isInCart ? "added-btn" : "add-btn"}
          >
            {isInCart ? "Added ✓" : "Add To Cart"}
          </button>

        </div>

      </div>

    </div>

  )
}

export default ProductDetails

