import { create } from 'zustand';
import * as subscriptionService from '../services/subscription';
import { useAuthStore } from './authStore';

interface SubscriptionState {
  isUpgrading: boolean;
  upgradeToPremium: () => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  isUpgrading: false,

  upgradeToPremium: async () => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    set({ isUpgrading: true });
    try {
      await subscriptionService.upgradeToPremium(user.uid);
      // Refresh user profile after upgrade
      const profile = await authService.getUserProfile(user.uid);
      useAuthStore.setState({ user: profile });
    } finally {
      set({ isUpgrading: false });
    }
  },

  cancelSubscription: async () => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    await subscriptionService.cancelSubscription(user.uid);
    // Refresh user profile after cancellation
    const profile = await authService.getUserProfile(user.uid);
    useAuthStore.setState({ user: profile });
  }
}));