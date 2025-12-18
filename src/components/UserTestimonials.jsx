import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.postimg.cc/5yjH8ydX/jhon.jpg",
    rating: 5,
    review: "Amazing service and great cars. Highly recommend!",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://i.postimg.cc/FsddRYVq/smith.jpg",
    rating: 4,
    review: "Had a great experience renting a car. Will definitely use again!",
  },
  {
    id: 3,
    name: "David Brown",
    image: "https://i.postimg.cc/s2c1873B/daniel.jpg",
    rating: 5,
    review: "The booking process was smooth, and the car was fantastic!",
  },
];

const UserTestimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const fadeInOut = useSpring({
    loop: { reverse: true },
    from: { opacity: 0.7 },
    to: { opacity: 1 },
    config: { duration: 2000 },
  });

  return (
    <section className="max-w-7xl px-6 mx-auto text-base-content">
      <div className="my-16 py-12 rounded-xl border border-base-300 bg-base-200 shadow-lg">
        {/* Heading */}
        <h2 className="text-4xl font-semibold text-center mb-4 text-primary">
          What Our Customers Say
        </h2>

        {/* Description */}
        <p className="text-center mb-12 max-w-3xl mx-auto opacity-80">
          Discover the real stories behind our customer satisfaction! We share
          honest feedback from people who experienced our reliable and seamless
          car rental services.
        </p>

        {/* Slider */}
        <Slider {...settings} className="px-4">
          {testimonials.map((testimonial) => (
            <animated.div
              key={testimonial.id}
              style={fadeInOut}
              className="flex flex-col items-center text-center p-8 rounded-xl bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <animated.img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-28 h-28 mx-auto rounded-full mb-6 shadow-md border-4 border-base-300"
                style={fadeInOut}
              />

              <h3 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                {testimonial.name}
              </h3>

              <div className="flex mb-3 justify-center">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <FaStar
                    key={idx}
                    className="text-warning text-lg"
                  />
                ))}
              </div>

              <p className="text-lg italic opacity-80">
                “{testimonial.review}”
              </p>
            </animated.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default UserTestimonials;
