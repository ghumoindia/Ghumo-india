import React, { useEffect, useState } from "react";
import StateCard from "./StateCard";

const DiscoverIndia = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch("/data/states.json")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error("Error loading states:", err));
  }, []);

  return (
    <div className="  bg-gradient-to-b from-[#fff8f0] via-[#f3f4f6] to-[#e5e7eb] text-gray-800 mt-5">
      <div className="max-w-7xl mx-auto px-6 py-6 ">
        <div className="relative s text-center">
          {/* Decorative Background Accent */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-64 h-64 bg-gradient-to-tr from-yellow-300 via-pink-400 to-red-500 opacity-10 rounded-full blur-3xl"></div>
          </div>

          <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-rose-500 to-red-500 text-transparent bg-clip-text drop-shadow-lg mb-5">
            ✨ Discover India ✨
          </h2>

          <div className="relative z-10 w-24 h-1 mx-auto bg-gradient-to-r from-yellow-400 via-rose-500 to-red-500 rounded-full mb-6"></div>

          {/* Subheading */}
          <p className="relative z-10 max-w-2xl mx-auto text-base md:text-lg text-gray-700 leading-relaxed font-medium tracking-wide">
            Embark on a cultural journey across India’s diverse landscapes,
            timeless heritage, and vibrant traditions that define each state’s
            unique identity.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {states.map((state) => (
            <StateCard
              key={state.id}
              name={state.name}
              tagline={state.tagline}
              image={state.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverIndia;
