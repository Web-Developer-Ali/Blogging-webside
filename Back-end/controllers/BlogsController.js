import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js";
import Blogs from "../models/BlogsModle.js";

const BlogsController = catchAsyncErrors(async (req, res, next) => {
  const { title, content, tags, category } = req.body;
  const UserId = req.user;
  const publishBy = `${UserId.FirstName} ${UserId.LastName}`;
  if (!title || !content || !category) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Check if coverImage is provided
  let cloudinary = { public_id: "", secure_url: "" };
  const coverImagePath = req.file?.path;
  if (coverImagePath) {
    const cloudinaryResponse = await uploadOnCloudinary(coverImagePath);
    cloudinary = cloudinaryResponse;
  }
  console.log(cloudinary)
  
  await Blogs.create({
    title,
    content,
    tags,
    category,
    UserId,
    coverImage: {
      public_id: cloudinary.public_id,
      url: cloudinary.secure_url,
    },
    publishBy,
  });

  res
    .status(200)
    .json({ success: true, message: "Blog successfully uploaded" });
});

const getAllBlogs = catchAsyncErrors(async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

const ShowBlog = catchAsyncErrors(async (req, res) => {
  try {
    const BlogId = req.params.id;
    const blog = await Blogs.findById(BlogId);
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: "Error fetching your blog", error });
  }
});

const getUserBlogs = async (req, res) => {
  try {
    const UserId = req.params.id;
    const blogs = await Blogs.find({ UserId: UserId });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user blogs", error });
  }
};

const deleteBlog = catchAsyncErrors(async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blog = await Blogs.findById(blogId);

    if (!blog) {
      return next(new ErrorHandler("Blog not found", 404));
    }
    const user = req.user;
    // Check if the logged-in user is the author of the blog
    if (`${blog.publishBy}` !== `${user.FirstName} ${user.LastName}`) {
      return next(
        new ErrorHandler("You are not authorized to delete this blog", 404)
      );
    }

    await Blogs.findByIdAndDelete(blogId);
    res.status(200).json({
      success: true,
      message: "Blog successfully deleted!",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return next(new ErrorHandler("Error deleting blog", 500));
  }
});

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, tags, category } = req.body;

    if (!title || !content || !category) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    let blog = await Blogs.findById(id);
    if (!blog) {
      return next(new ErrorHandler("Blog not found", 404));
    }

    // Authorization check
    const { FirstName, LastName } = req.user;
    if (`${blog.publishBy}` !== `${FirstName} ${LastName}`) {
      return next(new ErrorHandler("You are not authorized to update this blog", 403));
    }

    // Handle cover image update
    let coverImage = blog.coverImage;
    if (req.file) {
      const coverImagePath = req.file.path;
      if (coverImage.public_id) {
        await deleteFromCloudinary(coverImage.public_id);
      }
      const cloudinaryResponse = await uploadOnCloudinary(coverImagePath);
      coverImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    // Update blog details
    blog.title = title;
    blog.content = content;
    blog.category = category;
    blog.tags = tags;
    blog.coverImage = coverImage;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return next(new ErrorHandler("Error updating blog", 500));
  }
};


export {
  BlogsController,
  getAllBlogs,
  ShowBlog,
  getUserBlogs,
  deleteBlog,
  updateBlog,
};
