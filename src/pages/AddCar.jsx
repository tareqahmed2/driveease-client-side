import React from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());

    const options = {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    const formatter = new Intl.DateTimeFormat("en-GB", options);
    const currentTimeInDhaka = formatter.format(new Date());

    const carData = {
      ...initialData,
      bookingCount: 0,
      bookingStatus: "Pending",
      addedBy: user.email,
      dateAdded: currentTimeInDhaka,
    };

    try {
      const res = await axios.post(
        "https://assignment11-server-side-mu.vercel.app/all-cars",
        carData
      );

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Car added successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add car", "error");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <Helmet>
        <title>DriveEase | Add Car</title>
      </Helmet>

      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl p-8 text-base-content">
        <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
          Add New Car
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Car Model</span>
            </label>
            <input
              name="carModel"
              type="text"
              className="input input-bordered"
              placeholder="Enter car model"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Daily Rental Price</span>
            </label>
            <input
              name="dailyRentalPrice"
              type="number"
              className="input input-bordered"
              placeholder="Price per day"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Availability</span>
            </label>
            <select
              name="availability"
              className="select select-bordered"
              required
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Vehicle Registration Number</span>
            </label>
            <input
              name="vehicleRegistrationNumber"
              type="text"
              className="input input-bordered"
              placeholder="Registration number"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Features</span>
            </label>
            <input
              name="features"
              type="text"
              className="input input-bordered"
              placeholder="GPS, AC, Sunroof"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered"
              placeholder="Car description"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              name="location"
              type="text"
              className="input input-bordered"
              placeholder="City / Area"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Car Image URL</span>
            </label>
            <input
              name="imageURL"
              type="url"
              className="input input-bordered"
              placeholder="https://image-url"
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-1/2"
            >
              Save Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
