import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { setProducts, removeFromCart } from './actions';
import Product from './components/Products';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        console.error('Error fetching store data:', error);
      });
  }, []);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const getTotalCost = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total.toFixed(2);
  };

  return (
    <>
      <div className="layout">
        <div className="container">
          <h1 className="title">Redux Shop App</h1>

          <h2 className="title">Products</h2>
          <div className="products-container">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="left-container">
          <h2 className="title">Shopping Cart</h2>
          <div className="shopping-cart-container">
            {cart.map((product) => (
              <div key={product.id} className="shopping-cart-item">
                <div>
                  <img src={product.image} alt={product.title} className="product-image" />
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">{product.price}</p>
                </div>
                <button
                  onClick={() => removeFromCartHandler(product.id)}
                  className="remove-from-cart-button"
                >
                  <BsTrash />
                </button>
              </div>
            ))}
          </div>

          <h2 className="title">Total Cost: ${getTotalCost()}</h2>
        </div>
      </div>
    </>
  );
};

export default App;
