export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  subscriptionTier: 'free' | 'premium';
  subscriptionStatus: 'active' | 'inactive';
  subscriptionEndDate: Date | null;
}