import React from 'react';
import { Gamepad2 } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "Final Fantasy VII Rebirth Launch Details Revealed",
    excerpt: "Square Enix announces release date and special editions for the highly anticipated continuation of Final Fantasy VII Remake.",
    author: {
      name: "Emily Wong",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=FF7+Rebirth",
    date: "Dec 11, 2023",
    readTime: "6 min read",
    likes: 1567,
    comments: 423,
    tags: ["News"],
    slug: "ff7-rebirth-launch-details"
  },
  {
    title: "Dragon's Dogma 2 Gameplay Preview",
    excerpt: "A deep dive into the upcoming action RPG from Capcom, featuring enhanced combat and a vast open world.",
    author: {
      name: "Marcus Black",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Dragons+Dogma+2",
    date: "Dec 10, 2023",
    readTime: "10 min read",
    likes: 892,
    comments: 245,
    tags: ["Preview"],
    slug: "dragons-dogma-2-preview"
  },
  {
    title: "Most Anticipated Games of 2024",
    excerpt: "Our comprehensive guide to the biggest and most exciting game releases coming in 2024.",
    author: {
      name: "Lisa Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=2024+Games",
    date: "Dec 9, 2023",
    readTime: "15 min read",
    likes: 2134,
    comments: 567,
    tags: ["Guide"],
    slug: "most-anticipated-games-2024"
  }
];

export default function GameReleases() {
  return (
    <BlogLayout
      title="Game Releases"
      description="Track upcoming game releases and get the latest details on launch dates"
      icon={Gamepad2}
      color="from-green-600 to-green-400"
      posts={posts}
    />
  );
}
