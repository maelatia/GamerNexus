import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">About GamerNexus</h1>
      
      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p>
            GamerNexus is your ultimate destination for everything gaming-related. We're dedicated to providing gamers 
            with comprehensive resources, from high-end gaming PCs to streaming equipment, and fostering a vibrant 
            gaming community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Curated selection of gaming hardware and accessories</li>
            <li>Community features to connect with fellow gamers</li>
            <li>Expert reviews and recommendations</li>
            <li>Latest gaming news and trends</li>
            <li>Game development resources and tools</li>
            <li>Streaming setup guides and equipment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Join Our Community</h2>
          <p>
            Whether you're a casual gamer, competitive player, content creator, or game developer, 
            GamerNexus is your home for all things gaming. Join our community today and level up 
            your gaming experience!
          </p>
        </section>
      </div>
    </div>
  );
}
