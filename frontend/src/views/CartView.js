import React from "react";

export default function CartView(props) {
  const productId = props.match.params.id;
  //get qty value from route
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  return (
    <div>
      <h1>Cart View</h1>
      <p>
        Add to Cart: ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
}
