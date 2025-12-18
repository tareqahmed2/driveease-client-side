import React from "react";
import { useNavigate } from "react-router-dom";
import error from "../assets/error.jpg";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center px-6">
      <div className="card bg-base-200 shadow-xl max-w-xl w-full text-center p-10 rounded-2xl">
        {/* Image */}
        <figure className="flex justify-center mb-6">
          <img
            src={error}
            alt="404 Error"
            className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-lg ring ring-primary ring-offset-base-200 ring-offset-4"
          />
        </figure>

        {/* Text */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Page Not Found
        </h1>

        <p className="text-base md:text-lg opacity-80 mb-8">
          Oops! We couldn’t find the page you’re looking for. The page may have
          been moved or deleted.
        </p>

        {/* Action */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary btn-lg hover:scale-105 transition-transform"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
