// BlogDetails.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { context } from "../main";

const BlogDetails = () => {
  const { id } = useParams(); 
    const [blog, setBlog] = useState(null);
  const { setBlogUpdate } = useContext(context);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://bloging-webside.vercel.app/api/blog/${id}`
        );
        setBlog(response.data.blog); 
        setBlogUpdate(response.data.blog)
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>; // Add a loading indicator while fetching data
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900">
      <div className="bg-white  dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {blog.coverImage && (
          <img
            src={blog.coverImage.url}
            alt={blog.title}
            className="w-full h-60 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {blog.title}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="prose dark:text-gray-400"
          />
          <p className="text-gray-500 mt-4">Category: {blog.category}</p>
          <p className="text-gray-500">Published by: {blog.publishBy}</p>
          <p className="text-gray-500">
            Published on: {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
