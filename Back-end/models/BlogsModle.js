import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      maxLength: [60, "Title Should not excide from 30 character!"],
    },
    content: {
      type: String,
      require: true,
    },
    publishBy: {
      type: String,
      require: true,
    },
    tags: {
      type: String,
      default:null,
      maxLength: [10, "Tags Should not excide from 10 character!"],
    },
    category: {
      type: String,
      require:true,
      enum: ["technology", "health", "lifestyle", "education"],
    },
    coverImage: {
      public_id: String,
      url: String,
    },
    UserId: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("Blogs",BlogSchema)
export default Blogs
