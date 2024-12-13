import React from 'react';
import { Trophy } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "VALORANT Champions 2024: Complete Tournament Preview",
    excerpt: "Breaking down the teams, players, and storylines to watch in this year's biggest VALORANT tournament...",
    author: {
      name: "Daniel Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=VALORANT+Champions",
    date: "2024-12-12",
    readTime: "8 min read",
    likes: 734,
    comments: 156,
    tags: ["VALORANT", "Esports", "Tournament"],
    slug: "valorant-champions-2024-preview"
  },
  {
    title: "The Evolution of League of Legends Pro Meta",
    excerpt: "How the professional meta has shifted throughout 2024 and what it means for upcoming tournaments...",
    author: {
      name: "Lisa Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=LoL+Meta",
    date: "2024-12-11",
    readTime: "10 min read",
    likes: 892,
    comments: 245,
    tags: ["League of Legends", "Esports", "Meta Analysis"],
    slug: "lol-pro-meta-evolution"
  },
  // Add more esports posts as needed
];

export default function Esports() {
  return (
    <BlogLayout
      title="Esports"
      description="Your source for professional gaming coverage, including tournament results, team updates, player transfers, and expert analysis of competitive gaming events."
      icon={Trophy}
      color="from-purple-600 to-pink-500"
      posts={posts}
    />
  );
}
