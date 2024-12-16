import React, { useState, useMemo } from 'react';
import { useTopGames } from '../services/topGamesService';
import TopGameCard from '../components/TopGameCard';
import LoadingSpinner from '../components/LoadingSpinner';

const TopGamesPage: React.FC = () => {
  const { games, loading, error } = useTopGames();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 10;

  // Get unique tags from all games
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    games.forEach(game => {
      game.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [games]);

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Filter games based on search and tags
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => game.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [games, searchQuery, selectedTags]);

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const currentGames = filteredGames.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 p-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold text-white mb-6 nav-title">Most Played Games Worldwide</h1>
          <p className="text-white text-lg mb-6">Discover the most popular games played by millions</p>
          
          {/* Search and Tags Container */}
          <div className="flex items-center justify-center gap-6 mb-4">
            {/* Search Bar */}
            <div className="w-[400px]">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 text-lg bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Tags */}
            <div className="flex items-center gap-4">
              {allTags.filter(tag => tag !== 'All').map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-6 py-3 text-lg font-bold rounded-full transition-all ${
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

        {/* Games Grid */}
        <div className="space-y-6">
          {currentGames.map((game) => (
            <TopGameCard key={game.id} game={game} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopGamesPage;
