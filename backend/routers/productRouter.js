import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from "../utils.js";
import data from "../data.js";

const productRouter = express.Router();

//frontend product list
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

//seed product data
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

//frontend product details
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

//create new product (admin only)
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name" + Date.now(),
      altName: "sample alt name" + Date.now(),
      image: "../img/alocasia.jpg",
      lighting: "shade",
      price: 25,
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

//edit product (admin only)
productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.altName = req.body.altName;
      product.image = req.body.image;
      product.lighting = req.body.lighting;
      product.price = req.body.price;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", deletedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found " });
    }
  })
);

export default productRouter;
