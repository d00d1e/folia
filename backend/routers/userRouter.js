import express from "express";
import expressAsynHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import data from "../data.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

//seed user data
userRouter.get(
  "/seed",
  expressAsynHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

//user signin
userRouter.post(
  "/signin",
  expressAsynHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

export default userRouter;
