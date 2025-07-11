import React from 'react';
import { FaLeaf, FaHandHoldingHeart, FaBoxOpen } from 'react-icons/fa';

const ImpactStats = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white dark:bg-neutral text-center">
      <div className='max-w-7xl mx-auto'>
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#257429] dark:text-[#c8facc] mb-3 font-[Poppins]">
        🌱 Our Community Impact
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-10 max-w-xl mx-auto fonts-inter">
        Together, we’ve reduced food waste and supported thousands in need — see how your contributions help create a greener world.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800 dark:text-gray-200">
        <div className="space-y-3 hover:scale-105 transition-all duration-300">
          <FaBoxOpen className="mx-auto text-5xl text-green-500" />
          <h3 className="text-3xl font-bold font-[Poppins]">5,200+ kg</h3>
          <p className="text-sm fonts-inter">Food Donated</p>
        </div>
        <div className="space-y-3 hover:scale-105 transition-all duration-300">
          <FaHandHoldingHeart className="mx-auto text-5xl text-yellow-500" />
          <h3 className="text-3xl font-bold font-[Poppins]">12,000+</h3>
          <p className="text-sm fonts-inter">Meals Served</p>
        </div>
        <div className="space-y-3 hover:scale-105 transition-all duration-300">
          <FaLeaf className="mx-auto text-5xl text-teal-500" />
          <h3 className="text-3xl font-bold font-[Poppins]">18,000+ kg</h3>
          <p className="text-sm fonts-inter">CO₂ Saved</p>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ImpactStats;