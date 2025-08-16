import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Logo from "../../src/assets/Food.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#FFFBE6] dark:bg-gray-900 text-gray-900 dark:text-gray-200 px-6 md:px-12 py-10 mt-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo & Mission */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-2">
              <img
                src={Logo}
                alt="Logo"
                className="w-20 h-auto object-contain"
              />
              <span className="text-[#257429] dark:text-orange-400 text-xl md:text-2xl transition-colors duration-500">
                Bridge
              </span>
            </Link>
            <p className="text-sm leading-6 text-gray-700 dark:text-gray-300 transition-colors duration-500">
              Connecting surplus food from restaurants to charities. Together, we reduce waste and serve the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 dark:text-green-300 mb-2 transition-colors duration-500">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/donations" className="hover:underline">All Donations</a></li>
              <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
              <li><a href="/login" className="hover:underline">Login</a></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 dark:text-green-300 mb-2 transition-colors duration-500">About Us</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/about" className="hover:underline">Our Story</a></li>
              <li><a href="/team" className="hover:underline">Team</a></li>
              <li><a href="/mission" className="hover:underline">Our Mission</a></li>
              <li><a href="/partners" className="hover:underline">Partners</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 dark:text-green-300 mb-2 transition-colors duration-500">Support</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/faq" className="hover:underline">FAQs</a></li>
              <li><a href="/help" className="hover:underline">Help Center</a></li>
              <li><a href="/feedback" className="hover:underline">Send Feedback</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 dark:text-green-300 mb-2 transition-colors duration-500">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-[#F9A825] transition-colors duration-500"><FaFacebookF /></a>
              <a href="#" className="hover:text-[#F9A825] transition-colors duration-500"><FaTwitter /></a>
              <a href="#" className="hover:text-[#F9A825] transition-colors duration-500"><FaInstagram /></a>
              <a href="#" className="hover:text-[#F9A825] transition-colors duration-500"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300 dark:border-gray-600 transition-colors duration-500" />

        {/* Copyright */}
        <div className="text-center text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[#F9A825]">FoodBridge</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
