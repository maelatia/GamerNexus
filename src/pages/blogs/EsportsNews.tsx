import React from 'react';
import { ESPORTS_CATEGORY_TAGS } from '../../services/rssService';
import BlogLayout from '../../components/BlogLayout';
import RSSFeedGrid from '../../components/RSSFeedGrid';
import { Trophy } from 'lucide-react';

export default function EsportsNews() {
  return (
    <BlogLayout>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-12 h-12 text-yellow-400 mr-4" />
              <h1 className="text-4xl font-bold">Esports News</h1>
            </div>
            <p className="text-xl text-gray-400">
              Stay updated with the latest news from the competitive gaming world
            </p>
          </div>
          <RSSFeedGrid feedType="esports" categoryTags={ESPORTS_CATEGORY_TAGS} />
        </div>
      </div>
    </BlogLayout>
  );
}
