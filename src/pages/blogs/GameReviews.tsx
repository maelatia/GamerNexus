import React from 'react';
import { Star } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "Starfield Review: A Journey Through the Cosmos",
    excerpt: "Our comprehensive review of Bethesda's ambitious space RPG. Does it live up to the hype? Here's our verdict after 100+ hours...",
    author: {
      name: "Mike Reynolds",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Starfield+Review",
    date: "2024-12-10",
    readTime: "15 min read",
    likes: 892,
    comments: 234,
    tags: ["RPG", "Bethesda", "Space", "Review"],
    slug: "starfield-review"
  },
  {
    title: "Spider-Man 2 PS5 Review: The Ultimate Superhero Experience",
    excerpt: "Insomniac Games delivers another masterpiece with improved web-swinging, dual protagonists, and a compelling story...",
    author: {
      name: "Emily Wong",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Spider-Man+2",
    date: "2024-12-09",
    readTime: "12 min read",
    likes: 1567,
    comments: 421,
    tags: ["Action", "PlayStation", "Marvel", "Review"],
    slug: "spiderman-2-review"
  },
  // Add more game review posts as needed
];

export default function GameReviews() {
  return (
    <BlogLayout
      title="Game Reviews"
      description="In-depth reviews of the latest and greatest games, providing honest opinions, detailed analysis, and comprehensive scoring across multiple categories."
      icon={Star}
      color="from-yellow-500 to-orange-500"
      posts={posts}
    />
  );
}
