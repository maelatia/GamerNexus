import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface NewsletterProps {
  title?: string;
  description?: string;
}

export default function Newsletter({ 
  title = 'Stay Updated with Gaming News',
  description = 'Subscribe to our newsletter to receive the latest updates, guides, and news directly in your inbox.'
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Thanks for subscribing!');
    setEmail('');
    setIsLoading(false);
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 bg-purple-600 text-white rounded-lg font-medium transition-all
              ${isLoading 
                ? 'opacity-75 cursor-not-allowed' 
                : 'hover:bg-purple-700 active:bg-purple-800'
              }`}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
}
