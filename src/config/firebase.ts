import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBLIk1DvwP_KhfKJTUrVZqEUgQIK9dTJ-g",
  authDomain: "gamernexusinc.firebaseapp.com",
  projectId: "gamernexusinc",
  storageBucket: "gamernexusinc.appspot.com",
  messagingSenderId: "353911001530",
  appId: "1:353911001530:web:7df54f32f71cd629434d83",
  measurementId: "G-EH3G9T5XRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
auth.useDeviceLanguage();
export const db = getFirestore(app);

// Initialize Storage with region and custom domain
export const storage = getStorage(app, {
  // Add your region and custom domain configuration here
  // For example:
  // location: 'us-central1',
  // customDomain: 'your-custom-domain.com'
});

let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
export const githubProvider = new GithubAuthProvider();

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.log('The current browser does not support persistence.');
      }
    });
}

export { app, analytics };