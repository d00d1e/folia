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
