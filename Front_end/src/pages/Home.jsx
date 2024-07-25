import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { context } from '../main';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { setBlogUpdate } = useContext(context);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://blogging-webside-backend.vercel.app/api/blogs/all');
        setBlogs(response.data.blogs);
        setBlogUpdate(false)
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen">
    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Latest Blogs</h1>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map(blog => (
        <div key={blog._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {blog.coverImage && (
            <img src={blog.coverImage.url} alt={blog.title} className="w-full h-40 object-cover" />
          )}
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{blog.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{blog.excerpt}</p>
            <Link to={`/blogs/${blog._id}`} className="mt-2 block text-blue-500 dark:text-blue-400 hover:underline">
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Home;
