import { Link, useParams } from "react-router";
import { Header } from "../../components/header/Header";
import React, { useEffect, useState } from "react";
import "./TrackingPage.css";
import dayjs from "dayjs";
import axios from "axios";

export const TrackingPage = ({ cart }) => {
  const { orderId, productId } = useParams();

  const [orders, setOrders] = useState([]);

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

  const order = orders.find((o) => o.id === orderId);

  if (!order) return <div>Loading...</div>;

  const product = order.products.find(
    (p) => p.product.id === productId
  );

  // if (!product) return <div>Product not found</div>;

  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(product.estimatedDeliveryTimeMs).format("MMMM D")}
          </div>

          <div className="product-info">
            {product.product.name}
          </div>

          <div className="product-info">
            Quantity: {product.quantity}
          </div>

          <img
            className="product-image"
            src={product.product.image}
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
};