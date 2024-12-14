import React from 'react';
import { Link } from 'react-router-dom';

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

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/blog/post/${post.slug}`} className="block">
      <div className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-[1.1] transition-all duration-300 flex flex-col h-[500px]">
        <div className="relative h-64">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6">
            <span className={`px-6 py-2 rounded-full text-lg font-medium ${
              post.tags[0].toLowerCase() === 'news'
                ? 'bg-blue-500'
                : post.tags[0].toLowerCase() === 'review'
                ? 'bg-green-500'
                : post.tags[0].toLowerCase() === 'guide'
                ? 'bg-purple-500'
                : 'bg-gray-500'
            } text-white uppercase`}>
              {post.tags[0]}
            </span>
          </div>
        </div>
        <div className="p-8 flex flex-col flex-1">
          <h3 className="text-2xl font-semibold text-white mb-4 line-clamp-2 hover:text-purple-400">
            {post.title}
          </h3>
          <p className="text-xl text-gray-400 mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-lg text-gray-500 mt-auto">
            <div className="flex items-center gap-3">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} read</span>
            </div>
            <span>{post.author.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
