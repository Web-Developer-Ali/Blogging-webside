// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from 'react';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import { context } from '../main';
import UserProfileSidebar from './UserProfileSidebar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useContext(context);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 p-4 border-b border-gray-300 dark:border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-gray-800 dark:text-white text-lg font-bold">Blogging</Link>
        <div className="hidden md:flex flex-1 justify-center space-x-4">
          <Link to="/" className="text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white">Home</Link>
          <Link to="/about" className="text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white">About</Link>
          <Link to="/contact" className="text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white">Contact</Link>
          <Link to="/create-blog" className="text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white">Create Blog</Link>
         {isAuthenticated ? ( <Link to={`/my-blogs/${user._id}`} className="text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white">My Blogs</Link>):(<h1></h1>)}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full py-1 px-4 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search..." 
            />
            <svg 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M12.9 14.32a7 7 0 111.414-1.414l3.85 3.85a1 1 0 01-1.414 1.414l-3.85-3.85zm-6.4-1.82a5 5 0 100-10 5 5 0 000 10z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          {isAuthenticated ? (
            <img 
              src={user.avatar || 'https://via.placeholder.com/40'} 
              alt="User Profile" 
              className="rounded-full h-10 w-10 cursor-pointer"
              onClick={toggleSidebar}
            />
          ) : (
            <Link to="/login" className="bg-blue-500 dark:bg-blue-700 text-white px-3 py-1 text-sm rounded-full hover:bg-blue-700 dark:hover:bg-blue-500">Login</Link>
          )}
          <div className="flex items-center space-x-2">
            <label className="text-gray-800 dark:text-white">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </label>
            <Switch 
              onChange={toggleDarkMode} 
              checked={isDarkMode} 
              offColor="#bbb"
              onColor="#333"
              onHandleColor="#fff"
              offHandleColor="#fff"
              uncheckedIcon={false}
              checkedIcon={false}
              className="react-switch"
            />
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-3 sm:px-3">
          <Link to="/" className="block text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white">Home</Link>
          <Link to="/about" className="block text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white">About</Link>
          <Link to="/contact" className="block text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white">Contact</Link>
          <Link to="/create-blog" className="block text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white">Create Blog</Link>
          <Link to={`/my-blogs/${user._id}`}  className="block text-gray-800 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white">My Blogs</Link>
          <div className="relative mt-3">
            <input 
              type="text" 
              className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full py-1 px-4 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search..." 
            />
            <svg 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M12.9 14.32a7 7 0 111.414-1.414l3.85 3.85a1 1 0 01-1.414 1.414l-3.85-3.85zm-6.4-1.82a5 5 0 100-10 5 5 0 000 10z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          {isAuthenticated ? (
            <img 
              src={user.avatar || 'https://via.placeholder.com/40'} 
              alt="User Profile" 
              className="rounded-full h-10 w-10 mt-3 cursor-pointer"
              onClick={toggleSidebar}
            />
          ) : (
            <Link to="/login" className="block bg-blue-500 dark:bg-blue-700 text-white px-3 py-1 text-sm rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 mt-3">Login</Link>
          )}
          <div className="flex items-center space-x-2 mt-3">
            <label className="text-gray-800 dark:text-white">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </label>
            <Switch 
              onChange={toggleDarkMode} 
              checked={isDarkMode} 
              offColor="#bbb"
              onColor="#333"
              onHandleColor="#fff"
              offHandleColor="#fff"
              uncheckedIcon={false}
              checkedIcon={false}
              className="react-switch"
            />
          </div>
        </div>
      )}
      <UserProfileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} user={user} />
    </nav>
  );
};

export default Navbar;
