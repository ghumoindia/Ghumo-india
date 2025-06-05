import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import DiscoverIndia from "../components/DiscoverIndia";

const Home = () => {
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/states.json")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error("Error loading states:", err));
  }, []);

  const handleClick = (slug) => {
    navigate(`/state/${slug}`);
  };

  return (
    <>
      <section>
        <Hero />
      </section>
      {/* <div style={{ background: "#efecec !important" }}>
        <DiscoverIndia />
      </div> */}
      <div>
        <section className="relative min-h-screen bg-gradient-to-br from-[#1e1d1d] via-[#0e0e0e] to-[#070707] text-white overflow-hidden my-12 bg-white">
          {/* Glowing Mandala Background */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-white">
            <div className="absolute w-[60rem] h-[60rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent)] top-[-30rem] left-[-20rem]" />
            <div className="absolute w-[40rem] h-[40rem] bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.04),transparent)] bottom-[-20rem] right-[-10rem]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 my-10 ">
            {/* Cinematic Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-20 px-6"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight text-center">
                <span className="text-gray-400">Welcome to</span>{" "}
                <span className="text-yellow-400">Ghumo India</span>
              </h1>

              <p className="mt-5 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed tracking-wide">
                Experience the soul of India through its diverse states, rich
                culture, majestic landscapes, and timeless traditions.
              </p>
            </motion.div>

            {/* State Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {states.map((state) => (
                <motion.div
                  key={state.id}
                  onClick={() => handleClick(state.slug)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image Section */}
                  <img
                    src={state.image}
                    alt={state.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />

                  {/* Text Section */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {state.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {state.tagline}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
