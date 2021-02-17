import React, { Component } from 'react';
import Product from "./components/Product";
import data from './data';

export default class App extends Component {
  render() {
    return (
      <div className="App">
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
            <div className="row center">
              {data.products.map(product => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </main>
          <footer className="row center">All rights reserved</footer>
        </div>
      </div>
    )
  }
}
