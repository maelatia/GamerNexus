import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add subscription to Firestore
      const subscriptionsRef = collection(db, 'subscriptions');
      await addDoc(subscriptionsRef, {
        email,
        plan,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // Show success message
      toast.success('Subscription request submitted successfully!');
      
      // Reset form
      setEmail('');
      setPlan('monthly');
    } catch (error) {
      console.error('Error submitting subscription:', error);
      toast.error('Failed to submit subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            <span className="block bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Subscribe to GamerNexus
            </span>
          </h1>
          <p className="mt-8 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
            Join our gaming community to get exclusive access to premium content, early reviews, and special gaming events.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-12 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-left text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-3 block w-full rounded-lg border-0 bg-gray-800 py-4 px-5 text-lg text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-purple-500"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="plan" className="block text-lg font-medium text-left text-gray-300">
                  Subscription Plan
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  required
                  className="mt-3 block w-full rounded-lg border-0 bg-gray-800 py-4 px-5 text-lg text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="monthly">Monthly - $9.99/mo</option>
                  <option value="yearly">Yearly - $99.99/yr (Save 17%)</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-5 text-2xl font-medium text-white shadow-lg hover:from-purple-700 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Processing...' : 'Start Your Subscription'}
              </button>
            </div>
          </form>
          
          <div className="mt-16">
            <h3 className="text-3xl font-semibold text-white mb-8">What You'll Get:</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-gray-800 p-8">
                <h4 className="text-xl font-medium text-purple-500 mb-3">Premium Content</h4>
                <p className="text-lg text-gray-300">Exclusive access to in-depth gaming guides and reviews</p>
              </div>
              <div className="rounded-lg bg-gray-800 p-8">
                <h4 className="text-xl font-medium text-purple-500 mb-3">Early Access</h4>
                <p className="text-lg text-gray-300">Be the first to read new content and special features</p>
              </div>
              <div className="rounded-lg bg-gray-800 p-8">
                <h4 className="text-xl font-medium text-purple-500 mb-3">Community Events</h4>
                <p className="text-lg text-gray-300">Join exclusive gaming events and discussions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
