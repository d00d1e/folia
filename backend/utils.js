import jwt from "jsonwebtoken";

//jwt
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "hereisthesecret",
    {
      expiresIn: "30d",
    }
  );
};

//authenticate users
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    // Authorization: Bearer <token>
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "hereisthesecret",
      (err, decode) => {
        if (err) {
          req.status(401).send({ message: "Invalid token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    req.status(201).send({ message: "No token" });
  }
};
