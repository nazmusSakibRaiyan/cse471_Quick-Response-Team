import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  let token = req.header("Authorization");
  console.log("Token:", token); 
  token = token && token.startsWith("Bearer") ? token.split(" ")[1] : null; 

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    console.log("Token received:", token); 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); 
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error); 
    res.status(400).json({ message: "Invalid token" });
  }
};
