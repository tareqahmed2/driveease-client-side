import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Offer data
const specialOffers = [
  {
    id: 1,
    title: "Get 15% off for weekend rentals!",
    description: "Book now and save on your weekend getaway!",
  },
  {
    id: 2,
    title: "Luxury cars at $99/day this holiday season!",
    description: "Drive in style this holiday season at an unbeatable price!",
  },
  {
    id: 3,
    title: "20% off on all SUVs for a limited time!",
    description: "Take on the road with an SUV and enjoy a 20% discount!",
  },
  {
    id: 4,
    title: "Free GPS with all bookings this month!",
    description:
      "Navigate your journey with a free GPS included in your rental!",
  },
  {
    id: 5,
    title: "Up to 30% off on long-term rentals!",
    description: "The longer you rent, the more you save!",
  },
  {
    id: 6,
    title: "Rent one, get one free!",
    description: "Rent a car and get another free for a limited time!",
  },
  {
    id: 7,
    title: "20% off for first-time renters!",
    description: "New to us? Enjoy a 20% discount on your first rental!",
  },
  {
    id: 8,
    title: "Weekend getaway special: $49/day for compact cars!",
    description:
      "Perfect for a short trip, rent a compact car for just $49/day!",
  },
];

const SpecialOffers = () => {
  const navigate = useNavigate();

  return (
    <section className="my-16 max-w-7xl mx-auto px-6 text-base-content">
      {/* Heading */}
      <h2 className="text-4xl font-semibold text-center mb-5 text-primary">
        Special Offers
      </h2>

      {/* Description */}
      <p className="text-center max-w-3xl mx-auto mb-12 opacity-80">
        Unlock exclusive deals and discounts on car rentals! Explore our
        limited-time offers designed to give you the best value for your next
        trip. Don’t miss out on these fantastic savings and book your ride
        today!
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {specialOffers.map((offer) => (
          <motion.div
            key={offer.id}
            className="card bg-base-200 shadow-lg hover:shadow-2xl transition-transform"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="card-body text-center">
              <h3 className="card-title justify-center text-lg">
                {offer.title}
              </h3>

              <p className="opacity-80 text-sm">
                {offer.description}
              </p>

              <div className="card-actions justify-center mt-4">
                <button
                  onClick={() => {
                    navigate("/available-cars");
                    window.scrollTo(0, 0);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
