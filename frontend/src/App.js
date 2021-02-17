import React, { Component } from 'react';
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
              {
                data.products.map(product => (
                  <div className="card">
                    <a href="product.html">
                      <img className="medium" src={product.image} alt="product" />
                    </a>
                    <div className="card-body">
                      <a href="product.html">
                        <h2>{product.name}</h2>
                      </a>
                      <div className="rating">
                        <span><i className="fas fa-star"></i></span>
                        <span><i className="fas fa-star"></i></span>
                        <span><i className="fas fa-star"></i></span>
                        <span><i className="fas fa-star"></i></span>
                        <span><i className="far fa-star"></i></span>
                      </div>
                      <div className="price">{product.price}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </main>
          <footer className="row center">All rights reserved</footer>
        </div>
      </div>
    )
  }
}
