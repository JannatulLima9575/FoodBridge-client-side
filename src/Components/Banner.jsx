import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';

const Banner = () => {
  return (
    <div className="w-full">
    <div className="">
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false}>
        {/* Slide 1 */}
        <div className="relative h-[60vh] md:h-[80vh]">
          <img src={hero1} className="w-full h-full object-cover" alt="Banner 1" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4 md:px-12 text-white">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                Reduce Food Waste. Feed Communities.
              </h2>
              <p className="text-sm md:text-lg font-body">
                Connecting restaurants with charities to create a hunger-free world.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[60vh] md:h-[80vh]">
          <img src={hero2} className="w-full h-full object-cover" alt="Banner 2" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4 md:px-12 text-white">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                Share Surplus, Spread Smiles
              </h2>
              <p className="text-sm md:text-lg font-body">
                Join hands to minimize waste and maximize impact.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[60vh] md:h-[80vh]">
          <img src={hero3} className="w-full h-full object-cover" alt="Banner 3" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4 md:px-12 text-white">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                Every Meal Matters
              </h2>
              <p className="text-sm md:text-lg font-body">
                Your small action can make a big difference.
              </p>
            </div>
          </div>
        </div>
      </Carousel>
      </div>
    </div>
  );
};

export default Banner;