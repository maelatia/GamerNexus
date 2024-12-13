import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const upgradeToPremium = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  const subscriptionEndDate = new Date();
  subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

  await updateDoc(userRef, {
    subscriptionTier: 'premium',
    subscriptionStatus: 'active',
    subscriptionEndDate
  });
};

export const cancelSubscription = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  
  await updateDoc(userRef, {
    subscriptionTier: 'free',
    subscriptionStatus: 'inactive',
    subscriptionEndDate: null
  });
};