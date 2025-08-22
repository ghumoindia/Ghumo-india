import React from "react";
import { motion } from "framer-motion";

const DestinationCard = ({
  image,
  name,
  location,
  description,
  destinationData,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-shadow duration-300"
    >
      <div className="relative group">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${
            destinationData?.coverImage?.url
          }`}
          alt={destinationData?.title}
          className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 bg-gradient-to-t from-black/60 to-transparent w-full p-4 text-white">
          <h3 className="text-xl font-bold">{destinationData?.title}</h3>
          <p className="text-sm italic">{destinationData?.stateName}</p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-gray-700 text-sm line-clamp-3">
          {destinationData?.subtitle || "Explore this beautiful destination."}
        </p>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
