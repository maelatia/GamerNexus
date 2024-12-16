import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { TopGame } from '../services/topGamesService';
import { mediaService, MEDIA_SIZES } from '../services/mediaService';

interface TopGameCardProps {
  game: TopGame;
}

const TopGameCard: React.FC<TopGameCardProps> = ({ game }) => {
  return (
    <div className="bg-gray-1200 rounded-lg p-1 mb-6 shadow-lg hover:shadow-2xl transition-all border border-white/20">
      <div className="flex items-start gap-8 p-6">
        {/* Left side - Image */}
        <div className="w-[650px] h-[350px] flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={mediaService.processImageUrl(game.mainImage, MEDIA_SIZES.card)}
            alt={`${game.title} screenshot`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = mediaService.processImageUrl('', MEDIA_SIZES.card);
            }}
          />
        </div>

        {/* Right side - Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-3xl font-semibold text-white">{game.title}</h2>
            {game.isNew && (
              <span className="px-4 py-2 text-base font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full">
                New
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl text-white font-medium">{game.price}</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {game.tags.filter(tag => tag !== 'All').map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-base font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-end">
            <a
              href={game.storeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Visit Store
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopGameCard;
