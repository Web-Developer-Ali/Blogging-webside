// src/components/UserProfileSidebar.jsx
import axios from "axios";
import React, { useContext } from "react";
import { Link, redirect } from "react-router-dom";
import { context } from "../main";
import { toast } from "react-toastify";

const UserProfileSidebar = ({ isOpen, onClose, user }) => {
  const { setIsAuthenticated, setUser } = useContext(context);

  const HandleLogout =async()=>{
    try {
      const responce = await axios.get("http://localhost:3001/api/Logout/user",{withCredentials: true })
      redirect("/login")
      toast.success(responce.data.message)
      setIsAuthenticated(false)
      setUser({})
    } catch (error) {
      toast.error(responce.error.data.message)
      console.log(error)
    }
  }
  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } rounded-lg border border-gray-200 dark:border-gray-700`}
    >
      <button
        onClick={onClose}
        className="text-gray-600 dark:text-gray-400 absolute top-2 right-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {user ? (
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar || "https://via.placeholder.com/150"}
              alt="User profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.FirstName} {user.LastName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/profile"
              className="block py-1 px-3 text-sm text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-purple-500"
            >
              View Profile
            </Link>
            <Link
              to="/settings"
              className="block py-1 px-3 mt-2 text-sm text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-purple-500"
            >
              Settings
            </Link>
            <button
              onClick={HandleLogout}
              className="block py-1 px-3 mt-2 text-sm text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-purple-500"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 p-4">Loading...</p>
      )}
    </div>
  );
};

export default UserProfileSidebar;
