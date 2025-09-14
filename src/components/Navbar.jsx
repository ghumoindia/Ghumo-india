import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false); // close menu when navigating
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Experiences", path: "/experiences" },
    { name: "About", path: "/about" },
    { name: "Travel Calendar", path: "/calender" },
  ];

  return (
    <motion.nav
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

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 text-sm font-semibold font-montserrat">
          {navLinks.map(({ name, path }, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `relative group transition ${
                  isActive
                    ? "text-yellow-500"
                    : "text-gray-700 hover:text-yellow-500"
                }`
              }
            >
              {name}
              <span className="block h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1" />
            </NavLink>
          ))}
        </div>

        {/* CTA Button (Desktop only) */}
        <Link to="/destinations" className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-yellow-400 transition"
          >
            Explore Now
          </motion.button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Slide-in Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <span className="text-xl font-bold text-yellow-500">Menu</span>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={26} className="text-gray-700" />
                </button>
              </div>
              <div className="flex flex-col px-6 py-6 space-y-6 font-semibold text-gray-700">
                {navLinks.map(({ name, path }, i) => (
                  <NavLink
                    key={i}
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-500"
                        : "hover:text-yellow-500 transition"
                    }
                  >
                    {name}
                  </NavLink>
                ))}
                <Link to="/destinations">
                  <button className="w-full bg-yellow-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-yellow-400 transition">
                    Explore Now
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
