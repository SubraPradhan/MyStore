import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./redux/slice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Product = ({ search }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    console.log("useEffectStart")

     fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });

  }, []);

  /* SEARCH FILTER */
  const searchedProducts = products.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  /* CATEGORY FILTER */
  const categoryProducts =
    category === "all"
      ? searchedProducts
      : searchedProducts.filter(item => item.category === category);

  /* PRICE SORT */
  let finalProducts = [...categoryProducts];

  if (sort === "low") {
    finalProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    finalProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return (
      <div className="products">
        {Array(6).fill("").map((_, i) => (
          <div className="product-card skeleton" key={i}></div>
        ))}
      </div>
    );
  }

  return (

    <div>

      {/* FILTER BAR */}
      <div className="filter-bar">

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

      </div>

      <div className="products">

        {finalProducts.map(item => {

          const isInCart = cartItems.some(
            cartItem => cartItem.id === item.id
          );

          return (

            <div className="product-card" key={item.id}>

              {/* BADGE */}
              {item.rating?.rate >= 4.5 ? (
                <span className="badge top">⭐ Top Rated</span>
              ) : item.rating?.count > 300 ? (
                <span className="badge popular">🔥 Popular</span>
              ) : item.price < 50 ? (
                <span className="badge deal">💰 Best Deal</span>
              ) : null}

              {/* IMAGE */}
              <Link to={`/product/${item.id}`} className="product-image">
                <img src={item.image} alt={item.title} />
              </Link>

              {/* TITLE */}
              <h3>{item.title.slice(0, 40)}</h3>

              {/* PRICE */}
              <p>₹{Math.floor(item.price * 80)}</p>

              {/* BUTTON */}
              <button
                onClick={() => {
                  dispatch(addItem({
                    id: item.id,
                    title: item.title,
                    price: Math.floor(item.price * 80),
                    image: item.image
                  }));
                  toast.success("Item added to cart ✅");
                }}
                disabled={isInCart}
                className={isInCart ? "added-btn" : ""}
              >
                {isInCart ? "Added ✓" : "Add to Cart"}
              </button>

              {/* RATING */}
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.round(item.rating?.rate) ? "⭐" : "☆"}
                  </span>
                ))}
                <span className="rating-count">
                  ({item.rating?.count})
                </span>
              </div>

            </div>

          );

        })}

      </div>

    </div>

  );
};

export default Product;