import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

export default function ProductEditView(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [altName, setAltName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [lighting, setLighting] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setAltName(product.altName);
      setPrice(product.price);
      setImage(product.image);
      setLighting(product.lighting);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, product, productId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        altName,
        image,
        price,
        lighting,
        countInStock,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product #{productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="altName">Alt Name</label>
              <input
                id="altName"
                type="text"
                value={altName}
                placeholder="Enter altName"
                onChange={(e) => setAltName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                value={price}
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                value={image}
                placeholder="Enter image"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              />
            </div>
            {loadingUpload && <LoadingBox />}
            {errorUpload && (
              <MessageBox variant="danger">{errorUpload}</MessageBox>
            )}
            <div>
              <label htmlFor="lighting">Lighting</label>
              <input
                id="lighting"
                type="text"
                value={lighting}
                placeholder="Enter lighting"
                onChange={(e) => setLighting(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="countInStock">Count in Stock</label>
              <input
                id="countInStock"
                type="text"
                value={countInStock}
                placeholder="Enter count in stock"
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                type="text"
                rows="5"
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
