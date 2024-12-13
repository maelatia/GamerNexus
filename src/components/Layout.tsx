import React from 'react';
import Navbar from './Navbar';
import Newsletter from './Newsletter';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Newsletter />
    </div>
  );
}
