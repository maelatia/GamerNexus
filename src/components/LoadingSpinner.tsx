import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        <div className="w-16 h-16 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0" style={{ animationDelay: '-0.3s' }}></div>
        <div className="w-16 h-16 border-t-4 border-b-4 border-pink-500 rounded-full animate-spin absolute top-0 left-0" style={{ animationDelay: '-0.6s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
