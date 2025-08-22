import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ExperienceCard from "../components/ExperienceCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExperiences } from "../hooks/slices/experienceSlice";
import { AlertTriangle, Loader2, Info } from "lucide-react";

const Experiences = () => {
  const dispatch = useDispatch();

  const { experiencesList, loading, error } = useSelector(
    (state) => state.experiences
  );

  useEffect(() => {
    dispatch(fetchAllExperiences());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-white pb-10">
      <Navbar />
      <div className="pt-32 text-center px-4">
        <h2 className="text-5xl font-extrabold text-yellow-700 mb-4 drop-shadow-sm">
          Immersive Experiences
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover India's soul through unique and unforgettable experiences
          curated for every kind of traveler.
        </p>

        <div className="mt-14 px-4 md:px-16">
          {loading ? (
            <div className="flex items-center justify-center text-gray-600 gap-2">
              <Loader2 className="animate-spin w-6 h-6 text-yellow-600" />
              <span className="text-lg">Loading experiences...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center gap-2 text-red-600 bg-red-100 px-4 py-2 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-lg">Error: {error}</span>
            </div>
          ) : experiencesList.length === 0 ? (
            <div className="flex items-center justify-center gap-2 text-gray-700 bg-yellow-100 px-4 py-2 rounded-lg">
              <Info className="w-5 h-5 text-yellow-600" />
              <span className="text-lg">No experiences found.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {experiencesList.map((exp) => (
                <ExperienceCard experiences={exp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
