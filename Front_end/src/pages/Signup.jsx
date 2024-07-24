// src/components/SignIn.js
import React, { useContext, useRef, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { context } from '../main';
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const SignUp = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setdob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate(); 
  const { setIsAuthenticated, setUser } = useContext(context);
  const ref = useRef(null);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!FirstName || !LastName || !password || !dob || !gender || !email) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    ref.current.continuousStart(); // Start the loading bar

    const formData = new FormData();
    formData.append('FirstName', FirstName);
    formData.append('LastName', LastName);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('dob', dob);
    formData.append('gender', gender);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await axios.post(
        'https://blogging-webside-backend.vercel.app/api/create/user',
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
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
    } finally {
      setLoading(false);
      ref.current.complete(); // Complete the loading bar
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 shadow-2xl rounded-lg">
        <LoadingBar color="#10b981" height={4} ref={ref} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Sign Up</h2>
        {error && <div className="text-red-500 dark:text-red-400 mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
            <input
              type="text"
              id="FirstName"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white sm:text-sm"
              autoComplete="given-name"
            />
          </div>
          <div>
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
            <input
              type="text"
              id="LastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white sm:text-sm"
              autoComplete="family-name"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white sm:text-sm"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white sm:text-sm"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setdob(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white sm:text-sm"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Gay">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
            <input
              type="file"
              id="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-sm text-center text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-purple-500 hover:text-purple-600">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
