import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  rating?: number;
  reviews?: number;
  features: string[];
  sponsored?: boolean;
  image?: string;
  website?: string;
}

export default function ProductCard({
  title,
  description,
  rating = 0,
  reviews = 0,
  features,
  sponsored = false,
  image,
  website
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (image) {
      // Reset states when image prop changes
      setLoading(true);
      setImageError(false);
      
      // Add cache-busting parameter to the URL
      const cacheBuster = `&t=${new Date().getTime()}`;
      const imageUrl = image.includes('?') ? `${image}${cacheBuster}` : `${image}?${cacheBuster}`;
      setImageSrc(imageUrl);
    }
  }, [image]);

  const handleImageLoad = () => {
    setLoading(false);
    setImageError(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image for ${title}:`, {
      imagePath: image,
      error: e.nativeEvent instanceof ErrorEvent ? e.nativeEvent.message : 'Unknown error'
    });
    setImageError(true);
    setLoading(false);
  };

  return (
    <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-[550px] h-[350px] flex-shrink-0 overflow-hidden rounded-xl shadow-lg relative bg-gray-800 flex items-center justify-center">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}
          {sponsored && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-4 py-2 text-lg font-medium bg-purple-500 text-white rounded-lg shadow-lg">
                Sponsored
              </span>
            </div>
          )}
          {imageSrc && !imageError ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transform scale-[1] transition-transform duration-300 hover:scale-[1.2]"
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full text-gray-500">
              <span className="text-lg">Image not available</span>
            </div>
          )}
        </div>
        <div className="flex-2 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-5xl font-bold text-white tracking-tight">{title}</h3>
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  Visit Website
                </a>
              )}
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">{description}</p>
            
            <div className="flex items-center gap-3 mt-2">
              {rating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xl font-medium text-white">{rating.toFixed(1)}</span>
                  {reviews > 0 && (
                    <span className="text-lg text-gray-400">({reviews.toLocaleString()})</span>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gray-800 rounded-lg text-lg text-gray-300"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}