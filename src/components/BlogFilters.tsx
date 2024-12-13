import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface BlogFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: string[]) => void;
  onSortChange: (sort: string) => void;
}

export default function BlogFilters({
  onSearch,
  onFilterChange,
  onSortChange,
}: BlogFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('latest');

  const categories = [
    { name: 'Featured', value: 'featured' },
    { name: 'Gaming News', value: 'gaming-news' },
    { name: 'Reviews', value: 'reviews' },
    { name: 'Guides', value: 'guides' },
    { name: 'Tech', value: 'tech' },
    { name: 'Esports', value: 'esports' },
  ];

  const sortOptions = [
    { name: 'Latest', value: 'latest' },
    { name: 'Most Popular', value: 'popular' },
    { name: 'Most Liked', value: 'likes' },
    { name: 'Most Commented', value: 'comments' },
  ];

  const toggleFilter = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSort = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span>Filters</span>
      </button>

      {/* Filters Panel */}
      {isOpen && (
        <div className="space-y-6 p-4 bg-gray-800 rounded-lg">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => toggleFilter(category.value)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedFilters.includes(category.value)
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSort(option.value)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedSort === option.value
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
            <span>Close Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
