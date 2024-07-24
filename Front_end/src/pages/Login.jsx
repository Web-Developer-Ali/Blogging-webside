// src/components/Login.js
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { context } from "../main";
import LoadingBar from 'react-top-loading-bar';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(context);
  const ref = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    ref.current.continuousStart(); // Start the loading bar

    try {
      const response = await axios.post(
        'https://blogging-webside-backend.vercel.app/api/login/user',
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      setUser(response.data.user);
      navigateTo("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      setIsAuthenticated(false);
      setUser({});
      setError("Login failed. Please try again later.");
      console.error("Login error:", error);
    } finally {
      ref.current.complete(); // Complete the loading bar
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 shadow-2xl rounded-lg">
        <LoadingBar color="#10b981" height={4} ref={ref} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Log In</h2>
        {error && (
          <div className="text-red-500 dark:text-red-400 mb-4 text-sm">{error}</div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white sm:text-sm"
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white sm:text-sm"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-sm text-center text-gray-700 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="font-medium text-green-500 hover:text-green-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
