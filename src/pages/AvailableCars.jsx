import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://assignment11-server-side-mu.vercel.app/all-cars")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      car.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.dailyRentalPrice - b.dailyRentalPrice;
    }
    if (sortBy === "price-desc") {
      return b.dailyRentalPrice - a.dailyRentalPrice;
    }
    if (sortBy === "booking-asc") {
      return a.bookingCount - b.bookingCount;
    }
    if (sortBy === "booking-desc") {
      return b.bookingCount - a.bookingCount;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 p-4">
      <Helmet>
        <title>DriveEase | Available Cars</title>
      </Helmet>

      <h2 className="text-4xl font-bold text-center mb-4 text-primary">
        Available Cars
      </h2>

      <p className="text-center max-w-3xl mx-auto text-base-content mb-8">
        Browse our wide range of cars. Choose the perfect vehicle for your next
        journey with comfort and confidence.
      </p>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by model or location"
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
        <select
          className="select select-bordered w-full sm:w-64"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price (Low → High)</option>
          <option value="price-desc">Price (High → Low)</option>
          <option value="booking-asc">Booking Count (Low → High)</option>
          <option value="booking-desc">Booking Count (High → Low)</option>
        </select>

        <button
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          className="btn btn-outline btn-primary"
        >
          Switch to {view === "grid" ? "List" : "Grid"} View
        </button>
      </div>

      {/* Cars */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {sortedCars.map((car) => (
          <div
            key={car._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
          >
            <figure>
              <img
                src={car.imageURL}
                alt={car.carModel}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{car.carModel}</h3>
              <p>Price: ${car.dailyRentalPrice} / day</p>
              <p>Location: {car.location}</p>
              <p>Bookings: {car.bookingCount}</p>

              <div className="card-actions justify-end">
                <button
                  onClick={() => navigate(`/car-details/${car._id}`)}
                  className="btn btn-primary btn-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
