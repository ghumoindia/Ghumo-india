import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import DOMPurify from "dompurify";

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
import { fetchStateById } from "../../hooks/slices/stateSlice";
import SectionCarousel from "@/components/SectionCarousel";
import fetchDataByIds from "../../utils/fetchDataByIds";
import {
  fetchActivitiesDataByIds,
  fetchCitiesDataByIds,
  fetchFoodsDataByIds,
  fetchHotelsDataByIds,
  fetchPlaceDataByIds,
} from "../../hooks/slices/byIdsSlice";

const StateWorld = () => {
  const { slug } = useParams();
  // const [state, setState] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [placeData, setPlaceData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [foodsData, setFoodsData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);
  const state = useSelector((state) => state.states.currentState);
  const dispatch = useDispatch();
  console.log("sttat data ", state, slug, activitiesData);

  useEffect(() => {
    dispatch(fetchStateById(slug));
  }, [slug]);

  useEffect(() => {
    if (state && state.placeIds.length > 0) {
      fetchDataByIds(
        dispatch,
        fetchPlaceDataByIds,
        state.placeIds,
        setPlaceData
      );
    }
    if (state && state?.cityIds?.length > 0) {
      fetchDataByIds(
        dispatch,
        fetchCitiesDataByIds,
        state.cityIds,
        setCitiesData
      );
    }

    if (state && state.foodIds.length > 0) {
      fetchDataByIds(
        dispatch,
        fetchFoodsDataByIds,
        state.foodIds,
        setFoodsData
      );
    }
    if (state && state.activitiesIds.length > 0) {
      fetchDataByIds(
        dispatch,
        fetchActivitiesDataByIds,
        state.activitiesIds,
        setActivitiesData
      );
    }
    if (state && state.hotelsIds.length > 0) {
      fetchDataByIds(
        dispatch,
        fetchHotelsDataByIds,
        state.hotelsIds,
        setHotelsData
      );
    }
  }, [state]);

  useEffect(() => {
    if (state && state.music) {
      const bgAudio = new Audio(`/${state.music}`);
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
  }, [state]);

  const toggleAudio = () => {
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  if (!state)
    return (
      <div className="text-center mt-16 text-red-500 font-bold text-3xl">
        Loading Incredible Experience...
      </div>
    );

  const goTo = (index) => {
    if (index >= 0 && index < state?.slideshowImages?.length) setCurrent(index);
  };
  const hasData = state?.about && state?.about.trim() !== "";

  return (
    <div
      className="  font-[Poppins] text-white"
      style={{
        background: `linear-gradient(to bottom, ${
          state.bgTheme || "#111827"
        }, #000)`,
      }}
    >
      {/* Hero Slider */}
      <div className="">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="relative h-[500px]">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${
                  state?.slideshowImages[current]?.url
                }`}
                alt={`Slide ${current + 1}`}
                className="w-full h-full  object-cover"
              />

              {/* Thumbnail strip */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 px-2 py-1 rounded shadow">
                {state?.slideshowImages.length > 0 ? (
                  state?.slideshowImages.map((img, idx) => (
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
                      state?.coverImage?.url
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
            About {state?.name || "This Place"}
          </h2>

          {hasData ? (
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:marker:text-blue-500 prose-a:text-blue-600 prose-a:underline"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(state?.about || ""),
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
          <SectionCarousel
            CarouselData={citiesData}
            title={"Famous Cities"}
            type={"cities"}
          />
        )}
        {placeData.length > 0 && (
          <SectionCarousel
            CarouselData={placeData}
            title={"Famous Places"}
            type={"places"}
          />
        )}
        {foodsData.length > 0 && (
          <SectionCarousel
            CarouselData={foodsData}
            title={"Famous Foods"}
            type={"foods"}
          />
        )}
        {activitiesData.length > 0 && (
          <SectionCarousel
            CarouselData={activitiesData}
            title={"Famous Activities"}
            type={"activities"}
          />
        )}
        {hotelsData.length > 0 && (
          <SectionCarousel
            CarouselData={hotelsData}
            title={"Famous Hotels"}
            type={"hotels"}
          />
        )}

        {/* Audio Control */}
      </div>
    </div>
  );
};

export default StateWorld;
