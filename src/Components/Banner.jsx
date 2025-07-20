import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import hero1 from '../assets/heroOne.png';
import hero2 from '../assets/heroTwo.png';
import hero3 from '../assets/heroThree.png';

const Banner = () => {
  const slides = [
    {
      title: "Reduce Food Waste. Feed Communities.",
      desc: "Connecting restaurants with charities to create a hunger-free world.",
      image: hero1
    },
    {
      title: "Share Surplus, Spread Smiles",
      desc: "Join hands to minimize waste and maximize impact.",
      image: hero2
    },
    {
      title: "Every Meal Matters",
      desc: "Your small action can make a big difference.",
      image: hero3
    }
  ];

  return (
    <div className="w-full font-poppins">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="bg-[#fffceb] dark:bg-[#1e1e1e] px-4 md:px-16 py-10 md:py-20"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
              
              {/* Left: Text */}
              <div className="md:w-1/2 text-center md:text-left space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-[#1e1e1e] dark:text-white poppins-thin">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 fonts-inter">
                  {slide.desc}
                </p>
                <button to="/donations" className="btn mt-4 bg-[#F9A825] text-white hover:bg-[#f57f17] fonts-inter">
                  Donate Now
                </button>
              </div>

              {/* Right: Image (no border, no shadow, no rounded) */}
              <div className="md:w-1/2">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;