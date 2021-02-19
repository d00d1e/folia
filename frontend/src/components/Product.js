import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;

  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <div className="row">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <div className="price">{product.price}</div>
        </div>
        <div className="rating">
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
      </div>
    </div>
  );
}
