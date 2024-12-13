import React from 'react';
import { Users } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "The Rise of Virtual Gaming Communities",
    excerpt: "How online gaming communities are reshaping social interactions and creating lasting friendships across borders...",
    author: {
      name: "Maya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Gaming+Communities",
    date: "2024-12-12",
    readTime: "10 min read",
    likes: 876,
    comments: 234,
    tags: ["Community", "Social Gaming", "Culture"],
    slug: "virtual-gaming-communities"
  },
  {
    title: "Gaming Conventions: A 2024 Guide",
    excerpt: "Your complete guide to this year's biggest gaming conventions, including dates, locations, and what to expect...",
    author: {
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Gaming+Conventions",
    date: "2024-12-11",
    readTime: "12 min read",
    likes: 654,
    comments: 178,
    tags: ["Conventions", "Events", "Community"],
    slug: "gaming-conventions-2024"
  },
  // Add more gaming culture posts as needed
];

export default function GamingCulture() {
  return (
    <BlogLayout
      title="Gaming Culture"
      description="Explore the vibrant world of gaming culture, from community stories and events to the latest trends and phenomena in the gaming world."
      icon={Users}
      color="from-pink-500 to-rose-500"
      posts={posts}
    />
  );
}
