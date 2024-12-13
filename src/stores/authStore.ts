import { create } from 'zustand';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import * as authService from '../services/auth';
import type { UserProfile } from '../types/auth';

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  signIn: async (email: string, password: string) => {
    const user = await authService.signIn(email, password);
    const profile = await authService.getUserProfile(user.uid);
    set({ user: profile });
  },

  signUp: async (email: string, password: string) => {
    const user = await authService.signUp(email, password);
    const profile = await authService.getUserProfile(user.uid);
    set({ user: profile });
  },

  signInWithGoogle: async () => {
    const user = await authService.signInWithGoogle();
    const profile = await authService.getUserProfile(user.uid);
    set({ user: profile });
  },

  signOut: async () => {
    await authService.signOut();
    set({ user: null });
  }
}));

// Setup auth state listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const profile = await authService.getUserProfile(user.uid);
    useAuthStore.setState({ user: profile, isLoading: false });
  } else {
    useAuthStore.setState({ user: null, isLoading: false });
  }
});