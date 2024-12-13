import React from 'react';
import HeroContent from './HeroContent';

export default function Hero() {
  return (
    <div className="relative overflow-hidden mt-12">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-8">
        <div className="relative z-10 lg:max-w-xl lg:w-full min-h-[600px] flex flex-col justify-center">
          <main className="flex-grow flex flex-col">
            <HeroContent />
          </main>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-8 lg:w-[50%] flex items-center">
          <div className="relative w-full">
            <img
              src="/Best Review Gaming Thumbnail.png"
              alt="Gaming"
              className="relative w-full h-auto max-w-full object-contain"
              style={{
                maxHeight: 'calc(100vh - 200px)',
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}