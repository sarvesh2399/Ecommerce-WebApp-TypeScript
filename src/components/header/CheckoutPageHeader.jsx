import React from "react";
import { Link } from "react-router";
import "./CheckoutPageHeader.css";

export const CheckoutPageHeader = ({ cart }) => {

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link className="header-logo-decoration" to="/">
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

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {cart.length} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
    </>
  );
};
