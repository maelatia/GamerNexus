import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-1200 rounded-lg p-1 mb-6 shadow-lg border border-white/20 animate-pulse">
      <div className="flex items-start gap-8 p-6">
        {/* Left side - Image Skeleton */}
        <div className="w-[650px] h-[350px] flex-shrink-0 bg-gray-800 rounded-lg" />

        {/* Right side - Content Skeleton */}
        <div className="flex-1">
          {/* Title Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 bg-gray-800 rounded-lg w-3/4" />
            <div className="h-8 bg-gray-800 rounded-full w-24" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-800 rounded w-5/6" />
            <div className="h-4 bg-gray-800 rounded w-4/6" />
          </div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-gray-800 rounded-full w-24" />
            ))}
          </div>

          {/* Button Skeleton */}
          <div className="flex justify-end">
            <div className="h-12 bg-gray-800 rounded-lg w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
