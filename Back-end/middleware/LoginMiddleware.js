import User from "../models/UserModel.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { ErrorHandler } from "./errorMiddleware.js";
import Jwt from "jsonwebtoken";

export const LoginMiddleware = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.User;
 
  if (!token) {
    return next(new ErrorHandler("User not found", 422));
  }

  let decoded;
  try {
    decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    
      } catch (error) {
      return next(new ErrorHandler("Token not Valid", 422));
  }

  if (!decoded) {
    return next(new ErrorHandler("Token not Valid", 422));
  }

  try {
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 422));
    }
    req.user = user;
    next();
  } catch (error) {
       return next(new ErrorHandler("User lookup failed", 422));
  }
});
