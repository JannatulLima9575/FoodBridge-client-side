import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
         <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4">Oops! Page not found</p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Go Home
      </Link>
    </div>
    );
};

export default NotFound;