import React from 'react';

const Footer = () => {
    return (
         <footer className="bg-base-200 text-base-content px-6 md:px-12 py-10 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-[#F9A825]">FoodBridge 🍽️</h2>
          <p className="mt-2 text-sm leading-6">
            Connecting surplus food from restaurants to charities. Together, we reduce waste and serve the community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#81C784] mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a className="hover:underline" href="/">Home</a></li>
            <li><a className="hover:underline" href="/donations">All Donations</a></li>
            <li><a className="hover:underline" href="/dashboard">Dashboard</a></li>
            <li><a className="hover:underline" href="/login">Login</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-[#81C784] mb-2">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-[#F9A825]"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="hover:text-[#F9A825]"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="hover:text-[#F9A825]"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-[#F9A825]"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {/* Copyright */}
      <div className="text-center text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-[#F9A825]">FoodBridge</span>. All rights reserved.
      </div>
    </footer>
    );
};

export default Footer;