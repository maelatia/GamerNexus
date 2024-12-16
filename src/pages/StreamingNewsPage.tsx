import React, { useState } from 'react';
import { useStreamingNews } from '../services/streamingNewsService';
import CardSkeleton from '../components/CardSkeleton';

const StreamingNewsPage: React.FC = () => {
  const { news, loading, error } = useStreamingNews();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 text-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const currentNews = news.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl font-bold text-white mb-12 text-center nav-title">
          Best Live Streams
        </h1>

        {/* News Grid */}
        <div className="space-y-6">
          {currentNews.map((item) => (
            <div
              key={item.id}
              className="bg-gray-1200 rounded-lg p-1 mb-6 shadow-lg hover:shadow-2xl transition-all border border-white/20"
            >
              <div className="flex items-start gap-8 p-6">
                {/* Left side - Image/Video */}
                <div className="w-[650px] h-[350px] flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden">
                  {item.videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${item.videoId}`}
                      title={item.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/650x350/1a1a1a/purple?text=No+Image';
                      }}
                    />
                  )}
                </div>

                {/* Right side - Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-semibold text-white">{item.title}</h2>
                    <span className="text-sm text-gray-400">
                      {new Date(item.pubDate).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-300 text-lg mb-6 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-medium">{item.source}</span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Watch Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
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

export default StreamingNewsPage;
