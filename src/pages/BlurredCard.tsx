import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

interface BlurredCardProps {
  children: React.ReactNode;
  index: number;
}

export default function BlurredCard({ children, index }: BlurredCardProps) {
  const navigate = useNavigate();
  const { isSubscribed } = useSubscription();

  if (index < 3 || isSubscribed) {
    return <>{children}</>;
  }

  return (
    <div 
      onClick={() => navigate('/subscription')}
      className="relative cursor-pointer group"
    >
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-md z-10 flex flex-col items-center justify-center rounded-xl transition-all duration-300 group-hover:bg-gray-900/80">
        <Lock className="w-8 h-8 text-purple-500 mb-2" />
        <p className="text-white font-medium text-center px-4">
          Subscribe to unlock all content
        </p>
        <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Subscribe Now
        </button>
      </div>
      <div className="filter blur-md transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
