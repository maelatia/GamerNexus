import React from 'react';
import { Wrench } from 'lucide-react';
import BlogLayout from '../../components/BlogLayout';

const posts = [
  {
    title: "Essential Skyrim Mods for 2024",
    excerpt: "Our curated list of must-have mods that enhance graphics, gameplay, and immersion in Skyrim, complete with installation guides...",
    author: {
      name: "Marcus Wright",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Skyrim+Mods",
    date: "2024-12-12",
    readTime: "18 min read",
    likes: 1543,
    comments: 367,
    tags: ["Skyrim", "Mods", "Guide"],
    slug: "essential-skyrim-mods-2024"
  },
  {
    title: "Creating Custom Maps in Minecraft",
    excerpt: "Learn how to design and build professional-quality custom maps in Minecraft, from planning to implementation...",
    author: {
      name: "Sophie Turner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie"
    },
    coverImage: "https://placehold.co/800x400/2a2a2a/purple?text=Minecraft+Maps",
    date: "2024-12-11",
    readTime: "15 min read",
    likes: 987,
    comments: 234,
    tags: ["Minecraft", "Map Making", "Tutorial"],
    slug: "minecraft-custom-maps-guide"
  },
  // Add more modding posts as needed
];

export default function ModdingCustomization() {
  return (
    <BlogLayout
      title="Modding & Customization"
      description="Discover the world of game modifications and customization, with guides for popular games, mod recommendations, and tutorials for creating your own mods."
      icon={Wrench}
      color="from-orange-500 to-red-500"
      posts={posts}
    />
  );
}
