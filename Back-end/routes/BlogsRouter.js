import express from 'express';
import { upload } from '../middleware/MulterMiddleware.js';
import { BlogsController, deleteBlog, getAllBlogs, getUserBlogs, ShowBlog, updateBlog } from '../controllers/BlogsController.js';
import { LoginMiddleware } from '../middleware/LoginMiddleware.js';

const router = express.Router();

router.post("/creat/blogs",upload.single("coverImage"),LoginMiddleware,BlogsController)
router.get("/blogs/all",getAllBlogs)
router.get("/blog/:id",ShowBlog)
router.get("/blogs/user/:id",getUserBlogs)
router.delete("/blogs/:id",LoginMiddleware,deleteBlog)
router.put('/blog/update/:id', upload.single('coverImage'), LoginMiddleware, updateBlog);
export default router;