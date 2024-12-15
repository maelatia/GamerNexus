import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { auth } from '../config/firebase';
import { toast } from 'react-hot-toast';

export default function NavActions() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      toast.error('Please sign in to view your profile');
      navigate('/signin');
    }
  };

  return (
    <div className="flex items-center space-x-6">
      <button className="p-2 rounded-lg hover:bg-gray-800 text-white hover:text-purple-400 transition-colors">
        <Search className="h-7 w-7" />
      </button>
      
      <button className="p-2 rounded-lg hover:bg-gray-800 text-white hover:text-purple-400 transition-colors">
        <Bell className="h-7 w-7" />
      </button>
      
      <button 
        onClick={handleProfileClick}
        className="p-2 rounded-lg hover:bg-gray-800 relative text-white hover:text-purple-400 transition-colors"
      >
        {user && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full" />
        )}
        <User className="h-7 w-7" />
      </button>
      {!user && (
        <button
          onClick={() => navigate('/signin')}
          className="px-4 py-2 text-2xl font-medium text-white hover:text-purple-400 transition-colors"
        >
          Sign In
        </button>
      )}
      <button 
        onClick={() => navigate('/subscribe')}
        className="ml-4 px-6 py-3 text-2xl font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Subscribe
      </button>
    </div>
  );
}