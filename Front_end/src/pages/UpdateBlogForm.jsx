import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { context } from "../main";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";

const UpdateBlogForm = () => {
  const { isAuthenticated } = useContext(context);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [BlogId, setBlogId] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://bloging-webside.vercel.app/api/blog/${id}`
        );
        const fetchedBlog = response.data.blog;
        setBlog(fetchedBlog);
        setTitle(fetchedBlog.title);
        setContent(fetchedBlog.content);
        setBlogId(fetchedBlog._id);
        setTags(fetchedBlog.tags);
        setCategory(fetchedBlog.category);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageUpload = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('category', category);
    if (coverImage) formData.append('coverImage', coverImage);

    try {
      const response = await axios.put(`https://bloging-webside.vercel.app/api/blog/update/${BlogId}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);

      // Reset all input fields
      setTitle('');
      setContent('');
      setTags('');
      setCategory('');
      setCoverImage(null);

    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Update Blog Post
        </h1>
        <div className="text-center">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            You must be logged in to update a blog post.
          </p>
          <Link
            to="/login"
            className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Update Blog Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Content
          </label>
          <Editor
            apiKey="bdyu8n8lxv62ucbvj6v820qx8koyb6p7r6zdnd0x3meys80c" // Replace with your actual TinyMCE API key
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
              content_css: isDarkMode
                ? "https://cdn.tiny.cloud/1/no-api-key/tinymce/5.10.0/skins/ui/oxide-dark/skin.min.css"
                : "https://cdn.tiny.cloud/1/no-api-key/tinymce/5.10.0/skins/ui/oxide/skin.min.css",
              content_style: isDarkMode
                ? "body { background-color: #1a202c; color: #cbd5e0; }" // Dark mode
                : "body { background-color: #fff; color: #000; }", // Light mode
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            required
          >
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Change Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-gray-500 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlogForm;
