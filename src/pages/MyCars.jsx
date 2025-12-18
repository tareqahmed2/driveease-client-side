import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaSpinner, FaEdit, FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet";

const MyCars = () => {
  const { user } = useAuth();
  const email = user.email;

  const axiosSecure = useAxiosSecure();

  const [cars, setCars] = useState([]);
  const [sortOrder, setSortOrder] = useState("dateDesc");
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);

  const [formData, setFormData] = useState({
    carModel: "",
    dailyRentalPrice: "",
    availability: "Available",
    description: "",
    vehicleRegistrationNumber: "",
    features: "",
    images: "",
    location: "",
  });

  /* Fetch cars */
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/my-cars/${email}`)
      .then((res) => {
        setCars(res.data);
        sortCars(sortOrder, res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [email, sortOrder, axiosSecure]);

  /* Sorting */
  const sortCars = (order, data = cars) => {
    const sorted = [...data].sort((a, b) => {
      if (order === "dateDesc") return new Date(b.dateAdded) - new Date(a.dateAdded);
      if (order === "dateAsc") return new Date(a.dateAdded) - new Date(b.dateAdded);
      if (order === "priceAsc") return a.dailyRentalPrice - b.dailyRentalPrice;
      if (order === "priceDesc") return b.dailyRentalPrice - a.dailyRentalPrice;
      return 0;
    });
    setCars(sorted);
  };

  /* Edit */
  const handleEdit = (car) => {
    setCurrentCar(car);
    setFormData({
      carModel: car.carModel,
      dailyRentalPrice: car.dailyRentalPrice,
      availability: car.availability,
      description: car.description,
      vehicleRegistrationNumber: car.vehicleRegistrationNumber,
      features: car.features,
      images: car.images || "",
      location: car.location,
    });
    setModalOpen(true);
  };

  /* Update */
  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .patch(
        `https://assignment11-server-side-mu.vercel.app/my-cars/${currentCar._id}`,
        formData
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          setCars((prev) =>
            prev.map((car) =>
              car._id === currentCar._id ? { ...car, ...formData } : car
            )
          );
          Swal.fire("Updated!", "Car updated successfully", "success");
          setModalOpen(false);
        }
      })
      .catch(() =>
        Swal.fire("Error", "Failed to update car", "error")
      );
  };

  /* Delete */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This car will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://assignment11-server-side-mu.vercel.app/my-cars/${id}`
          )
          .then(() => {
            setCars((prev) => prev.filter((car) => car._id !== id));
            Swal.fire("Deleted!", "Car removed", "success");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 my-10 text-base-content">
      <Helmet>
        <title>DriveEase | My Cars</title>
      </Helmet>

      <div className="bg-base-200 rounded-xl shadow-xl p-6">
        <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
          My Cars
        </h2>

        {/* Sort */}
        <div className="flex justify-between mb-4">
          <select
            className="select select-bordered"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="dateDesc">Newest First</option>
            <option value="dateAsc">Oldest First</option>
            <option value="priceAsc">Price Low → High</option>
            <option value="priceDesc">Price High → Low</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Image</th>
                <th>Model</th>
                <th>Price/Day</th>
                <th>Status</th>
                <th>Bookings</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <img
                      src={car.imageURL}
                      alt={car.carModel}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td>{car.carModel}</td>
                  <td>${car.dailyRentalPrice}</td>
                  <td>{car.availability}</td>
                  <td>{car.bookingCount}</td>
                  <td>{car.dateAdded}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleEdit(car)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(car._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Update Car
            </h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                className="input input-bordered w-full"
                placeholder="Car Model"
                value={formData.carModel}
                onChange={(e) =>
                  setFormData({ ...formData, carModel: e.target.value })
                }
              />

              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Daily Price"
                value={formData.dailyRentalPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dailyRentalPrice: e.target.value,
                  })
                }
              />

              <select
                className="select select-bordered w-full"
                value={formData.availability}
                onChange={(e) =>
                  setFormData({ ...formData, availability: e.target.value })
                }
              >
                <option>Available</option>
                <option>Not Available</option>
              </select>

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <input
                className="input input-bordered w-full"
                placeholder="Features"
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
              />

              <input
                className="input input-bordered w-full"
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <input
                className="input input-bordered w-full"
                placeholder="Image URL"
                value={formData.images}
                onChange={(e) =>
                  setFormData({ ...formData, images: e.target.value })
                }
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCars;
