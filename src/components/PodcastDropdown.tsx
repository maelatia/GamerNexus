import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const PodcastDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Podcasts
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <Link
              to="/podcasts/gaming"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              role="menuitem"
            >
              Gaming Podcasts
            </Link>
            <Link
              to="/podcasts/crypto"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              role="menuitem"
            >
              Crypto Podcasts
            </Link>
            <Link
              to="/podcasts/tech"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              role="menuitem"
            >
              Tech Podcasts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastDropdown;
