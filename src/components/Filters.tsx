import React from 'react';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';

interface FiltersProps {
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
  onFilterChange: (filter: string, value: boolean) => void;
}

export default function Filters({ onSearch, onSortChange, onFilterChange }: FiltersProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <div className="flex flex-col space-y-6">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Product Name"
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="flex items-center text-gray-400 text-sm mb-2">
            Sort By
            <HelpCircle className="w-4 h-4 ml-1" />
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-purple-500"
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="sponsored">Sponsored</option>
              <option value="rating">Rating</option>
              <option value="reviews">Number of Reviews</option>
              <option value="name">Name</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Pricing Options */}
        <div>
          <h3 className="text-white font-medium mb-3">Pricing Options</h3>
          <div className="space-y-2">
            {['Free', 'Free Trial', 'Monthly Subscription', 'Annual Subscription'].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-purple-500 rounded border-gray-700 bg-gray-900 focus:ring-0 focus:ring-offset-0"
                  onChange={(e) => onFilterChange(option, e.target.checked)}
                />
                <span className="text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-white font-medium mb-3">Features</h3>
          <div className="space-y-2">
            {[
              'Activity Dashboard',
              'Alerts/Notifications',
              'Contact Management',
              'Customizable Fields',
              'Data Import/Export',
              'Email Management'
            ].map((feature) => (
              <label key={feature} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-purple-500 rounded border-gray-700 bg-gray-900 focus:ring-0 focus:ring-offset-0"
                  onChange={(e) => onFilterChange(feature, e.target.checked)}
                />
                <span className="text-gray-300">{feature}</span>
              </label>
            ))}
          </div>
          <button className="text-purple-400 hover:text-purple-300 mt-3 text-sm font-medium">
            SHOW MORE
          </button>
        </div>
      </div>
    </div>
  );
}
