import React from 'react';
import { Bitcoin } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "NFT Gaming Revolution: The Next Big Thing?",
    excerpt: "Exploring how NFTs are transforming the gaming industry and creating new opportunities for players.",
    author: {
      name: "Alex Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=NFT+Gaming",
    date: "Dec 11, 2023",
    readTime: "8 min read",
    likes: 1234,
    comments: 345,
    tags: ["NFT"],
    slug: "nft-gaming-revolution"
  },
  {
    title: "Top Play-to-Earn Games of 2024",
    excerpt: "A comprehensive guide to the most profitable and entertaining blockchain games available now.",
    author: {
      name: "Maria Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=P2E+Games",
    date: "Dec 10, 2023",
    readTime: "10 min read",
    likes: 987,
    comments: 234,
    tags: ["Guide"],
    slug: "top-p2e-games-2024"
  },
  {
    title: "Blockchain Gaming: Security Guide",
    excerpt: "Essential security tips and best practices for protecting your digital gaming assets.",
    author: {
      name: "Chris Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Security+Guide",
    date: "Dec 9, 2023",
    readTime: "12 min read",
    likes: 1567,
    comments: 432,
    tags: ["Security"],
    slug: "blockchain-gaming-security"
  }
];

export default function CryptoNews() {
  return (
    <BlogLayout
      title="Crypto News"
      description="Latest updates on blockchain gaming and NFTs"
      icon={Bitcoin}
      color="from-yellow-600 to-yellow-400"
      posts={posts}
    />
  );
}
