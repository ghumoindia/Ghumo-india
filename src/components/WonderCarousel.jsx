import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WonderCarousel = ({ CarouselData, title, type }) => {
  const navigate = useNavigate();
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const zoomIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const handleClick = (slug) => {
    if (type === "cities") {
      return navigate(`/city/${slug}`);
    } else if (type === "places") {
      return navigate(`/places/${slug}`);
    } else if (type === "foods") {
      console.log("Navigating to foods with slug:", slug);
      return navigate(`/foods/${slug}`);
    } else if (type === "wonders") {
      return navigate(`/wonders/${slug}`);
    }
  };
  console.log("CarouselData", CarouselData);
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="font-montserrat text-black py-12"
      >
        {/* Section Title */}
        <div className="text-center mb-12 relative">
          <h2 className="text-5xl sm:text-6xl md:text-6xl font-bold leading-tight tracking-tight text-center">
            <span className="text-gray-400">Wonders</span>{" "}
          </h2>

          {/* Optional subtitle */}
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Handpicked wonders that showcase the beauty, culture, and heritage
            of India.
          </p>
        </div>

        <Carousel className="relative pb-12">
          <CarouselContent className="mx-4">
            {CarouselData.map((item, i) => (
              <CarouselItem
                key={i}
                className="md:basis-1/2 lg:basis-1/3 p-3"
                onClick={() => handleClick(item._id)}
              >
                <motion.div
                  className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                  variants={zoomIn}
                >
                  {/* Image */}
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      item?.coverImage?.url
                    }`}
                    alt={item.title || `Item ${i}`}
                    className="w-full h-56 md:h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Title */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center px-3">
                    <p className="text-lg md:text-xl font-semibold text-white drop-shadow">
                      {item.title || item.name}
                    </p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-6 z-50">
            <CarouselPrevious className="bg-white/90 backdrop-blur-md rounded-full p-3 shadow-md hover:bg-yellow-500 hover:text-white hover:scale-110 transition-all duration-300" />
            <CarouselNext className="bg-white/90 backdrop-blur-md rounded-full p-3 shadow-md hover:bg-yellow-500 hover:text-white hover:scale-110 transition-all duration-300" />
          </div>
        </Carousel>
      </motion.div>
    </>
  );
};

export default WonderCarousel;
