import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useSubscriptionStore } from '../../stores/subscriptionStore';

export default function SubscriptionPlans() {
  const { profile } = useAuthStore();
  const { upgradeToPremium, cancelSubscription, isUpgrading } = useSubscriptionStore();

  const isPremium = profile?.subscription_tier === 'premium';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-gray-900 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Free Plan</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-gray-300">
              <span className="mr-2">✓</span> Access to general categories
            </li>
            <li className="flex items-center text-gray-300">
              <span className="mr-2">✓</span> Save up to 5 items
            </li>
            <li className="flex items-center text-gray-300">
              <span className="mr-2">✓</span> Basic blog access
            </li>
          </ul>
          <p className="text-2xl font-bold text-white mb-8">$0/month</p>
          {isPremium && (
            <button
              onClick={cancelSubscription}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 hover:bg-gray-600"
            >
              Downgrade to Free
            </button>
          )}
        </div>

        {/* Premium Plan */}
        <div className="bg-purple-900 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Premium Plan</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-gray-200">
              <span className="mr-2">✓</span> Unlimited saved items
            </li>
            <li className="flex items-center text-gray-200">
              <span className="mr-2">✓</span> Ad-free browsing
            </li>
            <li className="flex items-center text-gray-200">
              <span className="mr-2">✓</span> Exclusive content access
            </li>
            <li className="flex items-center text-gray-200">
              <span className="mr-2">✓</span> Early access to new features
            </li>
          </ul>
          <p className="text-2xl font-bold text-white mb-8">$5/month</p>
          {!isPremium && (
            <button
              onClick={upgradeToPremium}
              disabled={isUpgrading}
              className="w-full bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 disabled:opacity-50"
            >
              {isUpgrading ? 'Processing...' : 'Upgrade to Premium'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}