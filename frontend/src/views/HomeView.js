import React, { useEffect } from "react";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Hero from "./Hero";

export default function HomeView() {
  const dispatch = useDispatch(); //dispatch redux action inside components
  const productList = useSelector((state) => state.productList); //get obj from redux store
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Hero />
      <h2 className="home-header">The Folia collection</h2>
      <div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
