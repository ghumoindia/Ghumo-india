import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaUsers,
  FaLandmark,
  FaGlobeAsia,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-white via-orange-50 to-yellow-100 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6 md:px-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            About Ghumo India
          </h1>
          <p className="mt-4 text-xl text-orange-100">
            Experience the heart of India like never before.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-6xl mx-auto px-6 md:px-20 py-16"
      >
        <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-4xl font-bold text-orange-600 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Ghumo India</strong> is your passport to a land of stories,
            colors, and traditions. Our mission is to help you uncover the soul
            of India — from snow-capped mountains to golden deserts, from sacred
            temples to bustling markets. With curated guides and immersive
            experiences, we make every journey unforgettable.
          </p>
        </div>
      </motion.div>

      {/* Highlights Section */}
      <div className="bg-white py-12">
        <h3 className="text-3xl font-bold text-center text-orange-600 mb-10">
          Why Travel with Ghumo India?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            { title: "Diverse Cultures", img: "src/assets/images/culture.jpg" },
            { title: "Incredible Cuisines", img: "src/assets/images/food.jpg" },
            {
              title: "Historic Monuments",
              img: "src/assets/images/heritage.jpg",
            },
            {
              title: "Spiritual Retreats",
              img: "src/assets/images/spiritual.jpg",
            },
            {
              title: "Untamed Wildlife",
              img: "src/assets/images/wildlife.jpg",
            },
            { title: "Natural Wonders", img: "src/assets/images/nature.jpg" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl overflow-hidden shadow-lg transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-60 w-full object-cover"
              />
              <div className="p-4 text-center bg-orange-50">
                <h4 className="text-xl font-semibold text-orange-700">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-orange-100 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <FaMapMarkedAlt size={40} />, label: "29 States" },
            { icon: <FaUsers size={40} />, label: "140+ Crore People" },
            { icon: <FaLandmark size={40} />, label: "40 UNESCO Sites" },
            { icon: <FaGlobeAsia size={40} />, label: "22 Official Languages" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="text-orange-600 mb-2">{stat.icon}</div>
              <p className="text-lg font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-20 bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Your Journey Today
        </h2>
        <p className="text-lg mb-6">
          Uncover India’s wonders with just a click.
        </p>
        <a
          href="/"
          className="inline-block bg-white text-orange-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          Explore Now
        </a>
      </div>
    </div>
  );
};

export default About;
