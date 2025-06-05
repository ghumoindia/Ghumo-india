import React from "react";
import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations";
import Navbar from "../components/Navbar";

const Destinations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white pb-10">
      <Navbar />
      <div className="pt-32 text-center px-4">
        <h2 className="text-5xl font-extrabold text-orange-700 mb-4 drop-shadow-sm">
          Explore Breathtaking Destinations
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          From snow-capped mountains to sun-drenched beaches, discover the magic of Incredible India.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-16">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
