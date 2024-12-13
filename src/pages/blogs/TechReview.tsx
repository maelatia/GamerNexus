import React from 'react';
import { Cpu } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "NVIDIA RTX 4090 Ti: The New Gaming King?",
    excerpt: "An in-depth review of NVIDIA's latest flagship GPU. Is it worth the premium price tag?",
    author: {
      name: "David Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=RTX+4090+Ti",
    date: "Dec 11, 2023",
    readTime: "12 min read",
    likes: 1876,
    comments: 534,
    tags: ["Review"],
    slug: "rtx-4090-ti-review"
  },
  {
    title: "Best Gaming Monitors of 2024",
    excerpt: "Our comprehensive guide to the top gaming monitors for every budget and use case.",
    author: {
      name: "Rachel Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Gaming+Monitors",
    date: "Dec 10, 2023",
    readTime: "15 min read",
    likes: 1234,
    comments: 345,
    tags: ["Guide"],
    slug: "best-gaming-monitors-2024"
  },
  {
    title: "AMD vs Intel: The 2024 CPU Showdown",
    excerpt: "Comparing the latest processors from AMD and Intel. Which brand offers the best value for gamers?",
    author: {
      name: "Tom Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=CPU+Showdown",
    date: "Dec 9, 2023",
    readTime: "10 min read",
    likes: 2145,
    comments: 678,
    tags: ["Comparison"],
    slug: "amd-vs-intel-2024"
  }
];

export default function TechReview() {
  return (
    <BlogLayout
      title="Tech Review"
      description="Expert reviews and analysis of the latest gaming hardware"
      icon={Cpu}
      color="from-purple-600 to-purple-400"
      posts={posts}
    />
  );
}
