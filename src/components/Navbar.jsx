import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Experiences", path: "/experiences" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md border-b border-gray-200" : "bg-white/80"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold tracking-wide flex items-center"
        >
          <span className="text-yellow-500">Ghumo</span>
          <span className="text-gray-800 ml-1">India</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-10 text-sm font-semibold font-montserrat">
          {navLinks.map(({ name, path }, i) => (
            <Link
              key={i}
              to={path}
              className={`relative group transition ${
                location.pathname === path
                  ? "text-yellow-500"
                  : "text-gray-700 hover:text-yellow-500"
              }`}
            >
              {name}
              <span className="block h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-yellow-400 transition"
        >
          Explore Now
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
