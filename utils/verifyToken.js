import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = (req, res, next) => {
  if (!req.session) {
    return next(createError(401, "You are not authenticated"));
  }
  jwt.verify(
    req.session.accessToken,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return next(createError(403, "Invalid token"));
      }
      req.user = decoded;
      next();
    }
  );
};
