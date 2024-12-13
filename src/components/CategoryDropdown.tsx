import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Gamepad2, Trophy, Rocket, Cpu, Wrench, Zap } from 'lucide-react';

const categories = [
  {
    icon: <Gamepad2 className="w-5 h-5 text-blue-400" />,
    title: 'Gaming PCs',
    description: 'Top-rated gaming computers',
    link: '/category/gaming-pcs'
  },
  {
    icon: <Trophy className="w-5 h-5 text-pink-400" />,
    title: 'Gaming Gear',
    description: 'Essential gaming peripherals',
    link: '/category/gaming-gear'
  },
  {
    icon: <Rocket className="w-5 h-5 text-green-400" />,
    title: 'Gaming Community',
    description: 'Connect with fellow gamers',
    link: '/category/gaming-community'
  },
  {
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    title: 'Hardware Reviews',
    description: 'In-depth hardware analysis',
    link: '/category/hardware-reviews'
  },
  {
    icon: <Wrench className="w-5 h-5 text-yellow-400" />,
    title: 'PC Building',
    description: 'Build guides and tutorials',
    link: '/category/pc-building'
  },
  {
    icon: <Zap className="w-5 h-5 text-red-400" />,
    title: 'Performance',
    description: 'Optimization and benchmarks',
    link: '/category/performance'
  }
];

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center space-x-1.5 px-3 py-2 rounded-md text-xl font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
      >
        <span>Categories</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-3">
          <div className="grid gap-2">
            {categories.map((category, index) => (
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
