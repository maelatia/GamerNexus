import React, { useState } from 'react';
import { RSSItem } from '../services/rssService';
import { ExternalLink } from 'lucide-react';

interface FeedCardProps {
  item: RSSItem;
  imageOnly?: boolean;
}

const FeedCard: React.FC<FeedCardProps> = ({ item, imageOnly = false }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-gray-900/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all border border-gray-700 hover:border-purple-500/50 h-full w-full">
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {/* Image Container */}
        <div className="aspect-video relative bg-gray-800 overflow-hidden">
          {item.image && !imageError ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800/80">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow space-y-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white line-clamp-2 min-h-[3.5rem]">
              {item.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{new Date(item.pubDate).toLocaleDateString()}</span>
              {item.author && (
                <>
                  <span>•</span>
                  <span className="truncate max-w-[200px]">{item.author}</span>
                </>
              )}
            </div>
          </div>

          <p className="text-gray-300 text-base line-clamp-3 flex-grow">
            {item.description?.replace(/<[^>]*>?/gm, '')}
          </p>

          <div className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors pt-2">
            <span className="text-sm font-medium">Read more</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default FeedCard;
