import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCartProduct } from "./helper/CartHelper";
import NavBar from "./NavBar";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCartProduct());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>Your Cart</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtocart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <Base title="Cart Page" description="Ready to checkout">
        <div className="row text-center ">
          <div className="col-4 ">
            {products.length > 0 ? (
              loadAllProducts(products)
            ) : (
              <h3>No Products</h3>
            )}
          </div>
        </div>
      </Base>
    </>
  );
};

export default Cart;
