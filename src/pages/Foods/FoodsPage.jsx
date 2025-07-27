import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/components/ui/carousel";
import { Card, CardContent } from "@/components/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import SectionCarousel from "@/components/SectionCarousel";
import fetchDataByIds from "../../utils/fetchDataByIds";
import { fetchCitiesByIds } from "../../hooks/slices/citySlice";

import { getFoodsByIds } from "../../hooks/slices/foodsSlice";
import {
  fetchCitiesDataByIds,
  fetchFoodsDataByIds,
  fetchPlaceDataByIds,
} from "../../hooks/slices/byIdsSlice";

const FoodsPage = () => {
  const { slug } = useParams();
  // const [Foods, setState] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [citiesData, setCitiesData] = useState([]);

  const Foods = useSelector((Foods) => Foods.foods.currentFood);
  const dispatch = useDispatch();
  console.log("sttat data foods", Foods, slug);

  useEffect(() => {
    dispatch(getFoodsByIds(slug));
  }, [slug]);

  useEffect(() => {
    if (Foods && Foods?.cityIds?.length > 0) {
      fetchDataByIds(
        dispatch,
        fetchCitiesDataByIds,
        Foods.cityIds,
        setCitiesData
      );
    }
  }, [Foods]);

  useEffect(() => {
    if (Foods && Foods.music) {
      const bgAudio = new Audio(`/${Foods.music}`);
      bgAudio.loop = true;
      bgAudio.volume = 0.4;
      setAudio(bgAudio);
      bgAudio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [Foods]);

  const toggleAudio = () => {
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  if (!Foods)
    return (
      <div className="text-center mt-16 text-red-500 font-bold text-3xl">
        Loading Incredible Experience...
      </div>
    );

  const goTo = (index) => {
    if (index >= 0 && index < Foods?.slideshowImages?.length) setCurrent(index);
  };

  return (
    <div
      className="  font-[Poppins] text-white"
      style={{
        background: `linear-gradient(to bottom, ${
          Foods.bgTheme || "#111827"
        }, #000)`,
      }}
    >
      {/* Hero Slider */}
      <div className="">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="relative h-[500px]">
              {Foods?.slideshowImages?.length > 0 && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    Foods?.slideshowImages[current]?.url
                  }`}
                  alt={`Slide ${current + 1}`}
                  className="w-full h-full  object-cover"
                />
              )}

              {/* Thumbnail strip */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 px-2 py-1 rounded shadow">
                {Foods?.slideshowImages?.length > 0 ? (
                  Foods?.slideshowImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={`${import.meta.env.VITE_BACKEND_URL}${img?.url}`}
                      onClick={() => goTo(idx)}
                      className={`h-12 w-16 object-contain cursor-pointer rounded ${
                        current === idx ? "ring-2 ring-blue-500" : "opacity-60"
                      }`}
                    />
                  ))
                ) : (
                  <img
                    // key={idx}
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      Foods?.coverImage?.url
                    }`}
                    // onClick={() => goTo(idx)}
                    className={`h-12 w-16 object-contain cursor-pointer rounded ring-2 ring-blue-500  `}
                  />
                )}
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      {/* Main Content */}
      <div className="max-w-[1700px] mx-auto px-6 md:px-16 py-24 space-y-12 bg-gradient-to-br from-white to-yellow-50 text-black">
        <motion.section
          className=" px-8 py-12 bg-white rounded-3xl shadow-2xl text-gray-800 leading-relaxed tracking-wide space-y-8 font-montserrat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold text-center text-yellow-500 drop-shadow-lg mb-6">
            About Madhya Pradesh Tourism (MP)
          </h2>

          <p className="text-lg max-w-prose mx-auto text-center">
            Welcome to the{" "}
            <span className="font-semibold text-yellow-600">
              Heart of India
            </span>{" "}
            — Madhya Pradesh! A land where
            <span className="italic text-gray-700">
              {" "}
              timeless heritage meets thrilling adventure
            </span>
            . From majestic forts and sacred temples to dense forests teeming
            with wildlife, MP is an enchanting blend of past and present.
          </p>

          <p className="text-lg max-w-prose mx-auto text-center">
            Nestled in the center of India, MP shares borders with 6 states:{" "}
            <span className="font-medium text-gray-700">
              Chhattisgarh, Maharashtra, Gujarat, Rajasthan, and Uttar Pradesh
            </span>
            .
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8   mx-auto">
            <div className="bg-yellow-50 rounded-xl p-6 shadow-md hover:shadow-yellow-300 transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                🐅 India’s Tiger Foods
              </h3>
              <p className="text-md text-gray-800">
                Home to over{" "}
                <span className="font-bold text-yellow-600">526 tigers</span>,
                MP is the "Tiger Foods of India". Explore iconic reserves like{" "}
                <span className="font-medium">Bandhavgarh</span>,{" "}
                <span className="font-medium">Kanha</span>,{" "}
                <span className="font-medium">Pench</span>, and{" "}
                <span className="font-medium">Panna</span>.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 shadow-md hover:shadow-yellow-300 transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                🏛️ A Treasure Trove of Heritage
              </h3>
              <p className="text-md text-gray-800 mb-2">
                Discover ancient forts, temples, and caves. Must-see UNESCO
                sites include{" "}
                <span className="font-semibold">Bhimbetka Rock Shelters</span>,{" "}
                <span className="font-semibold">Khajuraho Monuments</span>, and{" "}
                <span className="font-semibold">Sanchi Stupas</span>.
              </p>
              <p className="text-md text-gray-800">
                Heritage cities <span className="font-medium">Gwalior</span> and{" "}
                <span className="font-medium">Orchha</span> offer gems like{" "}
                <span className="italic">Ram Raja Temple</span> and{" "}
                <span className="italic">Chaturbhuj Temple</span>.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 shadow-md hover:shadow-yellow-300 transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                ⛰️ Thrill Meets Tranquility
              </h3>
              <p className="text-md text-gray-800">
                Adventure seekers can enjoy{" "}
                <span className="font-medium">
                  parasailing, rafting, trekking, and camping
                </span>
                . Top spots: <span className="font-semibold">Maikal Hills</span>{" "}
                & <span className="font-semibold">Pachmarhi</span>, best visited
                from <span className="italic">November to April</span>.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Sections */}
        {citiesData.length > 0 && (
          <SectionCarousel CarouselData={citiesData} title="Famous Cities" />
        )}
      </div>
    </div>
  );
};

export default FoodsPage;
