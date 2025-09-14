import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroVideo } from "../hooks/slices/videoSlice";
import ladakhVideo from "../assets/images/hero.mp4";

const Hero = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [activeTab, setActiveTab] = useState(null);
  const [videoLink, setVideoLink] = useState(null);

  const dispatch = useDispatch();
  const themes = useSelector((state) => state?.video?.videoList || []);
  const loading = useSelector((state) => state?.video?.loading);
  const error = useSelector((state) => state?.video?.error);

  // const themes = [ // { label: "India 360", icon: <Md360 /> }, // { label: "Adventure", icon: <MdTerrain /> }, // { label: "Nature", icon: <MdPark /> }, // { label: "Wildlife", icon: <MdOutlineEmojiNature /> }, // { label: "Heritage", icon: <MdAccountBalance /> }, // { label: "Spiritual", icon: <MdSelfImprovement /> }, // ];

  useEffect(() => {
    dispatch(fetchHeroVideo());
  }, [dispatch]);

  useEffect(() => {
    if (themes.length > 0 && !videoLink) {
      setActiveTab(themes[0].title);
      setVideoLink(themes[0].videoUrl);
    }
  }, [themes, videoLink]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoLink]);

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={
          videoLink
            ? `${import.meta.env.VITE_BACKEND_URL}${videoLink}`
            : ladakhVideo
        }
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted={muted}
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />

      {/* Volume Button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md
               border border-white/30 rounded-full p-3 transition-all duration-300 shadow-lg"
      >
        {muted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>

      {/* Bottom Tabs */}
      <div className="absolute bottom-0 w-full flex justify-center z-30 pb-4">
        {themes.length > 1 && (
          <div className="flex bg-white shadow-xl rounded-full px-4 py-2 gap-4 overflow-x-auto max-w-full whitespace-nowrap">
            {themes.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(tab.title);
                  setVideoLink(tab.videoUrl);
                }}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                  activeTab === tab.title
                    ? "bg-gray-800 text-white shadow-md"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loader or Error */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-40 text-white text-xl">
          Loading video...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-40 text-red-400 text-lg">
          Failed to load videos.
        </div>
      )}
    </section>
  );
};

export default Hero;
