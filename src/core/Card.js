import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItemToCart, removeProductFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";
const Card = ({
  product,
  addtocart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const navigate = useNavigate();
  const [navigateCart, setNavigateCart] = useState(false);

  const cardTitle = product ? product.name : "A photo from UnSplash";
  const cardDescription = product ? product.description : "Default description";
  const cardPrice = product ? product.price : "Default";
  const addToCart = () => {
    addItemToCart(product, () => setNavigateCart(true));
  };
  const showCart = (navigateCart) => {
    if (navigateCart) {
      navigate("/cart");
    }
  };
  const showAddToCart = (addtocart) => {
    return (
      addtocart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeProductFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info   ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {showCart(navigateCart)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">{`$ ${cardPrice}`}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtocart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
