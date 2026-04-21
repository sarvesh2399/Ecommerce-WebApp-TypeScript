import { Link } from "react-router";
import "./Header.css";

type Props = {
  cart: { quantity: number }[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export const Header = ({ cart, setSearchQuery, searchQuery }: Props) => {
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
            <div className="logo-style">
              <h1 className="logo-text">SSP</h1>

              <img
                className="logo-image"
                src="images/diamond.png"
              // src="images/diamond.png"
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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