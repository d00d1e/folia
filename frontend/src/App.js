import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomeView from "./views/HomeView";
import ProductView from "./views/ProductView";


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <a className="brand" href="/">Folia</a>
            </div>
            <div>
              <a href="/cart">Cart</a>
              <a href="/signin">Sign In</a>
            </div>
          </header>
          <main>
            <Route exact path="/product/:id" component={ProductView} />
            <Route exact path="/" component={HomeView} />
          </main>
          <footer className="row center">All rights reserved</footer>
        </div>
      </BrowserRouter>
    )
  }
}
