import React, { useState } from "react";
import { ProductQuantityContainer } from "../home/ProductQuantityContainer";
import axios from "axios";

export const UpdateQuantity = ({ cartItem, loadCart }) => {
  console.log(cartItem);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const selectQuantity = async (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
    await axios.put(`api/cart-items/${cartItem.productId}`, {
      quantity: quantitySelected,
    });
    await loadCart();
  };
  return (
    <>
      <ProductQuantityContainer
        quantity={quantity}
        selectQuantity={selectQuantity}
      />
    </>
  );
};
