import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CategoryDropdown from './CategoryDropdown';
import BlogDropdown from './BlogDropdown';
import PodcastDropdown from './PodcastDropdown';

export default function NavLinks() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) => `
    px-3 py-2 rounded-md text-xl font-medium 
    transition-colors duration-200
    ${isActive(path) 
      ? 'bg-gray-800 text-white' 
      : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
  `;

  return (
    <div className="hidden md:block ml-12">
      <div className="flex items-center space-x-8">
        <Link to="/" className={linkClass('/')}>
          Home
        </Link>
        <CategoryDropdown />
        <BlogDropdown />
        <PodcastDropdown />
        <Link to="/about" className={linkClass('/about')}>
          About
        </Link>
      </div>
    </div>
  );
}