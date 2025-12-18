import React from "react";
import {
  FaCar,
  FaDollarSign,
  FaClipboardCheck,
  FaHeadset,
} from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="my-16 px-6 max-w-7xl mx-auto text-base-content">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl text-center mb-3 font-bold text-primary">
        Why Choose Us?
      </h2>

      <p className="text-center text-lg sm:text-xl mb-10 opacity-80 max-w-3xl mx-auto">
        Your trusted partner for reliable, affordable, and hassle-free car
        rental services, tailored to meet your every need.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {/* Wide Variety of Cars */}
        <div className="flex flex-col items-center text-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <FaCar className="text-5xl text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Wide Variety of Cars
          </h3>
          <p className="opacity-80 text-sm">
            From budget-friendly options to luxury vehicles, we have something
            for everyone.
          </p>
        </div>

        {/* Affordable Prices */}
        <div className="flex flex-col items-center text-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <FaDollarSign className="text-5xl text-success mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Affordable Prices
          </h3>
          <p className="opacity-80 text-sm">
            Competitive daily rates you can count on, making your rental
            cost-effective.
          </p>
        </div>

        {/* Easy Booking Process */}
        <div className="flex flex-col items-center text-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <FaClipboardCheck className="text-5xl text-warning mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Easy Booking Process
          </h3>
          <p className="opacity-80 text-sm">
            Seamlessly book your ride in just a few clicks, making your
            experience hassle-free.
          </p>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col items-center text-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <FaHeadset className="text-5xl text-secondary mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Customer Support
          </h3>
          <p className="opacity-80 text-sm">
            24/7 assistance for all your queries to ensure you're always taken
            care of.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
