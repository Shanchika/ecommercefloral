import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="bg-gray-50 py-12">
      {/* About Title Section */}
      <div className="text-3xl font-semibold text-center pt-8 border-t mb-10">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Content Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16 px-6 md:px-12">
        <img
          className="w-full md:max-w-[450px] rounded-xl shadow-lg"
          src={assets.about_img}
          alt="About our company"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700">
          <p className="leading-relaxed text-lg">
            A floral shop offers a variety of fresh flowers, custom bouquets, and event decorations for special occasions.
          </p>
          <p className="leading-relaxed text-lg">
            It provides personalized services like flower subscriptions, gift wrapping, and message cards. With an online ordering system, customers can easily browse, purchase, and schedule deliveries.
          </p>
          <b className="text-2xl text-gray-800">Our Mission</b>
          <p className="leading-relaxed text-lg">
            Our mission is to spread happiness with fresh, handpicked floral arrangements for every occasion. We strive to provide personalized services, from custom bouquets to event decorations. With a seamless shopping experience, we make gifting and flower delivery effortless and meaningful.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl text-center py-4 font-semibold text-gray-800">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 text-sm mb-20 px-6 md:px-12">
        <div className="border px-6 md:px-10 py-6 sm:py-12 flex flex-col gap-5 bg-white rounded-lg shadow-md transition-transform hover:scale-105 duration-300">
          <b className="text-xl text-gray-800">Quality Assurance:</b>
          <p className="text-gray-600">
            We guarantee fresh, high-quality flowers with meticulous craftsmanship and strict quality control. Every arrangement is designed to be vibrant, long-lasting, and beautifully presented.
          </p>
        </div>
        <div className="border px-6 md:px-10 py-6 sm:py-12 flex flex-col gap-5 bg-white rounded-lg shadow-md transition-transform hover:scale-105 duration-300">
          <b className="text-xl text-gray-800">Convenience:</b>
          <p className="text-gray-600">
            We offer a seamless shopping experience with easy online ordering, flexible delivery options, and personalized services. Enjoy hassle-free flower gifting with just a few clicks!
          </p>
        </div>
        <div className="border px-6 md:px-10 py-6 sm:py-12 flex flex-col gap-5 bg-white rounded-lg shadow-md transition-transform hover:scale-105 duration-300">
          <b className="text-xl text-gray-800">Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you every step of the way, ensuring a seamless experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
