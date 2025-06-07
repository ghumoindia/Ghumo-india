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

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const zoomIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const images = [""];

const StateWorld = () => {
  const { slug } = useParams();
  const [state, setState] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  console.log("sttat data ", state);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/states.json");
      const data = await res.json();
      const found = data.find((s) => s.slug === slug);
      setState(found);
    };
    fetchData();
  }, [slug]);

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
    if (index >= 0 && index < state?.imageArray?.length) setCurrent(index);
  };
  const Section = ({ title, items, isImageOnly = false }) => (
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
          {items.map((item, i) => (
            <CarouselItem
              key={i}
              className="md:basis-1/2 lg:basis-1/3 p-2 " // use padding for spacing instead of grid
            >
              <motion.div
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                variants={zoomIn}
              >
                <img
                  src={`/${isImageOnly ? item : item.image}`}
                  alt={item.name || item.title || `Item ${i}`}
                  className="w-full h-48 md:h-56 object-cover"
                />
                {!isImageOnly && (
                  <div className="p-3 text-center">
                    <p className="text-base font-medium text-gray-800">
                      {item.name || item.title}
                    </p>
                  </div>
                )}
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
  );

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
                src={`/${
                  state?.imageArray ? state?.imageArray[current] : state?.image
                }`}
                alt={`Slide ${current + 1}`}
                className="w-full h-full  object-cover"
              />

              {/* Thumbnail strip */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 px-2 py-1 rounded shadow">
                {state?.imageArray ? (
                  state?.imageArray.map((img, idx) => (
                    <img
                      key={idx}
                      src={`/${img}`}
                      onClick={() => goTo(idx)}
                      className={`h-12 w-16 object-contain cursor-pointer rounded ${
                        current === idx ? "ring-2 ring-blue-500" : "opacity-60"
                      }`}
                    />
                  ))
                ) : (
                  <img
                    // key={idx}
                    src={`/${state?.image}`}
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
                🐅 India’s Tiger State
              </h3>
              <p className="text-md text-gray-800">
                Home to over{" "}
                <span className="font-bold text-yellow-600">526 tigers</span>,
                MP is the "Tiger State of India". Explore iconic reserves like{" "}
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
        {state.highlights && (
          <Section title="Top Highlights" items={state.highlights} />
        )}
        {state.food && <Section title="Famous Cuisine" items={state.food} />}
        {state.festivals && (
          <Section title="Festivals" items={state.festivals} />
        )}
        {state.gallery && (
          <Section title="Gallery" items={state.gallery} isImageOnly={true} />
        )}
      </div>
    </div>
  );
};

export default StateWorld;
