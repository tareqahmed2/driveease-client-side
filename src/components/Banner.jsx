import React from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/bg-img.jpg";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div
        className="relative my-10 rounded-2xl h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10 text-center flex flex-col items-center px-4 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold mb-6">
            Drive Your Dreams Today!
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl opacity-90">
            Start your journey with the best cars on the market. Explore a wide
            range of vehicles that fit your needs, style, and budget. Find your
            perfect match today!
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={() => navigate("/available-cars")}
              className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform"
            >
              View Available Cars
            </button>

            <button
              onClick={() => navigate("/register")}
              className="btn btn-outline btn-accent btn-lg shadow-lg hover:scale-105 transition-transform"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
