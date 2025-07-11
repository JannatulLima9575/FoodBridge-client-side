import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfcf9] dark:bg-[#1f1f1f] transition-all duration-300 px-4 md:px-8">
      <Outlet />
    </div>
  );
};

export default AuthLayout;