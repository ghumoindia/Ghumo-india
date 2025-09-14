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

const VideoSectionCarousel = ({ CarouselData, title, type }) => {
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
        className="font-montserrat text-black"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left">
          {title}
        </h2>

        <Carousel className="relative pb-12 mx-5">
          {" "}
          {/* Add space for buttons */}
          <CarouselContent className="mx-2">
            {CarouselData.map((item, i) => (
              <CarouselItem
                key={i}
                className="md:basis-1/2 lg:basis-1/3 p-2 "
                onClick={() => handleClick(item._id)} // Handle click to navigate
              >
                <motion.div
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  variants={zoomIn}
                >
                  <video
                    src={`${import.meta.env.VITE_BACKEND_URL}${item?.videoUrl}`}
                    alt={item.title || `Item ${i}`}
                    className="w-full h-48 md:h-56 object-cover"
                  />
                  {
                    <div className="p-3 text-center">
                      <p className="text-base font-medium text-gray-800">
                        {item.title || item.name}
                      </p>
                    </div>
                  }
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Bottom Centered Buttons */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 z-50">
            <CarouselPrevious className="bg-white rounded-full cursor-pointer shadow p-2 hover:bg-black hover:text-white hover:scale-105 transition-all duration-300  " />
            <CarouselNext className="bg-white rounded-full shadow p-2 hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer" />
          </div>
        </Carousel>
      </motion.div>
    </>
  );
};

export default VideoSectionCarousel;
