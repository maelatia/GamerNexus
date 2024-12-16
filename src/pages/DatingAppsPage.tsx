import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import DatingAppCard from '../components/DatingAppCard';
import { useDatingApps, type DatingApp } from '../services/datingAppsService';

const DatingAppsPage: React.FC = () => {
  const { apps: allApps, loading } = useDatingApps();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>(['All']);

  // Remove duplicates and get unique apps by ID
  const datingApps = useMemo(() => {
    const uniqueApps = new Map();
    allApps.forEach(app => {
      if (!uniqueApps.has(app.id)) {
        uniqueApps.set(app.id, app);
      }
    });
    return Array.from(uniqueApps.values());
  }, [allApps]);

  // Get all unique tags from all apps
  const allTags = useMemo(() => {
    const tags = Array.from(new Set(datingApps.flatMap(app => app.tags)));
    return tags.sort();
  }, [datingApps]);

  const filteredApps = useMemo(() => {
    return datingApps.filter((app) => {
      const matchesSearch = 
        searchQuery === '' || 
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = 
        selectedTags.includes('All') || 
        selectedTags.every(tag => app.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [datingApps, searchQuery, selectedTags]);

  // Pagination
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApps = filteredApps.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleTagClick = (tag: string) => {
    if (tag === 'All') {
      setSelectedTags(['All']);
    } else {
      const newTags = selectedTags.filter(t => t !== 'All');
      if (selectedTags.includes(tag)) {
        setSelectedTags(newTags.filter(t => t !== tag));
        if (newTags.length === 0) {
          setSelectedTags(['All']);
        }
      } else {
        setSelectedTags([...newTags, tag]);
      }
    }
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 3;
    
    // Always show first page
    buttons.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 1
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        1
      </button>
    );

    if (totalPages > maxVisiblePages) {
      // Add ellipsis if there are pages between first page and current range
      if (currentPage > maxVisiblePages) {
        buttons.push(
          <span key="ellipsis1" className="px-3 py-2 text-gray-400">
            ...
          </span>
        );
      }

      // Show current page and surrounding pages
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
        if (i <= currentPage + 1) {
          buttons.push(
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {i}
            </button>
          );
        }
      }

      // Add ellipsis if there are more pages after current range
      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="ellipsis2" className="px-3 py-2 text-gray-400">
            ...
          </span>
        );
      }

      // Always show last page
      if (totalPages > 1) {
        buttons.push(
          <button
            key={totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {totalPages}
          </button>
        );
      }
    } else {
      // If we have few pages, show all of them
      for (let i = 2; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {i}
          </button>
        );
      }
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 p-12">
          <div className="animate-pulse space-y-8">
            {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
              <div key={index} className="bg-gray-800 h-[400px] rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-6 nav-title">Dating & Meet Friends Apps</h1>
          <p className="text-white text-lg mb-8">Find your player two or make new gaming friends</p>

          {/* Filters Section */}
          <div className="flex flex-col items-center gap-6 mb-8">
            {/* Search Bar and Tags Container */}
            <div className="w-full max-w-10xl">
              {/* Search and Tags Combined */}
              <div className="flex items-center justify-center gap-4">
                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-[400px] px-6 py-2 text-base bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:border-purple-500"
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  <button
                    key="All"
                    onClick={() => handleTagClick('All')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTags.includes('All')
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    All
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dating Apps Grid */}
        <div className="space-y-6">
          {paginatedApps.map((app) => (
            <DatingAppCard key={app.id} app={app} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700"
            >
              Previous
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatingAppsPage;
