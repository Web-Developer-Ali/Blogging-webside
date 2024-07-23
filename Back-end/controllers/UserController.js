import User from "../models/UserModel.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js";
import { jwtToken } from "../utils/jwtToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createUser = catchAsyncErrors(async (req, res, next) => {
  const { FirstName, LastName, email, dob, gender, password } = req.body;

  if (!FirstName || !LastName || !email || !dob || !gender || !password) {
    return next(new ErrorHandler("All Fields are Required", 400));
  }

  let CheckUserExsitence = await User.findOne({ email });

  if (CheckUserExsitence) {
    return next(new ErrorHandler("User Already Registered", 400));
  }
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    return next(new ErrorHandler("Avatar image is required", 400));
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar image to Cloudinary");
  }
  const registerUser = await User.create({
    FirstName,
    LastName,
    email,
    dob,
    gender,
    password,
    avatar: avatar.url,
  });
  const user = await User.findById(registerUser._id).select(
    "-password -createdAt -updatedAt"
  );

  jwtToken(user, "User Registered Successfully!", 200, res);
});

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return next(new ErrorHandler("All Fields are Required", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 400));
  }
  const matchPassword = await user.isPasswordCorrect(password);
  if (!matchPassword) {
    return next(new ErrorHandler("Invalid  password", 400));
  }
  const loginUser = await User.findById(user._id).select("-password");
  jwtToken(loginUser, "User Login Successfully!", 200, res);
});

const getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
});

const LogoutUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.User;
  if (token) {
    res
      .status(200)
      .clearCookie("User")
      .json({ message: "User Logout Successfully" });
  }
});

// const getUser = async(req,res)=>{
//   const user= await User.findById("668ed8577b3a408c9b2ed296")
//   res.json({user}).status(200)
//  }
export { createUser, loginUser, getUserDetails, LogoutUser };
