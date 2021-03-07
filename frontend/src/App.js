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
import OrderHistoryView from "./views/OrderHistoryView";
import ProfileView from "./views/ProfileView";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListView from "./views/ProductListView";

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
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Orders</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
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
          <Route exact path="/orderhistory" component={OrderHistoryView} />
          <PrivateRoute exact path="/profile" component={ProfileView} />
          <AdminRoute exact path="/productlist" component={ProductListView} />
          <Route exact path="/" component={HomeView} />
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}
