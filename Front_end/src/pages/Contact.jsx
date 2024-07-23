// src/pages/Contact.js
import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl w-full p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">Contact Us</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Contact Information</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Feel free to reach out to us using the information below:
          </p>
          <div className="mt-4">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Email: alihamzashoaibahmed@gmail.com
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Phone: +1 234 567 890
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Address: 123 Street, Lahore, Pakistan
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Contact Form</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
