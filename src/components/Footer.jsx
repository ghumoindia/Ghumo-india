import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#1a1a1a] to-[#2e2e2e] text-white px-6 md:px-20 py-14 font-montserrat">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10">
        {/* Branding */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold tracking-wide text-yellow-400">
            Ghumo India
          </h2>
          <p className="text-sm mt-3 text-gray-400 leading-relaxed">
            Discover the soul of India with immersive experiences, heritage
            trails, festivals, and more.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/destinations"
                className="hover:text-yellow-300 transition"
              >
                States
              </Link>
            </li>
            <li>
              <Link
                to="/experiences"
                className="hover:text-yellow-300 transition"
              >
                Experiences
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
            Useful
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link to="/contact" className="hover:text-yellow-300 transition">
                Contact
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
            Follow Us
          </h3>
          <div className="flex space-x-5 text-2xl text-gray-400">
            <a href="#" className="hover:text-blue-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-pink-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Ghumo India. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
