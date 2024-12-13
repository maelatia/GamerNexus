import React from 'react';
import { Lightbulb } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "Master VALORANT's Advanced Movement Techniques",
    excerpt: "A comprehensive guide to mastering movement mechanics, including counter-strafing, jump-peeking, and more...",
    author: {
      name: "Ryan Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=VALORANT+Tips",
    date: "2024-12-12",
    readTime: "12 min read",
    likes: 1567,
    comments: 342,
    tags: ["VALORANT", "Tips", "Movement", "Guide"],
    slug: "valorant-movement-guide"
  },
  {
    title: "Optimizing Your Gaming Setup for Maximum Performance",
    excerpt: "Essential tips for creating the perfect gaming environment, from hardware selection to ergonomic considerations...",
    author: {
      name: "Chris Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Gaming+Setup",
    date: "2024-12-11",
    readTime: "8 min read",
    likes: 923,
    comments: 178,
    tags: ["Setup", "Hardware", "Ergonomics", "Guide"],
    slug: "gaming-setup-optimization"
  },
  // Add more gaming tips posts as needed
];

export default function GamingTips() {
  return (
    <BlogLayout
      title="Gaming Tips & Tricks"
      description="Level up your game with our collection of expert tips, strategies, and guides for both casual and competitive players across various games."
      icon={Lightbulb}
      color="from-green-500 to-emerald-400"
      posts={posts}
    />
  );
}
