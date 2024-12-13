import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Globe, Star } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

export default function Subscription() {
  const navigate = useNavigate();
  const { setIsSubscribed } = useSubscription();

  const handleSubscribe = () => {
    setIsSubscribed(true);
    navigate(-1); // Go back to previous page
  };

  const features = [
    {
      icon: Shield,
      title: 'Unlimited Access',
      description: 'Get access to all articles, guides, and exclusive content'
    },
    {
      icon: Zap,
      title: 'Early Access',
      description: 'Be the first to read new content and special features'
    },
    {
      icon: Globe,
      title: 'Ad-Free Experience',
      description: 'Enjoy an uninterrupted, premium reading experience'
    },
    {
      icon: Star,
      title: 'Premium Support',
      description: 'Get priority support and exclusive community access'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Unlock Premium Content
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get unlimited access to all our content, features, and exclusive benefits
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 text-center"
              >
                <div className="inline-flex p-3 rounded-full bg-purple-500/10 mb-4">
                  <Icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-8 text-center">
            <div className="mb-4">
              <span className="text-5xl font-bold text-white">$9.99</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-300">✓ Unlimited article access</li>
              <li className="text-gray-300">✓ Ad-free experience</li>
              <li className="text-gray-300">✓ Early access to new content</li>
              <li className="text-gray-300">✓ Premium support</li>
              <li className="text-gray-300">✓ Cancel anytime</li>
            </ul>
            <button
              onClick={handleSubscribe}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
