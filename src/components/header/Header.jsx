import { Link } from "react-router";
import "./Header.css";

export const Header = ({ cart, setSearchQuery, searchQuery }) => {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link
            to="/"
            className="header-link"
            onClick={() => {
              setSearchQuery("");
            }}
          >
            {/* <img style={{height:"45px", width : "100px"}} className="logo" src="../../public/images/logo1.png" /> */}
            <div className="logo-style">
              <h1 className="logo-text">SSP</h1>

              <img
                className="logo-image"
                src="../../public/images/diamond.png"
                alt="logo"
              />
            </div>
          </Link>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
          />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
};
