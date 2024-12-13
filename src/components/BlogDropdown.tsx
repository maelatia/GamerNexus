import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Newspaper, Gamepad2, Trophy, Rocket, Cpu, Wrench, Book, Zap } from 'lucide-react';

const blogCategories = [
  {
    icon: <Newspaper className="w-5 h-5 text-blue-400" />,
    title: 'Gaming News',
    description: 'Latest updates from the gaming world',
    link: '/blog/gaming-news'
  },
  {
    icon: <Gamepad2 className="w-5 h-5 text-green-400" />,
    title: 'Game Reviews',
    description: 'In-depth game analysis and ratings',
    link: '/blog/game-reviews'
  },
  {
    icon: <Trophy className="w-5 h-5 text-yellow-400" />,
    title: 'Esports',
    description: 'Professional gaming and tournaments',
    link: '/blog/esports'
  },
  {
    icon: <Rocket className="w-5 h-5 text-red-400" />,
    title: 'Gaming Tips & Tricks',
    description: 'Improve your gaming skills',
    link: '/blog/gaming-tips'
  },
  {
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    title: 'Tech Guides',
    description: 'Hardware and setup tutorials',
    link: '/blog/tech-guides'
  },
  {
    icon: <Wrench className="w-5 h-5 text-orange-400" />,
    title: 'Modding & Customization',
    description: 'Game modifications and personalization',
    link: '/blog/modding'
  },
  {
    icon: <Book className="w-5 h-5 text-pink-400" />,
    title: 'Gaming Culture',
    description: 'Stories from the gaming community',
    link: '/blog/gaming-culture'
  },
  {
    icon: <Zap className="w-5 h-5 text-indigo-400" />,
    title: 'Industry Insights',
    description: 'Analysis and market trends',
    link: '/blog/industry-insights'
  }
];

export default function BlogDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center space-x-1.5 px-3 py-2 rounded-md text-xl font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
      >
        <span>Blogs</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-3">
          <div className="grid gap-2">
            {blogCategories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="flex items-start space-x-4 px-4 py-3 hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="p-2 rounded-lg bg-gray-800/50">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium">{category.title}</h3>
                  <p className="text-sm text-gray-400">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
