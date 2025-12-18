import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/all-cars/${id}`)
      .then((res) => setCarData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  const handleBooking = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleDateSelection = async () => {
    if (!startDate || !endDate) {
      toast.warn("Please select both dates");
      return;
    }

    if (
      !/^\d{2}-\d{2}-\d{4}$/.test(startDate) ||
      !/^\d{2}-\d{2}-\d{4}$/.test(endDate)
    ) {
      toast.warn("Date format must be DD-MM-YYYY");
      return;
    }

    const bookingData = {
      CarId: selectedCar._id,
      carModel: selectedCar.carModel,
      dailyRentalPrice: selectedCar.dailyRentalPrice,
      imageURL: selectedCar.imageURL,
      email: user.email,
      startDate,
      endDate,
      bookingStatus: "Confirmed",
      totalPrice:
        selectedCar.dailyRentalPrice +
        selectedCar.dailyRentalPrice * 0.1,
    };

    try {
      await axios.post(
        "https://assignment11-server-side-mu.vercel.app/all-bookings",
        bookingData
      );

      Swal.fire("Success", "Booking Confirmed!", "success");
      setShowModal(false);
      navigate("/my-bookings");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Booking failed", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 text-base-content">
      <Helmet>
        <title>DriveEase | Car Details</title>
      </Helmet>

      {carData.map((car) => (
        <div
          key={car._id}
          className="card bg-base-200 shadow-xl mb-8"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl text-primary">
              {car.carModel}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={car.imageURL}
                alt={car.carModel}
                className="rounded-lg w-full h-64 object-cover"
              />

              <div className="space-y-3">
                <p className="text-lg font-semibold">
                  Price per Day: ${car.dailyRentalPrice}
                </p>
                <p>Availability: {car.availability}</p>
                <p>Features: {car.features}</p>
                <p className="opacity-80">{car.description}</p>

                <button
                  className="btn btn-success mt-4"
                  onClick={() => handleBooking(car)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              {selectedCar.carModel}
            </h3>

            <img
              src={selectedCar.imageURL}
              alt=""
              className="w-full h-40 object-cover rounded mb-4"
            />

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Start Date (DD-MM-YYYY)"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="End Date (DD-MM-YYYY)"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleDateSelection}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
