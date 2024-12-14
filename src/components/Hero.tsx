import React from 'react';
import HeroContent from './HeroContent';

export default function Hero() {
  return (
    <div className="relative overflow-hidden mt-12">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="relative z-10 lg:max-w-xl lg:w-full min-h-[600px] flex flex-col justify-center">
          <main className="flex-grow flex flex-col">
            <HeroContent />
          </main>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-32 lg:w-[40%] flex items-center justify-center">
          <div className="relative w-full">
            <img
              src="logos/Best Review Gaming Thumbnail.png"
              alt="Gaming"
              className="relative w-full h-auto max-w-full object-contain rounded-lg"
              style={{
                maxHeight: 'calc(100vh - 250px)',
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