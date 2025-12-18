import React from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/Banner";
import WhyChooseUs from "../components/WhyChooseUs";
import RecentListings from "../components/RecentListings";
import UserTestimonials from "../components/UserTestimonials";
import SpecialOffers from "../components/SpecialOffers";

const Home = () => {
  return (
    <div className="bg-base-100 text-base-content">
      <Helmet>
        <title>DriveEase | Home</title>
        <meta
          name="description"
          content="DriveEase – Rent and explore the best cars for every journey. Browse recent listings, special offers, and user testimonials."
        />
        <link rel="canonical" href="https://driveease.com/" />
      </Helmet>

      {/* Banner */}
      <section className="pt-4">
        <Banner />
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-base-200">
        <WhyChooseUs />
      </section>

      {/* Recent Listings */}
      <section className="py-16">
        <RecentListings />
      </section>

      {/* User Testimonials */}
      <section className="py-16 bg-base-200">
        <UserTestimonials />
      </section>

      {/* Special Offers */}
      <section className="py-16">
        <SpecialOffers />
      </section>
    </div>
  );
};

export default Home;
