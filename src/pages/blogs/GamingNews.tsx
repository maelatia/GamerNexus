import React from 'react';
import { GAMING_CATEGORY_TAGS } from '../../services/rssService';
import BlogLayout from '../../components/BlogLayout';
import RSSFeedGrid from '../../components/RSSFeedGrid';

export default function GamingNews() {
  return (
    <BlogLayout>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Gaming News</h1>
            <p className="text-xl text-gray-400">
              Stay updated with the latest news from the gaming world
            </p>
          </div>
          <RSSFeedGrid feedType="gaming" categoryTags={GAMING_CATEGORY_TAGS} />
        </div>
      </div>
    </BlogLayout>
  );
}
