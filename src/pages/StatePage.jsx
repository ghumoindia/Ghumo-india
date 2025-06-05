import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const zoomIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const images = [
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];

const StateWorld = () => {
  const { slug } = useParams();
  const [state, setState] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
  const Section = ({ title, items, isImageOnly = false }) => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.7 }}
      className="font-montserrat text-black"
    >
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left">
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
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
        ))}
      </div>
    </motion.div>
  );

  return (
    <div
      className="min-h-screen font-[Poppins] text-white"
      style={{
        background: `linear-gradient(to bottom, ${
          state.bgTheme || "#111827"
        }, #000)`,
      }}
    >
      {/* Hero Slider */}
      <div>
        <Slide
          arrows={true}
          duration={2000}
          easing="ease"
          // className="relative w-full h-screen overflow-hidden"
          style={{ width: "100%", height: "80vh" }}
        >
          {images.map((url, index) => (
            <div key={index} className="each-slide-effect">
              <div
                className="h-screen bg-center bg-cover flex items-center justify-center relative"
                style={{ backgroundImage: `url(${url})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />
                <div className="z-20 max-w-6xl text-center px-6">
                  <motion.h1
                    className="text-5xl md:text-7xl font-extrabold drop-shadow-lg text-yellow-400"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    {state.name}
                  </motion.h1>
                  <motion.p
                    className="text-2xl md:text-3xl italic mt-6 text-gray-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {state.tagline}
                  </motion.p>
                </div>
              </div>
            </div>
          ))}
        </Slide>

        {/* Music Button */}
        {state.music && (
          <button
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/30 backdrop-blur-md p-4 rounded-full z-30 transition"
            onClick={toggleAudio}
            title="Toggle Music"
          >
            {isPlaying ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-[1700px] mx-auto px-6 md:px-16 py-24 space-y-12 bg-gradient-to-br from-white to-yellow-50 text-black">
        {/* Description */}
        <motion.section
          className="  mx-auto p-6 bg-white rounded-3xl shadow-xl text-gray-800 leading-relaxed tracking-wide space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">
            About Madhya Pradesh Tourism (MP)
          </h2>
          <p>
            Welcome to the heart of India, Madhya Pradesh, a state which exudes
            timelessness in every way. The exotic land is an intoxicating
            mixture of rich history, vibrant sights, awe-inspiring art and
            shrines. From north to south, east to west, Madhya Pradesh is
            adorned with beautiful tourist attractions...
          </p>
          <p>
            The state shares its borders with 6 states of India – Chhattisgarh,
            Maharashtra, Gujarat, Rajasthan and Uttar Pradesh.
          </p>

          <h3 className="text-2xl font-semibold mt-4">India’s Tiger State!</h3>
          <p>
            Wildlife is a major part of Madhya Pradesh tourism. It is India’s
            “Tiger State”, with more than 526 tigers... Bandhavgarh National
            Park has the highest tiger density in India. Other famous parks
            include Kanha, Pench, Panna, etc.
          </p>

          <h3 className="text-2xl font-semibold mt-4">
            Heritage dating back thousands of years!
          </h3>
          <p>
            The rich heritage of Madhya Pradesh can be seen in its forts, caves,
            monuments... Notable UNESCO World Heritage Sites include Bhimbetka
            Rock Shelters, Khajuraho Group of Monuments, and Sanchi Stupas.
          </p>
          <p>
            Gwalior and Orchha are also UNESCO heritage cities. Must-visit
            spots: Ram Raja Temple, Chaturbhuj Temple, and Laxmi Narayan Temple.
          </p>

          <h3 className="text-2xl font-semibold mt-4">
            Numerous options for adventure too!
          </h3>
          <p>
            Madhya Pradesh offers parasailing, river rafting, trekking, camping
            and more. Mountaineering is popular in Maikal Hills and Pachmarhi
            between November–April.
          </p>
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
