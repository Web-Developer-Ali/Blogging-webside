// src/components/AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserProfileSidebar from './UserProfileSidebar';

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      <UserProfileSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
