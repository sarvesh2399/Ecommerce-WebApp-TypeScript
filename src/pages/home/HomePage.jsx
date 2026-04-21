import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import axios from "axios";
import "./HomePage.css";
import { Product } from "./Product";

export const HomePage = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const productRes = await axios.get("/api/products");
        setProducts(productRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <title>Ecommerce Project</title>
      <Header
        cart={cart}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />

      <div className="home-page">
        <div className="products-grid">
          {filteredProducts.map((product) => {
            return (
              <Product key={product.id} product={product} loadCart={loadCart} />
            );
          })}
        </div>
      </div>
    </>
  );
};
