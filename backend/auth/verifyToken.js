import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // Get token from headers
  const authHeader = req.headers.authorization;

  // Check if token exists and is formatted correctly
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authorization denied",
    });
  }

  try {
    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Verify token has required fields
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // Attach to request
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    // Handle specific JWT errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired, please login again",
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    // Handle other errors
    console.error("Authentication error:", err);
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  try {
    const userId = req.userId;

    // Check if user exists in either collection
    const [patient, doctor] = await Promise.all([
      User.findById(userId).select("-password"),
      Doctor.findById(userId).select("-password"),
    ]);

    const user = patient || doctor;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check role authorization
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }

    // Attach full user object to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Authorization error:", err);
    return res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};
