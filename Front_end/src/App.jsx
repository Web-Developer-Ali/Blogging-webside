// src/App.js
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import CreateBlog from './pages/CreateBlog';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from './components/AppLayout';
import axios from 'axios';
import { context } from './main';
import BlogDetails from './pages/BlogDetails';
import MyBlog from './pages/MyBlog';
import UpdateBlogForm from './pages/UpdateBlogForm';

function App() {
  const { setIsAuthenticated, setUser } = useContext(context);

  const getData = async () => {
    try {
      const response = await axios.get(`https://blogging-webside-backend.vercel.app/api/getUser`,{ withCredentials: true });
      setIsAuthenticated(true);
      console.log(response)
      setUser(response.data.user);
      redirect("/"); // Navigate to the home page after successful response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        redirect("/login"); // Navigate to the login page on error
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/my-blogs/:id" element={<MyBlog />} />
          <Route path="/blog/update/:id" element={<UpdateBlogForm />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;
