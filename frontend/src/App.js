import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signout } from "./actions/userActions";

import CartView from "./views/CartView";
import HomeView from "./views/HomeView";
import ProductView from "./views/ProductView";
import SigninView from "./views/SigninView";
import RegisterView from "./views/RegisterView";
import ShippingView from "./views/ShippingView";
import PaymentView from "./views/PaymentView";
import OrderView from "./views/OrderView";
import OrderDetailsView from "./views/OrderDetailsView";

export default function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              folia
              <sup>
                <i className="fab fa-pagelines fa-xs"></i>
              </sup>
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <sup className="badge">{cartItems.length}</sup>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route exact path="/cart/:id?" component={CartView} />
          <Route exact path="/product/:id" component={ProductView} />
          <Route exact path="/signin" component={SigninView} />
          <Route exact path="/register" component={RegisterView} />
          <Route exact path="/shipping" component={ShippingView} />
          <Route exact path="/payment" component={PaymentView} />
          <Route exact path="/order" component={OrderView} />
          <Route exact path="/order/:id" component={OrderDetailsView} />
          <Route exact path="/" component={HomeView} />
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}
