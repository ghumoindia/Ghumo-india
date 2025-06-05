import React from "react";
import Navbar from "../components/Navbar";
import ExperienceCard from "../components/ExperienceCard";
import experiences from "../data/experiences";

const Experiences = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-white pb-10">
      <Navbar />
      <div className="pt-32 text-center px-4">
        <h2 className="text-5xl font-extrabold text-yellow-700 mb-4 drop-shadow-sm">
          Immersive Experiences
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover India's soul through unique and unforgettable experiences curated for every kind of traveler.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-16">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} {...exp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
