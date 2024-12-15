import React, { useState } from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import { PodcastItem } from '../services/podcastService';

interface PodcastCardProps {
  item: PodcastItem;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ item }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const displayImage = imageError ? '/podcast-placeholder.jpg' : item.image;

  return (
    <div className="bg-gray-900/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all border border-gray-700 hover:border-purple-500/50 group">
      <a 
        href={item.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block h-full"
      >
        {/* Image Container */}
        <div className="aspect-[16/9] relative bg-gray-800 overflow-hidden">
          <img
            src={displayImage}
            alt={item.title}
            style={item.source === 'spotify' ? { transform: 'scale(1.0)' } : undefined}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={handleImageError}
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <div className="space-y-3">
            {item.show && (
              <div className="text-sm text-purple-400 font-medium">
                {item.show}
              </div>
            )}
            <h3 className="text-xl font-semibold text-white line-clamp-2 group-hover:text-purple-400 transition-colors">
              {item.title}
            </h3>
            
            <div className="flex items-center gap-3 text-sm text-gray-400">
              {item.duration && (
                <>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="text-gray-300 text-sm line-clamp-3">
            {item.description}
          </p>

          <div className="flex items-center gap-2 text-purple-400 text-sm mt-auto">
            <span>Listen now</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default PodcastCard;
