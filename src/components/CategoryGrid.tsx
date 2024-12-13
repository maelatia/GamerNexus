import React from 'react';
import { Monitor, Heart, Users2, Mail, Key, Video, Code, Gamepad, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCard {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  link: string;
}

const categories: CategoryCard[] = [
  {
    icon: <Monitor className="w-8 h-8 text-blue-400" />,
    title: 'Gaming PCs',
    description: 'Custom builds & pre-built systems',
    color: 'bg-blue-400/10',
    link: '/category/gaming-pcs'
  },
  {
    icon: <Heart className="w-8 h-8 text-pink-400" />,
    title: 'Dating Apps',
    description: 'Connect with fellow gamers',
    color: 'bg-pink-400/10',
    link: '/category/dating'
  },
  {
    icon: <Users2 className="w-8 h-8 text-green-400" />,
    title: 'Meet Friends',
    description: 'Find your gaming squad',
    color: 'bg-green-400/10',
    link: '/category/meet-friends'
  },
  {
    icon: <Mail className="w-8 h-8 text-purple-400" />,
    title: 'Gaming Essentials',
    description: 'Must-have gaming gear',
    color: 'bg-purple-400/10',
    link: '/category/essentials'
  },
  {
    icon: <Key className="w-8 h-8 text-yellow-400" />,
    title: 'Gaming Accessories',
    description: 'Enhance your setup',
    color: 'bg-yellow-400/10',
    link: '/category/accessories'
  },
  {
    icon: <Video className="w-8 h-8 text-red-400" />,
    title: 'Streaming Gear',
    description: 'Start your streaming journey',
    color: 'bg-red-400/10',
    link: '/category/streaming'
  },
  {
    icon: <Coins className="w-8 h-8 text-orange-400" />,
    title: 'Crypto & NFT',
    description: 'Digital assets & blockchain gaming',
    color: 'bg-orange-400/10',
    link: '/category/crypto-nft'
  },
  {
    icon: <Code className="w-8 h-8 text-indigo-400" />,
    title: 'Game Development',
    description: 'Tools and resources',
    color: 'bg-indigo-400/10',
    link: '/category/game-dev'
  }
];

export default function CategoryGrid() {
  return (
    <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Explore Categories</h2>
        <p className="text-gray-400">Discover all our gaming categories and find what interests you</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            className={`group block p-6 rounded-xl ${category.color} transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg">
                {category.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90">
                  {category.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}