import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./CheckoutPage.css";
import axios from "axios";
import { CheckoutPageHeader } from "../../components/header/CheckoutPageHeader";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { UpdateQuantity } from "../../components/checkout/UpdateQuantity";

export const CheckoutPage = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  // console.log(cart)
  const navigate = useNavigate();
  const createOrder = async () => {
    await axios.post("/api/orders");
    await loadCart();
    navigate("/orders");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const deliveryOptionsRes = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime",
        );
        setDeliveryOptions(deliveryOptionsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getPaymentSummary = async () => {
      const paymentSummaryRes = await axios.get("/api/payment-summary");
      setPaymentSummary(paymentSummaryRes.data);
    };
    getPaymentSummary();
  }, [cart]);

  // const [quantity, setQuantity] = useState(cartItem.quantity);

  return (
    <>
      <title>Checkout</title>
      <CheckoutPageHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 &&
              cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find(
                  (deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                  },
                );
                const deleteCartItem = async () => {
                  await axios.delete(`api/cart-items/${cartItem.productId}`);
                  await loadCart();
                };

                return (
                  <div key={cartItem.id} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {dayjs(
                        selectedDeliveryOption.estimatedDeliveryTimeMs,
                      ).format("dddd, MMMM D")}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartItem.product.image}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>

                        <div className="product-price">
                          {formatMoney(cartItem.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            Quantity:{" "}
                            <span
                              style={{ marginLeft: "10px", marginRight:"10px" }}
                              className="quantity-label"
                            >
                              <UpdateQuantity
                                cartItem={cartItem}
                                loadCart={loadCart}
                              />
                            </span>
                            <span
                              className="delete-quantity-link link-primary"
                              onClick={deleteCartItem}
                            >
                              Delete
                            </span>
                          </span>
                          <div></div>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.map((deliveryOption) => {
                          let priceString = "FREE Shipping";
                          if (deliveryOption.priceCents > 0) {
                            priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                          }
                          const updateDeliveryOption = async () => {
                            await axios.put(
                              `api/cart-items/${cartItem.productId}`,
                              {
                                deliveryOptionId: deliveryOption.id,
                              },
                            );
                            await loadCart();
                          };
                          // console.log({deliveryOption})
                          return (
                            <div
                              key={deliveryOption.id}
                              className="delivery-option"
                              onClick={updateDeliveryOption}
                            >
                              <input
                                onChange={() => {}}
                                type="radio"
                                checked={
                                  deliveryOption.id ===
                                  cartItem.deliveryOptionId
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    deliveryOption.estimatedDeliveryTimeMs,
                                  ).format("dddd, MMMM D")}
                                </div>
                                <div className="delivery-option-price">
                                  {priceString}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button
                  className="place-order-button button-primary"
                  onClick={createOrder}
                >
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
