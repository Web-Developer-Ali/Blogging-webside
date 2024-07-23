// src/pages/About.js
import React from 'react';
import pic1 from "../imgs/ali.png.jpg"
import pic2 from "../imgs/pic2.avif"
import pic3 from "../imgs/pic4.avif"

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl w-full p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">About Us</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Welcome to our blog! We are passionate about sharing knowledge, ideas, and stories with the world. 
            Our mission is to create a space where people can come together to learn, inspire, and connect with 
            one another.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Our Team</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Our team consists of enthusiastic writers, developers, and designers who work tirelessly to bring you 
            the best content. Whether you're here for the latest tech trends, personal development tips, or just 
            a good read, we've got something for everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <img
                src={pic1}
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-2"
              />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Ali Hamza</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Founder & CEO</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={pic2}
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-2"
              />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Jane Smith</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Lead Developer</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={pic3}
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-2"
              />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Alice Johnson</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Designer</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Stay Connected</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Thank you for visiting our blog. We hope you enjoy your time here and find our content valuable and 
            engaging. Feel free to reach out to us with any questions, comments, or feedback. We love hearing 
            from our readers!
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Stay connected with us on social media and subscribe to our newsletter to stay updated on the latest 
            posts. Happy reading!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
