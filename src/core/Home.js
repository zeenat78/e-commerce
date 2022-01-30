import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../style.css";
import Base from "./Base";
import NavBar from "./NavBar";
import { getProducts } from "./helper/CoreApiCalls";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <>
      <NavBar />

      <Base title="t-shirts" description="cool t-shirts">
        <div className="row text-center">
          <h1 className="text-white">All of T-Shirts</h1>
          <div className="row">
            {products.map((product, index) => {
              return (
                <div key={index} className="col-md-4 md-4 col-sm-6 mt-2">
                  <Card product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </Base>
    </>
  );
};

export default Home;
