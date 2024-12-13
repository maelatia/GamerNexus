import React from 'react';
import { Newspaper, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameFeatures() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 py-16">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Stay on the Game</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link 
            to="/blogs#news" 
            className="block transition-transform hover:scale-105"
            onClick={handleClick}
          >
            <div className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm h-full">
              <div className="flex items-center justify-center w-12 h-12 mb-4">
                <Newspaper className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Latest Gaming News</h3>
              <p className="text-gray-300">Stay updated with the latest news from the gaming world</p>
            </div>
          </Link>

          <Link 
            to="/blogs#review" 
            className="block transition-transform hover:scale-105"
            onClick={handleClick}
          >
            <div className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm h-full">
              <div className="flex items-center justify-center w-12 h-12 mb-4">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community Reviews</h3>
              <p className="text-gray-300">Read and write reviews from fellow gamers</p>
            </div>
          </Link>

          <Link 
            to="/blogs#guide" 
            className="block transition-transform hover:scale-105"
            onClick={handleClick}
          >
            <div className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm h-full">
              <div className="flex items-center justify-center w-12 h-12 mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Gaming Guides</h3>
              <p className="text-gray-300">Improve your skills with our detailed guides</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
