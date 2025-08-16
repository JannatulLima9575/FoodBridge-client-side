import React from 'react';

const stories = [
  {
    id: 1,
    name: 'Mama’s Kitchen',
    story: 'Thanks to FoodBridge, we’ve donated surplus food regularly and built strong ties with our community.',
    image: 'https://i.ibb.co/MyN755Kc/image.png',
  },
  {
    id: 2,
    name: 'SaveSmile Foundation',
    story: 'With help from FoodBridge, we’re now able to serve 300+ people every week. Truly a blessing!',
    image: 'https://i.ibb.co/HfHrTyJz/image.png',
  },
];

const CommunityStories = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-base-200 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#257429] dark:text-orange-400 mb-2 transition-colors duration-500">
            💚 Community Stories
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 fonts-inter transition-colors duration-500">
            Hear from the heroes making an impact through FoodBridge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 flex items-start gap-4"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#F9A825]"
              />
              <div>
                <h3 className="text-xl font-semibold text-[#257429] dark:text-orange-400 mb-1 transition-colors duration-500">
                  {story.name}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic transition-colors duration-500">
                  “{story.story}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;
