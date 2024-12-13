import React from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import GameFeatures from '../components/GameFeatures';

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoryGrid />
      <GameFeatures />
    </div>
  );
}
