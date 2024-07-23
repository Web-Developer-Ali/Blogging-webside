// src/pages/MyBlog.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { context } from '../main';
import ConfirmationModal from '../components/ConfirmationModal';
import { toast } from 'react-toastify';

const MyBlog = () => {
  const { isAuthenticated, user  } = useContext(context);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`https://bloging-webside.vercel.app/api/blogs/user/${user._id}`);
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
        setLoading(false);
      }
    };

    if (isAuthenticated && user) {
      fetchUserBlogs();
    }
  }, [isAuthenticated, user]);

  const handleDelete = (blogId) => {
    setSelectedBlogId(blogId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
     const responce = await axios.delete(`https://bloging-webside.vercel.app/api/blogs/${selectedBlogId}`, {
        withCredentials: true,
      });
      setBlogs(blogs.filter((blog) => blog._id !== selectedBlogId));
      toast.success(responce.data.message);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error(responce.error.data.message);
      setIsModalOpen(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6"> Please Login</h1>
        <div className="text-center">
          <p className="mb-4 text-gray-700 dark:text-gray-300">You must be logged in to see Your Blogs post.</p>
          <Link to="/login" className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (blogs.length === 0) {
    return <div>No blogs found.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-gray-800 dark:bg-gray-900 dark:text-white mb-4">My Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {blog.coverImage && (
              <img src={blog.coverImage.url} alt={blog.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{blog.title}</h2>
              <p className="text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
              <Link to={`/blogs/${blog._id}`} className="text-blue-500 hover:underline mr-4">
                View
              </Link>
              <Link to={`/blog/update/${blog._id}`} className="text-yellow-500 hover:underline mr-4">
                  Update
                </Link>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default MyBlog;
