import React from 'react';
import { useParams } from 'react-router-dom';
import { Newspaper, Star, Gamepad2, Trophy } from 'lucide-react';
import BlogLayout from '../components/BlogLayout';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  tags: string[];
  slug: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'GTA 6 Trailer Breaks YouTube Records',
    excerpt: 'The highly anticipated GTA 6 trailer has shattered all previous viewing records on YouTube within 24 hours of release.',
    author: {
      name: 'John Smith',
      avatar: 'images/avatars/john.webp'
    },
    coverImage: 'images/blog/gta6-trailer.webp',
    date: 'Dec 11, 2023',
    readTime: '5 min',
    likes: 2456,
    comments: 123,
    tags: ['News'],
    slug: 'gta-6-trailer-breaks-records'
  },
  {
    id: '2',
    title: 'Spider-Man 2 Review: A Web-Slinging Masterpiece',
    excerpt: 'Our community reviews the latest Spider-Man game. Find out why players are calling it the best superhero game ever made.',
    author: {
      name: 'Sarah Johnson',
      avatar: 'images/avatars/sarah.webp'
    },
    coverImage: 'images/blog/spiderman2-review.webp',
    date: 'Dec 10, 2023',
    readTime: '8 min',
    likes: 1832,
    comments: 95,
    tags: ['Reviews'],
    slug: 'spiderman-2-review'
  },
  {
    id: '3',
    title: 'Ultimate Guide to Building Your First Gaming PC',
    excerpt: 'Step-by-step guide to assembling your dream gaming rig, from choosing parts to final setup.',
    author: {
      name: 'Mike Chen',
      avatar: 'images/avatars/mike.webp'
    },
    coverImage: 'images/blog/pc-building-guide.webp',
    date: 'Dec 9, 2023',
    readTime: '12 min',
    likes: 3421,
    comments: 234,
    tags: ['Guide'],
    slug: 'ultimate-pc-building-guide'
  },
  {
    id: '4',
    title: 'Cyberpunk 2077 Gets Major Update',
    excerpt: 'CD Projekt Red releases new content update bringing flying vehicles and new missions.',
    author: {
      name: 'Alex Turner',
      avatar: 'images/avatars/alex.webp'
    },
    coverImage: 'images/blog/cyberpunk-2077-update.webp',
    date: 'Dec 8, 2023',
    readTime: '4 min',
    likes: 2345,
    comments: 123,
    tags: ['News'],
    slug: 'cyberpunk-2077-major-update'
  },
  {
    id: '5',
    title: 'Community Review: Baldur\'s Gate 3',
    excerpt: 'Players share their experiences with the critically acclaimed RPG that\'s taking the gaming world by storm.',
    author: {
      name: 'Emma Wilson',
      avatar: 'images/avatars/emma.webp'
    },
    coverImage: 'images/blog/baldurs-gate-3-review.webp',
    date: 'Dec 7, 2023',
    readTime: '10 min',
    likes: 1987,
    comments: 89,
    tags: ['Reviews'],
    slug: 'baldurs-gate-3-community-review'
  },
  {
    id: '6',
    title: 'Mastering Valorant: Advanced Tips',
    excerpt: 'Pro players share their secrets for improving your gameplay in Valorant.',
    author: {
      name: 'David Lee',
      avatar: 'images/avatars/david.webp'
    },
    coverImage: 'images/blog/valorant-advanced-tips.webp',
    date: 'Dec 6, 2023',
    readTime: '15 min',
    likes: 4211,
    comments: 234,
    tags: ['Guide'],
    slug: 'mastering-valorant-advanced-tips'
  }
];

const pageContent = {
  news: {
    title: "Gaming News Central",
    description: "Your daily source for the latest gaming updates and announcements",
    icon: Newspaper,
    color: "blue"
  },
  featured: {
    title: "Featured Stories",
    description: "Curated collection of must-read gaming articles and features",
    icon: Star,
    color: "yellow"
  },
  releases: {
    title: "New & Upcoming Games",
    description: "Stay ahead with the latest game releases and announcements",
    icon: Gamepad2,
    color: "green"
  },
  reviews: {
    title: "Game Reviews Hub",
    description: "In-depth analysis and ratings of the latest games",
    icon: Trophy,
    color: "purple"
  },
  default: {
    title: "GamerNexus Blog",
    description: "Your Ultimate Gaming News & Reviews Destination",
    icon: Newspaper,
    color: "purple"
  }
};

export default function BlogPage() {
  const { slug } = useParams<{ slug?: string }>();
  
  // If slug is provided, show single blog post
  if (slug) {
    const post = blogPosts.find(post => post.slug === slug);
    if (!post) return <div>Post not found</div>;
    
    return (
      <BlogLayout>
        <article className="max-w-4xl mx-auto">
          <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="px-4">
            <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{post.author.name}</span>
              </div>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">{post.excerpt}</p>
          </div>
        </article>
      </BlogLayout>
    );
  }
  
  // Otherwise show blog listing
  const content = pageContent.default;
  
  return (
    <BlogLayout
      title={content.title}
      description={content.description}
      icon={content.icon}
      color={content.color}
      posts={blogPosts}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-gray-900/50 rounded-xl overflow-hidden hover:bg-gray-900/70 transition-all">
              <div className="relative h-48">
                <img 
                  src={post.coverImage}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BlogLayout>
  );
}
