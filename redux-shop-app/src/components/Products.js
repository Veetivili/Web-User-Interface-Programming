import React from 'react';
import { useDispatch } from 'react-redux';
import { BsCartPlus } from 'react-icons/bs';
import { addToCart } from '../actions';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };

  return (
    <div key={product.id} className="product-box">
      <div>
        <img src={product.image} alt={product.title} className="product-image" />
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">{product.price}</p>
      </div>
      <button onClick={addToCartHandler} className="add-to-cart-button">
        <BsCartPlus />
      </button>
    </div>
  );
};

export default Product;