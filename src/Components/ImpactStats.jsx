import React from 'react';
import { FaLeaf, FaHandHoldingHeart, FaBoxOpen } from 'react-icons/fa';

const ImpactStats = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-white dark:bg-neutral text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
        🌱 Our Community Impact
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800 dark:text-gray-200">
        <div className="space-y-2">
          <FaBoxOpen className="mx-auto text-4xl text-green-500" />
          <h3 className="text-3xl font-bold">5,200+ kg</h3>
          <p className="text-sm">Food Donated</p>
        </div>
        <div className="space-y-2">
          <FaHandHoldingHeart className="mx-auto text-4xl text-yellow-500" />
          <h3 className="text-3xl font-bold">12,000+</h3>
          <p className="text-sm">Meals Served</p>
        </div>
        <div className="space-y-2">
          <FaLeaf className="mx-auto text-4xl text-teal-500" />
          <h3 className="text-3xl font-bold">18,000+ kg</h3>
          <p className="text-sm">CO₂ Saved</p>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;