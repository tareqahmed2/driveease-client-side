import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Example car data
const specialOffers = [
  {
    id: 1,
    title: "Get 15% off for weekend rentals!",
    description: "Book now and save on your weekend getaway!",
    link: "/offers/weekend-rentals",
  },
  {
    id: 2,
    title: "Luxury cars at $99/day this holiday season!",
    description: "Drive in style this holiday season at an unbeatable price!",
    link: "/offers/luxury-cars",
  },
  {
    id: 3,
    title: "20% off on all SUVs for a limited time!",
    description: "Take on the road with an SUV and enjoy a 20% discount!",
    link: "/offers/suv-discount",
  },
  {
    id: 4,
    title: "Family-friendly car rentals with free GPS!",
    description: "Book a family car and get a free GPS navigation system.",
    link: "/offers/family-cars",
  },
  {
    id: 5,
    title: "Weekend Getaway Package: $50 off!",
    description: "Plan your weekend trip and save $50 on your booking!",
    link: "/offers/weekend-getaway",
  },
  {
    id: 6,
    title: "Winter Special: Rent an SUV and get 10% off!",
    description: "Perfect for winter travels, get 10% off on SUV rentals.",
    link: "/offers/winter-suvs",
  },
  {
    id: 7,
    title: "Rent a convertible for $59/day this summer!",
    description:
      "Feel the breeze in a convertible at an affordable price this summer!",
    link: "/offers/summer-convertibles",
  },
  {
    id: 8,
    title: "Book a minivan and get 15% off for long rentals!",
    description: "Rent a minivan for longer durations and get a 15% discount.",
    link: "/offers/minivan-discount",
  },
  {
    id: 9,
    title: "Free additional driver with every luxury car rental!",
    description: "Get an extra driver at no cost when you rent a luxury car.",
    link: "/offers/free-driver",
  },
  {
    id: 10,
    title: "Student discount: 10% off on all car rentals!",
    description: "Students can enjoy a 10% discount on any rental car!",
    link: "/offers/student-discount",
  },
  {
    id: 11,
    title: "Rent a car for 7 days and get the 8th day free!",
    description: "Book for a week and get one extra day of rental for free!",
    link: "/offers/7-for-8",
  },
  {
    id: 12,
    title: "Special offer: Get 20% off on weekend rentals!",
    description: "Weekend plans? Get 20% off when you book for the weekend!",
    link: "/offers/20-off-weekend",
  },
];

const SpecialOffers = () => {
  const navigate = useNavigate();
  return (
    <section className="my-16 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl text-purple-500 font-semibold text-center mb-5">
        Special Offers
      </h2>
      <p className="text-center text-gray-700 w-4/5 mx-auto mb-12">
        Unlock exclusive deals and discounts on car rentals! In this section,
        explore our limited-time offers designed to give you the best value for
        your next trip. Don’t miss out on these fantastic savings and book your
        ride today!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {specialOffers.map((offer) => (
          <motion.div
            key={offer.id}
            className="card w-full bg-base-100 shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { type: "spring", stiffness: 500, damping: 10 },
            }}
          >
            <div className="card-body text-center">
              <h2 className="card-title text-gray-800">{offer.title}</h2>
              <p className="text-gray-600">{offer.description}</p>
              <div className="card-actions justify-center mt-4">
                <button
                  onClick={() => navigate("/available-cars")}
                  className="btn btn-primary"
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
