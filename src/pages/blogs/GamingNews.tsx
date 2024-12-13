import React from 'react';
import { Newspaper } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "GTA 6 Trailer Breaks YouTube Records",
    excerpt: "The highly anticipated GTA 6 trailer has shattered all previous viewing records on YouTube within 24 hours of release.",
    author: {
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=GTA+6+Trailer",
    date: "Dec 11, 2023",
    readTime: "5 min read",
    likes: 1243,
    comments: 328,
    tags: ["News"],
    slug: "gta-6-trailer-breaks-records"
  },
  {
    title: "Spider-Man 2 Review: A Web-Slinging Masterpiece",
    excerpt: "Our community reviews the latest Spider-Man game. Find out why players are calling it the best superhero game ever made.",
    author: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Spider-Man+2",
    date: "Dec 10, 2023",
    readTime: "8 min read",
    likes: 956,
    comments: 234,
    tags: ["Review"],
    slug: "spiderman-2-review"
  },
  {
    title: "Ultimate Guide to Building Your First Gaming PC",
    excerpt: "Step-by-step guide to assembling your dream gaming rig, from choosing parts to final setup.",
    author: {
      name: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Gaming+PC+Guide",
    date: "Dec 9, 2023",
    readTime: "12 min read",
    likes: 789,
    comments: 156,
    tags: ["Guide"],
    slug: "ultimate-gaming-pc-guide"
  }
];

export default function GamingNews() {
  return (
    <BlogLayout
      title="Gaming News"
      description="Stay up to date with the latest breaking news from the gaming industry"
      icon={Newspaper}
      color="from-blue-600 to-blue-400"
      posts={posts}
    />
  );
}
