import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Thermometer,
  Cloud,
  Sun,
  Snowflake,
  Star,
  Clock,
  Camera,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { getMonthCalendar } from "../../hooks/slices/calenderSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TravelCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthlyDestinations, setMonthlyDestinations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMonths, setShowMonths] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Enhanced data structure with image placeholders and more details
  // const monthlyDestinations = {
  //   1: {
  //     // January
  //     month: "January",
  //     season: "Winter",
  //     icon: <Snowflake className="w-6 h-6 text-blue-400" />,
  //     weather: "Cool and Pleasant",
  //     description:
  //       "Perfect time for desert exploration and southern India tours",
  //     states: [
  //       {
  //         name: "Rajasthan",
  //         image:
  //           "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer"],
  //         reason: "Perfect weather for desert exploration and palace tours",
  //         temp: "10-25°C",
  //         rating: 4.8,
  //         bestFor: [
  //           "Desert Safari",
  //           "Palace Tours",
  //           "Cultural Festivals",
  //           "Photography",
  //         ],
  //         famousFor: "Pink City & Desert Culture",
  //       },
  //       {
  //         name: "Kerala",
  //         image:
  //           "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Kochi", "Munnar", "Alleppey", "Thekkady"],
  //         reason: "Cool climate ideal for backwaters and hill stations",
  //         temp: "23-32°C",
  //         rating: 4.7,
  //         bestFor: ["Backwater Cruise", "Tea Gardens", "Wildlife", "Ayurveda"],
  //         famousFor: "God's Own Country",
  //       },
  //       {
  //         name: "Goa",
  //         image:
  //           "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Panaji", "Margao", "Calangute", "Arambol"],
  //         reason: "Peak tourist season with perfect beach weather",
  //         temp: "20-32°C",
  //         rating: 4.6,
  //         bestFor: [
  //           "Beach Life",
  //           "Water Sports",
  //           "Nightlife",
  //           "Portuguese Heritage",
  //         ],
  //         famousFor: "Beach Paradise",
  //       },
  //     ],
  //   },
  //   2: {
  //     // February
  //     month: "February",
  //     season: "Winter",
  //     icon: <Snowflake className="w-6 h-6 text-blue-400" />,
  //     weather: "Cool and Pleasant",
  //     description: "Ideal month for desert states and coastal regions",
  //     states: [
  //       {
  //         name: "Rajasthan",
  //         image:
  //           "https://images.unsplash.com/photo-1599661046827-dacde7996a93?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Jaipur", "Udaipur", "Mount Abu", "Pushkar"],
  //         reason: "Perfect weather continues for heritage tours",
  //         temp: "12-28°C",
  //         rating: 4.9,
  //         bestFor: [
  //           "Heritage Tours",
  //           "Desert Safari",
  //           "Folk Culture",
  //           "Photography",
  //         ],
  //         famousFor: "Royal Heritage",
  //       },
  //       {
  //         name: "Karnataka",
  //         image:
  //           "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Bangalore", "Mysore", "Hampi", "Coorg"],
  //         reason: "Pleasant weather for historical sites",
  //         temp: "18-30°C",
  //         rating: 4.5,
  //         bestFor: ["Historical Sites", "Palaces", "Coffee Tours", "Gardens"],
  //         famousFor: "Garden City & Ancient Ruins",
  //       },
  //       {
  //         name: "Tamil Nadu",
  //         image:
  //           "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Chennai", "Madurai", "Kanyakumari", "Pondicherry"],
  //         reason: "Comfortable climate for temple tours",
  //         temp: "20-30°C",
  //         rating: 4.4,
  //         bestFor: [
  //           "Temple Tours",
  //           "Beach Visits",
  //           "Cultural Sites",
  //           "French Architecture",
  //         ],
  //         famousFor: "Temple Architecture",
  //       },
  //     ],
  //   },
  //   3: {
  //     // March
  //     month: "March",
  //     season: "Spring",
  //     icon: <Sun className="w-6 h-6 text-yellow-400" />,
  //     weather: "Warm and Pleasant",
  //     description: "Spring arrives with blooming flowers in hill stations",
  //     states: [
  //       {
  //         name: "Himachal Pradesh",
  //         image:
  //           "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Shimla", "Manali", "Dharamshala", "Kasol"],
  //         reason: "Snow melting season perfect for hill stations",
  //         temp: "15-25°C",
  //         rating: 4.7,
  //         bestFor: [
  //           "Mountain Views",
  //           "Adventure Sports",
  //           "Tibetan Culture",
  //           "Trekking",
  //         ],
  //         famousFor: "Queen of Hills",
  //       },
  //       {
  //         name: "Uttarakhand",
  //         image:
  //           "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Dehradun", "Mussoorie", "Rishikesh", "Haridwar"],
  //         reason: "Ideal for spiritual and adventure tourism",
  //         temp: "18-28°C",
  //         rating: 4.6,
  //         bestFor: [
  //           "Yoga Retreats",
  //           "River Rafting",
  //           "Pilgrimage",
  //           "Mountain Views",
  //         ],
  //         famousFor: "Dev Bhoomi",
  //       },
  //       {
  //         name: "West Bengal",
  //         image:
  //           "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Darjeeling", "Kalimpong", "Kolkata", "Sundarbans"],
  //         reason: "Pleasant weather in hills and cultural exploration",
  //         temp: "15-28°C",
  //         rating: 4.3,
  //         bestFor: [
  //           "Tea Gardens",
  //           "Toy Train",
  //           "Cultural Heritage",
  //           "Wildlife",
  //         ],
  //         famousFor: "Cultural Capital",
  //       },
  //     ],
  //   },
  //   4: {
  //     // April
  //     month: "April",
  //     season: "Spring/Summer",
  //     icon: <Sun className="w-6 h-6 text-orange-400" />,
  //     weather: "Warm",
  //     description: "Spring blooms in Kashmir while hill stations come alive",
  //     states: [
  //       {
  //         name: "Jammu & Kashmir",
  //         image:
  //           "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"],
  //         reason: "Spring season with famous tulip gardens",
  //         temp: "12-23°C",
  //         rating: 4.9,
  //         bestFor: [
  //           "Tulip Gardens",
  //           "Shikara Rides",
  //           "Snow Activities",
  //           "Houseboats",
  //         ],
  //         famousFor: "Paradise on Earth",
  //       },
  //       {
  //         name: "Sikkim",
  //         image:
  //           "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Gangtok", "Pelling", "Lachung", "Yumthang"],
  //         reason: "Rhododendrons in full bloom",
  //         temp: "10-20°C",
  //         rating: 4.8,
  //         bestFor: [
  //           "Mountain Views",
  //           "Monasteries",
  //           "Valley of Flowers",
  //           "Adventure",
  //         ],
  //         famousFor: "Land of Mystical Mountains",
  //       },
  //       {
  //         name: "Meghalaya",
  //         image:
  //           "https://images.unsplash.com/photo-1578608712688-36b5be8823dc?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Shillong", "Cherrapunji", "Mawlynnong", "Dawki"],
  //         reason: "Pre-monsoon freshness and clear skies",
  //         temp: "15-25°C",
  //         rating: 4.5,
  //         bestFor: [
  //           "Living Root Bridges",
  //           "Waterfalls",
  //           "Clean Villages",
  //           "Crystal Waters",
  //         ],
  //         famousFor: "Abode of Clouds",
  //       },
  //     ],
  //   },
  //   5: {
  //     // May
  //     month: "May",
  //     season: "Summer",
  //     icon: <Sun className="w-6 h-6 text-red-400" />,
  //     weather: "Hot in Plains, Pleasant in Hills",
  //     description:
  //       "Escape to cool hill stations and high altitude destinations",
  //     states: [
  //       {
  //         name: "Ladakh",
  //         image:
  //           "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Leh", "Nubra Valley", "Pangong Lake", "Kargil"],
  //         reason: "Roads open after harsh winter",
  //         temp: "5-20°C",
  //         rating: 4.9,
  //         bestFor: [
  //           "High Altitude Desert",
  //           "Buddhist Monasteries",
  //           "Adventure",
  //           "Stargazing",
  //         ],
  //         famousFor: "Land of High Passes",
  //       },
  //       {
  //         name: "Himachal Pradesh",
  //         image:
  //           "https://images.unsplash.com/photo-1609688669309-fc15db557633?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Manali", "Shimla", "Spiti Valley", "Kullu"],
  //         reason: "Perfect escape from scorching plains",
  //         temp: "15-25°C",
  //         rating: 4.7,
  //         bestFor: [
  //           "Cool Climate",
  //           "Mountain Adventures",
  //           "Scenic Beauty",
  //           "Apple Orchards",
  //         ],
  //         famousFor: "Summer Capital",
  //       },
  //       {
  //         name: "Uttarakhand",
  //         image:
  //           "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Nainital", "Mussoorie", "Auli", "Jim Corbett"],
  //         reason: "Hill station season in full swing",
  //         temp: "18-28°C",
  //         rating: 4.6,
  //         bestFor: [
  //           "Lake Views",
  //           "Mountain Resorts",
  //           "Nature Walks",
  //           "Wildlife Safari",
  //         ],
  //         famousFor: "Queen of Hills",
  //       },
  //     ],
  //   },
  //   6: {
  //     // June
  //     month: "June",
  //     season: "Summer/Pre-Monsoon",
  //     icon: <Cloud className="w-6 h-6 text-gray-400" />,
  //     weather: "Hot and Humid",
  //     description: "Best time for high altitude destinations before monsoon",
  //     states: [
  //       {
  //         name: "Ladakh",
  //         image:
  //           "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Leh", "Kargil", "Zanskar", "Tso Moriri"],
  //         reason: "Peak season with clear mountain roads",
  //         temp: "10-25°C",
  //         rating: 4.9,
  //         bestFor: ["Trekking", "Monasteries", "High Passes", "Desert Safari"],
  //         famousFor: "Moon Land",
  //       },
  //       {
  //         name: "Himachal Pradesh",
  //         image:
  //           "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Manali", "Kasol", "Tosh", "Malana"],
  //         reason: "Perfect hill station weather",
  //         temp: "18-30°C",
  //         rating: 4.7,
  //         bestFor: ["River Valleys", "Trekking", "Mountain Views", "Camping"],
  //         famousFor: "Adventure Paradise",
  //       },
  //       {
  //         name: "Arunachal Pradesh",
  //         image:
  //           "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=250&fit=crop&crop=center",
  //         cities: ["Itanagar", "Tawang", "Bomdila", "Ziro"],
  //         reason: "Pre-monsoon exploration of Northeast",
  //         temp: "15-25°C",
  //         rating: 4.4,
  //         bestFor: [
  //           "Monasteries",
  //           "Tribal Culture",
  //           "Mountain Views",
  //           "Festivals",
  //         ],
  //         famousFor: "Land of Rising Sun",
  //       },
  //     ],
  //   },
  // };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getIconForMonth = (month) => {
    if (month <= 2 || month === 12)
      return <Snowflake className="w-6 h-6 text-blue-400" />;
    if (month <= 5) return <Sun className="w-6 h-6 text-yellow-400" />;
    if (month <= 8) return <Sun className="w-6 h-6 text-red-400" />;
    return <Cloud className="w-6 h-6 text-gray-400" />;
  };

  const handleMonthClick = async (monthIndex) => {
    try {
      setLoading(true);
      setError(null);
      const result = await dispatch(
        getMonthCalendar({ monthNumber: monthIndex + 1 })
      );
      console.log("Fetched monthly destinations:", result.payload);
      if (result.payload.success) {
        const updateData = {
          ...result.payload.calendar,
          icon: getIconForMonth(monthIndex + 1),
        };

        setSelectedMonth(monthIndex + 1);
        setMonthlyDestinations(updateData);
      } else {
        toast.error("No data found for this month");
        setError("No data found for this month");
        setMonthlyDestinations(null);
      }
    } catch (error) {
      console.error("Error fetching monthly destinations:", error);
      setError(
        error.message || "Failed to fetch destinations. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getSeasonGradient = (season) => {
    switch (season) {
      case "Winter":
        return "from-blue-600 to-cyan-600";
      case "Spring":
        return "from-green-500 to-emerald-600";
      case "Summer":
        return "from-orange-500 to-red-600";
      case "Monsoon":
        return "from-gray-600 to-blue-700";
      case "Post-Monsoon":
        return "from-emerald-600 to-teal-600";
      case "Autumn":
        return "from-yellow-500 to-orange-600";
      case "Post-Monsoon/Autumn":
        return "from-amber-500 to-orange-600";
      case "Spring/Summer":
        return "from-lime-500 to-yellow-600";
      case "Summer/Pre-Monsoon":
        return "from-red-500 to-pink-600";
      case "Autumn/Winter":
        return "from-indigo-500 to-blue-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const handleRetry = () => {
    console.log("Retrying fetch for month:", selectedMonth);
    setSelectedMonth(null);
    setError(null);
    setShowMonths(true);
  };

  console.log(error, loading, "Error in TravelCalendar component");

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">
          Loading Destinations
        </h3>
        <p className="text-gray-600">
          Finding the perfect places for your journey...
        </p>
        <div className="flex items-center justify-center space-x-1 mt-4">
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );

  console.log("Monthly Destinations:", selectedMonth);

  const ErrorDisplay = () => (
    <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
      <div className="p-4 bg-red-100 rounded-full">
        <AlertCircle className="w-12 h-12 text-red-600" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 max-w-md">{error}</p>
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-white rounded-full">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
              Seasonal Travel Guide
            </h1>
          </div>

          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover India's most beautiful destinations at their perfect time.
            Click any month to explore handpicked states with ideal weather
            conditions.
          </p>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && !loading && <ErrorDisplay />}

        {/* Interactive Month Selection */}
        {!selectedMonth && !error && !loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthClick(index)}
                className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-200 hover:border-blue-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {month}
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-yellow-500 transition-colors duration-300">
                    Explore Destinations
                  </div>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="inline-flex items-center text-xs text-yellow-600 font-medium">
                      Click to discover <span className="ml-1">→</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Selected Month Content */}
        {selectedMonth && monthlyDestinations && !loading && !error && (
          <div className="space-y-8">
            {/* Back Button */}
            <button
              onClick={() => setSelectedMonth(null)}
              className="group flex items-center gap-3 text-yellow-500 hover:text-yellow-800 font-semibold text-lg transition-colors duration-300 mb-8"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              Back to Calendar
            </button>

            {/* Month Header */}
            <div
              className={`relative overflow-hidden bg-gradient-to-r ${getSeasonGradient(
                monthlyDestinations.season
              )} rounded-3xl p-12 text-white shadow-2xl`}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <div className="flex items-center gap-6 mb-6 lg:mb-0">
                    <div className="p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                      {monthlyDestinations.icon}
                    </div>
                    <div>
                      <h2 className="text-4xl lg:text-5xl font-bold mb-2">
                        {monthlyDestinations.month}
                      </h2>
                      <p className="text-xl opacity-90 mb-3">
                        {monthlyDestinations.season} Season
                      </p>
                      <p className="text-lg opacity-80 max-w-2xl">
                        {monthlyDestinations.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-center lg:text-right">
                    <div className="flex items-center justify-center lg:justify-end gap-3 text-lg font-medium mb-2">
                      <Thermometer className="w-6 h-6" />
                      <span>{monthlyDestinations.weather}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* State Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {monthlyDestinations.states.map((state, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100"
                >
                  {/* State Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${state?.image}`}
                      alt={state.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {state.name}
                      </h3>
                      <p className="text-white text-sm opacity-90">
                        {state.famousFor}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
                      <Camera className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>

                  {/* State Content */}
                  <div className="p-6 space-y-5">
                    {/* Rating and Temperature */}
                    <div className="flex items-center justify-between">
                      {renderStarRating(state.rating)}
                      <div className="flex items-center gap-1 text-blue-600 font-semibold">
                        <Thermometer className="w-4 h-4" />
                        <span className="text-sm">{state.temp}</span>
                      </div>
                    </div>

                    {/* Reason */}
                    <p className="text-gray-700 leading-relaxed">
                      {state.reason}
                    </p>

                    {/* Popular Cities */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        Popular Cities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {state.cities.map((city, cityIndex) => (
                          <span
                            key={cityIndex}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Best Activities */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Best Experiences
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {state.bestFor.map((activity, actIndex) => (
                          <div
                            key={actIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-700">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full mt-4 bg-yellow-200  py-3 rounded-xl font-semibold hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Explore {state.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Section */}
        {!loading && (
          <div className="mt-16 text-center bg-yellow-400 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Plan Your Journey?
            </h3>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              Let us help you create unforgettable memories across India's
              diverse landscapes and rich cultural heritage.
            </p>
            <button className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Start Planning Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelCalendar;
