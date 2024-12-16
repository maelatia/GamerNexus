import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { DatingApp } from '../services/datingAppsService';

interface DatingAppCardProps {
  app: DatingApp;
}

const DatingAppCard: React.FC<DatingAppCardProps> = ({ app }) => {
  return (
    <div className="bg-gray-1100 rounded-lg p-1 mb-6 shadow-lg hover:shadow-2xl transition-all border border-white/20">
      <div className="flex items-start gap-8 p-6">
        {/* Left side - Image */}
        <div className="w-[650px] h-[350px] flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={app.mainImage}
            alt={`${app.title} screenshot`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/650x350/1a1a1a/purple?text=${encodeURIComponent(app.title)}`;
            }}
            loading="lazy"
          />
        </div>

        {/* Right side - Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-3xl font-semibold text-white">{app.title}</h2>
            {app.featured && (
              <span className="px-4 py-2 text-base font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-2xl ${
                    star <= Math.floor(Number(app.rating))
                      ? 'text-yellow-400'
                      : 'text-gray-600'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xl text-white font-medium ml-2">{app.rating}</span>
          </div>

          <p className="text-gray-300 text-lg mb-6 line-clamp-3">{app.description}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {app.tags.map((tag) => (
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
              href={app.storeLink}
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

export default DatingAppCard;
