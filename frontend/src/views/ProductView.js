import React from 'react'
import { Link } from "react-router-dom"
import Rating from "../components/Rating"
import data from "../data"

export default function ProductView(props) {
  const product = data.products.find(x => x._id === props.match.params.id)

  if (!product) {
    return <div>Product Not Found</div>
  }

  return (
    <div className="container">
      <Link to="/"><i className="fas fa-chevron-left"></i> Back to Products</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name} />
        </div>
        <div className="col-1">
          <ul>
            <li><h1>{product.name}</h1></li>
            <li><em><p>{product.altName}</p></em></li>
            <li><Rating rating={product.rating} numReviews={product.numReviews} /></li>
            <li><i className="fas fa-tag"></i> ${product.price}</li>
            <li><p>{product.description}</p></li>
            <li><i className="fas fa-sun"></i> {product.lighting}</li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div className="status">
                    {product.countInStock > 0 ? (
                        <span className="success">{product.countInStock} left in stock!</span>
                      ) : (
                        <span className="danger">Out of Stock</span>
                      )}
                  </div>
                </div>
              </li>
              <li>
                <button className="primary block">Add to Cart</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
