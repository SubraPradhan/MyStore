import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">

      <div className="hero">

        <h1>Welcome to My Store</h1>
        <p>Best deals on fashion, electronics and more</p>

        <Link to="/product">
          <button className="shop-btn">Shop Now</button>
        </Link>

      </div>

    </div>
  )
}

export default Home;