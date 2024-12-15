import React, { useState, useEffect, useMemo } from 'react';
import { RSSItem, fetchFeedsByType } from '../services/rssService';
import FeedCard from './FeedCard';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface RSSFeedGridProps {
  feedType: string;
  categoryTags: Record<string, string>;
}

const RSSFeedGrid: React.FC<RSSFeedGridProps> = ({ feedType, categoryTags }) => {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const loadFeeds = async () => {
      setLoading(true);
      try {
        const feeds = await fetchFeedsByType(feedType);
        setItems(feeds);
      } catch (error) {
        console.error('Error loading feeds:', error);
      }
      setLoading(false);
    };

    loadFeeds();
  }, [feedType]);

  const handleCategoryClick = (category: string) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.filter(cat => cat !== 'all');
        if (prev.includes(category)) {
          return newCategories.filter(cat => cat !== category);
        } else {
          return [...newCategories, category];
        }
      });
    }
    setCurrentPage(1);
  };

  const filteredItems = useMemo(() => {
    return items
      .filter(item => {
        if (selectedCategories.length === 0 || selectedCategories.includes('all')) return true;
        
        return selectedCategories.some(cat => {
          const itemCategories = item.categories?.map(c => c.toLowerCase()) || [];
          const itemTitle = item.title?.toLowerCase() || '';
          const itemDescription = item.description?.toLowerCase() || '';
          const source = item.source?.toLowerCase() || '';
          
          switch(cat) {
            case 'altcoin':
              return itemCategories.some(c => c.includes('altcoin') || c.includes('cryptocurrency')) ||
                     itemTitle.includes('altcoin') || itemDescription.includes('altcoin');
            case 'memecoin':
              return itemCategories.some(c => c.includes('meme') || c.includes('doge') || c.includes('shiba')) ||
                     itemTitle.includes('doge') || itemTitle.includes('shiba') || itemTitle.includes('memecoins') || 
                     itemDescription.includes('memecoin');
            case 'market':
              return itemCategories.some(c => c.includes('crypto market') || c.includes('crypto analysis') || c.includes('crypto trading')) ||
                     itemTitle.includes('crypto market') || itemTitle.includes('crypto analysis') || 
                     itemDescription.includes('crypto market') || itemDescription.includes('crypto analysis');
            case 'review':
              return itemCategories.some(c => c.includes('review')) ||
                     itemTitle.includes('review') || 
                     source.includes('review');
            case 'gadget':
              return itemCategories.some(c => c.includes('gadget') || c.includes('device')) ||
                     itemTitle.includes('gadget') || 
                     itemDescription.includes('gadget');
            default:
              return itemCategories.some(c => c.includes(cat)) || 
                     itemTitle.includes(cat) || 
                     source.includes(cat);
          }
        });
      })
      .filter(item => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.author?.toLowerCase().includes(query) ||
          item.categories?.some(cat => cat.toLowerCase().includes(query))
        );
      });
  }, [items, selectedCategories, searchQuery]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search feeds..."
            className="pl-10 pr-4 py-2 w-full sm:w-64 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoryTags).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${selectedCategories.includes(key)
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Section */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-800 rounded-xl h-[300px]"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedItems.map((item, index) => (
              <FeedCard 
                key={`${item.link}-${index}`} 
                item={item} 
                isAll={selectedCategories.includes('all')}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RSSFeedGrid;
