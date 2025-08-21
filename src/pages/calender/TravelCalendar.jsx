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
import { useNavigate, useParams } from "react-router-dom";

const TravelCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthlyDestinations, setMonthlyDestinations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMonths, setShowMonths] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();

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

  const handleClick = (slug) => {
    return navigate(`/state/${slug}`);
  };

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
                  {console.log("state data ", state)}
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
                    <button
                      onClick={() => handleClick(state?.stateId?._id)}
                      className="w-full mt-4 bg-yellow-200  py-3 rounded-xl font-semibold hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
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
