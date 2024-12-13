import React from 'react';
import { Cpu } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "Building the Ultimate Gaming PC in 2024",
    excerpt: "A complete guide to selecting and assembling the best components for your gaming rig, with options for every budget...",
    author: {
      name: "Tom Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Gaming+PC+Build",
    date: "2024-12-12",
    readTime: "20 min read",
    likes: 2341,
    comments: 567,
    tags: ["PC Building", "Hardware", "Guide"],
    slug: "ultimate-gaming-pc-build-2024"
  },
  {
    title: "Optimizing Windows 11 for Gaming Performance",
    excerpt: "Essential tweaks and settings to maximize your gaming performance on Windows 11, from system settings to driver optimizations...",
    author: {
      name: "Rachel Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Windows+11+Gaming",
    date: "2024-12-11",
    readTime: "15 min read",
    likes: 1876,
    comments: 423,
    tags: ["Windows", "Optimization", "Performance"],
    slug: "windows-11-gaming-optimization"
  },
  // Add more tech guide posts as needed
];

export default function TechGuides() {
  return (
    <BlogLayout
      title="Tech Guides"
      description="Comprehensive technical guides covering everything from PC building to software optimization, helping you get the most out of your gaming hardware."
      icon={Cpu}
      color="from-cyan-500 to-blue-500"
      posts={posts}
    />
  );
}
