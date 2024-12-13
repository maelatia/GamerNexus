import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { 
  signOut, 
  updateProfile, 
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [username, setUsername] = useState(user?.displayName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user needs to set username
    if (user && !user.displayName) {
      setIsEditing(true);
      toast.error('Please set your username to continue');
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully signed out');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleUpdateUsername = async () => {
    if (!username.trim()) {
      toast.error('Username cannot be empty');
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(user!, {
        displayName: username.trim()
      });
      toast.success('Username updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update username');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error('All fields are required');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      // First, reauthenticate the user
      const credential = EmailAuthProvider.credential(
        user!.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user!, credential);

      // Then update the password
      await updatePassword(user!, newPassword);

      toast.success('Password updated successfully');
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        toast.error('Current password is incorrect');
      } else {
        toast.error('Failed to update password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <div className="flex items-center space-x-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="text-3xl text-white">
                  {(user.displayName || user.email)?.[0].toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white">
                  {isEditing ? 'Edit Profile' : isChangingPassword ? 'Change Password' : 'Welcome back!'}
                </h1>
                {isEditing ? (
                  <div className="mt-3 space-y-3">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={handleUpdateUsername}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
                      >
                        {isLoading ? 'Saving...' : 'Save'}
                      </button>
                      {user.displayName && (
                        <button
                          onClick={() => {
                            setUsername(user.displayName || '');
                            setIsEditing(false);
                          }}
                          className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ) : isChangingPassword ? (
                  <div className="mt-3 space-y-3">
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current password"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={handleChangePassword}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
                      >
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </button>
                      <button
                        onClick={() => {
                          setIsChangingPassword(false);
                          setCurrentPassword('');
                          setNewPassword('');
                          setConfirmNewPassword('');
                        }}
                        className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xl text-gray-300 mt-1">{user.displayName}</p>
                    <p className="text-gray-400 mt-1">{user.email}</p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="border-t border-gray-700 pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setIsChangingPassword(false);
                      setIsEditing(true);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                  >
                    Edit Username
                  </button>
                  {user && user.providerData && user.providerData.some(provider => provider.providerId === 'password') && (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setIsChangingPassword(true);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    >
                      Change Password
                    </button>
                  )}
                  <button
                    onClick={() => {/* Add functionality */}}
                    className="w-full text-left px-4 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                  >
                    Notification Settings
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Subscription</h2>
                <div className="p-4 rounded-lg bg-gray-700">
                  <p className="text-white">Free Plan</p>
                  <button
                    onClick={() => navigate('/subscribe')}
                    className="mt-3 inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                  >
                    Upgrade to Premium
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6 flex justify-end">
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
