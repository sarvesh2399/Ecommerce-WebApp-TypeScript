import { Header } from "../../components/header/Header";
import React, { Fragment, useEffect, useState } from "react";
import "./OrdersPage.css";
import { Link } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export const OrdersPage = ({ cart, loadCart }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/orders?expand=products");
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  const filteredOrders = orders.filter((order) => {
    for (let i = 0; i < order.products.length; i++) {
      const productName = order.products[i].product.name.toLowerCase();
      const query = searchQuery.toLowerCase();

      if (productName.includes(query)) {
        return true; // keep this order
      }
    }
    return false; // remove this order
  });
  return (
    <>
      <title>Orders</title>
      <Header
        cart={cart}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {filteredOrders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    const addToCart = async () => {
                      await axios.post("/api/cart-items", {
                        productId: orderProduct.product.id,
                        quantity: 1,
                      });
                      await loadCart();
                    };
                    return (
                      <Fragment key={orderProduct.product.id}>
                        <div className="product-image-container">
                          <img src={orderProduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                              "MMMM D",
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span
                              className="buy-again-message"
                              onClick={addToCart}
                            >
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <Link
                            to={`/tracking/${order.id}/${orderProduct.product.id}`}
                          >
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
