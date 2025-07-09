import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="w-full">
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false}>
        {/* Slide 1 */}
        <div className="relative">
          <img src="assets/1.jpeg" className="h-[60vh] md:h-[80vh] w-full object-cover" alt="Banner 1" />
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
        <div className="relative">
          <img src="assets/2.jpeg" className="h-[60vh] md:h-[80vh] w-full object-cover" alt="Banner 2" />
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
        <div className="relative">
          <img src="assets/3.jpeg" className="h-[60vh] md:h-[80vh] w-full object-cover" alt="Banner 3" />
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
  );
};

export default Banner;