import React from 'react';
import { LineChart } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "The Future of Cloud Gaming: Industry Analysis",
    excerpt: "An in-depth look at how cloud gaming is reshaping the industry, with insights from leading experts and market predictions...",
    author: {
      name: "David Cohen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Cloud+Gaming",
    date: "2024-12-12",
    readTime: "15 min read",
    likes: 1234,
    comments: 345,
    tags: ["Cloud Gaming", "Industry", "Analysis"],
    slug: "future-of-cloud-gaming"
  },
  {
    title: "Gaming Industry Market Report 2024",
    excerpt: "Comprehensive analysis of market trends, revenue streams, and growth opportunities in the gaming industry...",
    author: {
      name: "Jennifer Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Market+Report",
    date: "2024-12-11",
    readTime: "20 min read",
    likes: 987,
    comments: 256,
    tags: ["Market Analysis", "Industry", "Report"],
    slug: "gaming-industry-report-2024"
  },
  // Add more industry insights posts as needed
];

export default function IndustryInsights() {
  return (
    <BlogLayout
      title="Industry Insights"
      description="Expert analysis of gaming industry trends, market developments, and business strategies shaping the future of gaming."
      icon={LineChart}
      color="from-indigo-500 to-violet-500"
      posts={posts}
    />
  );
}
