import React from 'react';

const stories = [
  {
    id: 1,
    name: 'Mama’s Kitchen',
    story: 'Thanks to FoodBridge, we’ve donated surplus food regularly and built strong ties with our community.',
    image: '/assets/story1.jpg',
  },
  {
    id: 2,
    name: 'SaveSmile Foundation',
    story: 'With help from FoodBridge, we’re now able to serve 300+ people every week. Truly a blessing!',
    image: '/assets/story2.jpg',
  },
];

const CommunityStories = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-base-200 dark:bg-neutral">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
        💚 Community Stories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <div key={story.id} className="bg-white dark:bg-base-100 p-6 rounded-xl shadow-md flex gap-4">
            <img
              src={story.image}
              alt={story.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <h3 className="text-xl font-semibold">{story.name}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 italic">
                “{story.story}”
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityStories;