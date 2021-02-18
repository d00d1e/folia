import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CartView from "./views/CartView";

import HomeView from "./views/HomeView";
import ProductView from "./views/ProductView";

export default function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Folia
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <sup className="badge">{cartItems.length}</sup>
              )}
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Route exact path="/cart/:id?" component={CartView} />
          <Route exact path="/product/:id" component={ProductView} />
          <Route exact path="/" component={HomeView} />
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}
