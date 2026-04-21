import   { useState } from "react";
import { ProductQuantityContainer } from "../home/ProductQuantityContainer";
import axios from "axios";

type Props = {
  cartItem: {
    productId: string | number;
    quantity: number;
  };
  loadCart: () => Promise<void>;
};

export const UpdateQuantity = ({ cartItem, loadCart }: Props) => {
  console.log(cartItem);

  const [quantity, setQuantity] = useState(cartItem.quantity);

  const selectQuantity = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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