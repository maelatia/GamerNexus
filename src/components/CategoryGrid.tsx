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
    <section className="py-16">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Explore Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={category.link}
              className="block group"
            >
              <div className={`${category.color} p-8 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg border border-gray-800/50 group-hover:border-gray-700/50`}>
                <div className="flex items-start gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{category.title}</h3>
                    <p className="text-gray-300">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}