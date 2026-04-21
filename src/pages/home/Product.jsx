import axios from "axios";
import React, { useState } from "react";
import { formatMoney } from "../../utils/money";
import { ProductQuantityContainer } from "../../components/home/ProductQuantityContainer";

export const Product = ({ product, loadCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity: quantity,
    });
    setShowAdded(true);

    await loadCart();

    setTimeout(() => {
      setShowAdded(false);
    }, 2000);
  };

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
    // console.log(quantitySelected)
  };

  return (
    <>
      <div className="product-container">
        <div className="product-image-container">
          <img className="product-image" src={product.image} />
        </div>

        <div className="product-name limit-text-to-2-lines">{product.name}</div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`../../public/images/ratings/rating-${product.rating.stars * 10}.png`}
          />
          <div className="product-rating-count link-primary">
            {product.rating.count}
          </div>
        </div>

        <div className="product-price">{formatMoney(product.priceCents)}</div>

        <ProductQuantityContainer
          quantity={quantity}
          selectQuantity={selectQuantity}
        />

        <div className="product-spacer"></div>

        {showAdded && (
          <div className="added-to-cart">
            <img src="../../public/images/icons/checkmark.png" />
            Added
          </div>
        )}

        <button
          className="add-to-cart-button button-primary"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};
