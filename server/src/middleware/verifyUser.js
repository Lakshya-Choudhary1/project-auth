import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
  try {

    // Passport session-based auth
    if (req.isAuthenticated?.() && req.user) {
      return next();
    }

    // JWT-based auth
    const token = req.cookies?.[process.env.JWT_TOKEN_NAME];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("verifyUser error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default verifyUser;