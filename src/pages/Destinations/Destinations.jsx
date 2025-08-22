import React, { use, useEffect } from "react";
import DestinationCard from "../../components/DestinationCard";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { fetchAllDestinations } from "../../hooks/slices/destinationSlice";

const Destinations = () => {
  const { destinationsList, loading, error } = useSelector(
    (state) => state.destinations
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDestinations());
  }, []);
  console.log("Destinations data:", destinationsList, loading, error);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white pb-10">
      <Navbar />
      <div className="pt-32 text-center px-4">
        <h2 className="text-5xl font-extrabold text-orange-700 mb-4 drop-shadow-sm">
          Explore Breathtaking Destinations
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          From snow-capped mountains to sun-drenched beaches, discover the magic
          of Incredible India.
        </p>

        {/* 🔄 Loading State */}
        {loading && (
          <motion.div
            className="flex justify-center items-center mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
            <span className="ml-3 text-orange-700 text-lg font-medium">
              Loading destinations...
            </span>
          </motion.div>
        )}

        {/* ❌ Error State */}
        {error && (
          <motion.div
            className="mt-10 flex items-center justify-center gap-3 p-4 bg-red-50 border border-red-300 rounded-xl shadow-sm text-red-800 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle className="w-6 h-6 text-red-600" />
            <p className="text-lg font-medium">
              Failed to load destinations. Please try again later.
            </p>
          </motion.div>
        )}

        {/* ✅ Success State */}
        {!loading && !error && (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-16">
            {destinationsList && destinationsList.length > 0 ? (
              destinationsList.map((dest) => (
                <DestinationCard destinationData={dest} />
              ))
            ) : (
              <motion.div
                className="col-span-full flex items-center justify-center gap-3 p-5 bg-yellow-50 border border-yellow-300 rounded-xl text-yellow-800 shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                <p className="text-lg font-medium">No destinations found.</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
