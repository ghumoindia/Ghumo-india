import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DiscoverIndia from "./components/DiscoverIndia";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home";
import StatePage from "./pages/Statepage/StatePage";
import Experiences from "./pages/Experiences";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import "react-slideshow-image/dist/styles.css";
import CityPage from "./pages/Citypage/CityPage";
import FoodsPage from "./pages/Foods/FoodsPage";
import PlacesPage from "./pages/Places/PlacesPage";

function App() {
  return (
    <>
      <Navbar />
      {/* <Hero /> */}
      {/* <DiscoverIndia /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/state/:slug" element={<StatePage />} />
        <Route path="city/:slug" element={<CityPage />} />
        <Route path="/places/:slug" element={<PlacesPage />} />
        <Route path="/foods/:slug" element={<FoodsPage />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
