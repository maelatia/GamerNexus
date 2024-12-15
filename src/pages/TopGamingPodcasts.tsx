import React from 'react';
import { usePodcasts } from '../services/podcastService';
import PodcastCard from '../components/PodcastCard';
import { Loader2 } from 'lucide-react';

const TopGamingPodcasts: React.FC = () => {
  const { podcasts, loading, error } = usePodcasts('gaming');

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center text-red-500">
            <p>Error loading podcasts: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-8 lg:px-10">
        <h1 className="text-4xl font-bold text-white mb-8">Top Gaming Podcasts</h1>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((podcast, index) => (
              <PodcastCard key={`${podcast.link}-${index}`} item={podcast} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopGamingPodcasts;
