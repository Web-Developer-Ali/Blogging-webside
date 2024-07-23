import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      require: true,
      maxlenght: 50,
      trim: true,
    },
    LastName: {
      type: String,
      require: true,
      maxlenght: 50,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    dob: {
      type: Date,
      default: null,
    },
    password: {
      type: String, // store the encrypted password
      require: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Gay"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return Jwt.sign(
    {
      id: this._id,
      email: this.email,
      Fullname: this.fullname,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JET_EXPIRE,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
export default User;
