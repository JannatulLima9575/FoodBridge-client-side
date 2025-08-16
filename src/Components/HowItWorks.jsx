import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      id: "1",
      title: "Restaurants Donate Surplus Food",
      desc: "Restaurants post extra meals they want to give away instead of wasting.",
    },
    {
      id: "2",
      title: "Charities Request & Schedule Pickup",
      desc: "Verified charities browse available donations and request a pickup time.",
    },
    {
      id: "3",
      title: "Admins Approve & Monitor Requests",
      desc: "Admins verify each donation and approve requests to ensure smooth coordination.",
    },
    {
      id: "4",
      title: "Charities Collect & Distribute",
      desc: "Charities pick up the food and distribute it to those in need in their communities.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-20 px-4 md:px-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto font-body">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#257429] dark:text-orange-400 font-heading mb-16 transition-colors duration-500">
          HOW IT WORKS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex items-start gap-5 transition-all duration-300"
            >
              <h1 className="text-7xl md:text-8xl font-extrabold text-green-400 opacity-30 dark:text-green-300 dark:opacity-25 font-heading leading-none">
                {step.id}
              </h1>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-orange-500 dark:text-orange-400 font-heading mb-2 transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-gray-800 dark:text-gray-300 text-sm md:text-base transition-colors duration-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
