import React, { useState } from 'react';
import { LucideIcon, Star, Gamepad2, Trophy } from 'lucide-react';
import BlogCard from './BlogCard';
import BlogFilters from './BlogFilters';

interface Post {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  tags: string[];
  slug: string;
  featured?: boolean;
}

interface BlogLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  posts: Post[];
}

export default function BlogLayout({
  title,
  description,
  icon: Icon,
  color,
  posts: initialPosts
}: BlogLayoutProps) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-gray-900 pt-8 pb-16">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-8xl font-bold text-white mb-6">{title}</h1>
          <p className="text-gray-400 text-2xl">{description}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-8 py-4 rounded-lg flex items-center gap-3 text-3xl font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-8 py-4 rounded-lg flex items-center gap-3 text-3xl font-medium transition-colors ${
              activeTab === 'featured'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Star className="w-8 h-8" />
            Featured
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-8 py-4 rounded-lg flex items-center gap-3 text-3xl font-medium transition-colors ${
              activeTab === 'new'
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Gamepad2 className="w-8 h-8" />
            New Releases
          </button>
          <button
            onClick={() => setActiveTab('top')}
            className={`px-8 py-4 rounded-lg flex items-center gap-3 text-3xl font-medium transition-colors ${
              activeTab === 'top'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Trophy className="w-8 h-8" />
            Top Reviewed
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialPosts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
