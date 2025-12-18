import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startUpdateDate, setStartUpdateDate] = useState("");
  const [endUpdateDate, setEndUpdateDate] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://assignment11-server-side-mu.vercel.app/all-bookings/${user.email}`
      )
      .then((res) => setBookings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user.email]);

  const isValidDate = (date) => /^\d{2}-\d{2}-\d{4}$/.test(date);

  const handleSaveUpdate = () => {
    if (!isValidDate(startUpdateDate) || !isValidDate(endUpdateDate)) {
      Swal.fire("Error", "Date must be DD-MM-YYYY", "error");
      return;
    }

    axios
      .patch(
        `https://assignment11-server-side-mu.vercel.app/updateBooking/${selectedBooking._id}`,
        {
          startDate: startUpdateDate,
          endDate: endUpdateDate,
        }
      )
      .then(() => {
        Swal.fire("Updated", "Booking updated successfully", "success");
        setBookings((prev) =>
          prev.map((b) =>
            b._id === selectedBooking._id
              ? { ...b, startDate: startUpdateDate, endDate: endUpdateDate }
              : b
          )
        );
        setIsEditModalOpen(false);
      })
      .catch(console.error);
  };

  const confirmCancelBooking = () => {
    axios
      .patch(
        `https://assignment11-server-side-mu.vercel.app/updateStatus/${selectedBooking._id}`
      )
      .then(() => {
        Swal.fire("Cancelled", "Booking cancelled", "success");
        setBookings((prev) =>
          prev.map((b) =>
            b._id === selectedBooking._id
              ? { ...b, bookingStatus: "Cancelled" }
              : b
          )
        );
        setIsCancelModalOpen(false);
      })
      .catch(console.error);
  };

  const chartData = {
    labels: bookings.map((b) => b.carModel),
    datasets: [
      {
        label: "Daily Rental Price",
        data: bookings.map((b) => b.dailyRentalPrice),
        borderColor: "hsl(var(--p))",
        backgroundColor: "hsl(var(--p) / 0.2)",
        fill: true,
      },
    ],
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
        <title>DriveEase | My Bookings</title>
      </Helmet>

      <h2 className="text-3xl text-center font-semibold mb-8 text-primary">
        My Bookings
      </h2>

      {/* Table */}
      <div className="overflow-x-auto mb-10">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Car</th>
              <th>Model</th>
              <th>Price/Day</th>
              <th>Start</th>
              <th>End</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>
                  <img
                    src={b.imageURL}
                    alt=""
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td>{b.carModel}</td>
                <td>${b.dailyRentalPrice}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>
                <td>${b.totalPrice.toFixed(2)}</td>
                <td
                  className={
                    b.bookingStatus === "Cancelled"
                      ? "text-error"
                      : "text-success"
                  }
                >
                  {b.bookingStatus}
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => {
                      setSelectedBooking(b);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => {
                      setSelectedBooking(b);
                      setIsCancelModalOpen(true);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <Line data={chartData} />
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Modify Booking
            </h3>

            <input
              className="input input-bordered w-full mb-3"
              placeholder="Start Date (DD-MM-YYYY)"
              onChange={(e) => setStartUpdateDate(e.target.value)}
            />
            <input
              className="input input-bordered w-full mb-4"
              placeholder="End Date (DD-MM-YYYY)"
              onChange={(e) => setEndUpdateDate(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveUpdate}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-6">
              Cancel this booking?
            </h3>
            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => setIsCancelModalOpen(false)}
              >
                No
              </button>
              <button
                className="btn btn-error"
                onClick={confirmCancelBooking}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
