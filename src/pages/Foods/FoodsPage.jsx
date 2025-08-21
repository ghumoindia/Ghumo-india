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
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import SectionCarousel from "@/components/SectionCarousel";
import fetchDataByIds from "../../utils/fetchDataByIds";
import { fetchCitiesByIds } from "../../hooks/slices/citySlice";

import { getFoodsByIds } from "../../hooks/slices/foodsSlice";
import DOMPurify from "dompurify";
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
  const hasData = Foods?.about && Foods?.about.trim() !== "";
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
          className="relative px-10 py-14 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-xl text-gray-800 font-montserrat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-600 to-yellow-300 bg-clip-text text-transparent">
            About {Foods?.name || "This Place"}
          </h2>

          {hasData ? (
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:marker:text-blue-500 prose-a:text-blue-600 prose-a:underline"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(Foods?.about || ""),
              }}
            />
          ) : (
            <motion.div
              className="flex items-center gap-3 p-5 bg-yellow-50 border border-yellow-300 rounded-xl shadow-sm text-yellow-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <p className="text-lg font-medium">
                No information available for this place yet.
              </p>
            </motion.div>
          )}

          {hasData && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-full"></div>
          )}
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
