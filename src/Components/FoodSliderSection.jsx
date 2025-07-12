import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const FoodSliderSection = () => {
  const foods = [
    {
      id: 1,
      image: "https://i.ibb.co/QvTRrL11/image.png",
      name: "Sandwich",
    },
    {
      id: 2,
      image: "https://i.ibb.co/4ZRsdMMP/image.png",
      name: "Meat with Tomato",
    },
    {
      id: 3,
      image: "https://i.ibb.co/hFJq6fj3/image.png",
      name: "Fruits",
    },
    {
      id: 4,
      image: "https://i.ibb.co/QvTRrL11/image.png",
      name: "Nuts",
    },
    {
      id: 5,
      image: "https://i.ibb.co/hFJq6fj3/image.png",
      name: "Sandwich",
    },
    {
      id: 6,
      image: "https://i.ibb.co/4ZRsdMMP/image.png",
      name: "Meat with Tomato",
    },
    {
      id: 7,
      image: "https://i.ibb.co/gLpF98zV/image.png",
      name: "Cakes",
    },
    {
      id: 8,
      image: "https://i.ibb.co/tp0rWBKV/image.png",
      name: "Fruits",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-[#FFFBE6]">
<div className="max-w-7xl mx-auto text-center mb-10">
  <p className="uppercase text-sm font-semibold text-[#81C784] tracking-wider">
    Fighting Food Waste, One Donation at a Time
  </p>
  <h2 className="text-2xl md:text-3xl font-bold mt-2 text-[#1e1e1e] leading-relaxed">
    Explore the Types of Food Being Rescued <br /> 
    and Delivered to Those Who Need It Most
  </h2>
</div>


      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={30}
        freeMode={true}
        loop={true}
        speed={20000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="max-w-7xl mx-auto"
      >
        {foods.map((food) => (
          <SwiperSlide key={food.id}>
            <div className="flex flex-col items-center gap-2">
              <img
                src={food.image}
                alt={food.name}
                className="h-40 w-40 object-cover rounded-full shadow-lg hover:scale-105 transition duration-300"
              />
              <p className="text-[#257429] font-medium">{food.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FoodSliderSection;