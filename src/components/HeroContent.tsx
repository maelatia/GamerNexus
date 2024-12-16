import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroContent() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-center translate-y-8">
      <div className="flex-grow flex flex-col justify-center">
        <h1 className="text-9xl tracking-tight font-extrabold text-white sm:text-7xl md:text-9xl">
          <div className="flex items-center mb-6">
            <span className="text-10xl md:text-[8rem] font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent whitespace-nowrap">
              Gamer Nexus
            </span>
          </div>
          <span className="block text-4xl md:text-[4rem] whitespace-nowrap mb-8">Level Up Your Gaming</span>
          <span className="block text-4xl md:text-[4rem] whitespace-nowrap text-purple-500">And Streaming World</span>
        </h1>
        <p className="mt-6 text-lg text-gray-300 sm:mt-6 sm:text-xl sm:max-w-xl md:mt-6 md:text-2xl">
          Your Ultimate Hub for Gaming Insights & Resources. Discover the best gaming gear, connect with fellow gamers, and stay updated with the latest trends.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 mt-8">
        <button
          onClick={() => navigate('/signin')}
          className="flex items-center justify-center px-8 py-4 text-2xl font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/categories')}
          className="flex items-center justify-center px-8 py-4 text-2xl font-medium rounded-lg text-purple-500 bg-gray-800/50 hover:bg-gray-800 border border-purple-500/30 hover:border-purple-500 transition-all duration-200 backdrop-blur-sm"
        >
          Browse Categories
        </button>
      </div>
    </div>
  );
}