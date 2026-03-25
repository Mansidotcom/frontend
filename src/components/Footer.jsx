import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="inline-block">
              <div className="text-2xl font-bold text-pink-600 mb-2">Ekart</div>
            </Link>
            <p className="text-sm mb-2">
              Powering Your World with the Best in Electronics.
            </p>
            <p className="text-sm mb-1">
              123 Electronics St, Style City, NY 10001
            </p>
            <p className="text-sm mb-1">Email: support@Zaptro.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>

          {/* Customer Service */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="text-sm space-y-2">
              <li><Link to="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-pink-400 transition-colors"><FaFacebook /></a>
              <a href="#" className="hover:text-pink-400 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-pink-400 transition-colors"><FaTwitterSquare /></a>
              <a href="#" className="hover:text-pink-400 transition-colors"><FaPinterest /></a>
            </div>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Stay in the Loop</h3>
            <p className="text-sm mb-4">
              Subscribe to get special offers, free giveaways, and more
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 p-3 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              />
              <button
                type="submit"
                className="bg-pink-600 text-white px-4 py-3 rounded-md hover:bg-pink-700 transition-colors font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-pink-600 font-semibold">Ekart</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
