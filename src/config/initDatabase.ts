import { db } from './firebase';
import { collection, doc, setDoc, getDocs, serverTimestamp, enableIndexedDbPersistence, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

// Enable offline persistence
const enablePersistence = async () => {
  try {
    await enableIndexedDbPersistence(db);
    console.log('Offline persistence enabled');
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  }
};

// Default categories for the application
const defaultCategories = [
  {
    id: 'gaming-accessories',
    name: 'Gaming Accessories',
    description: 'Essential gaming peripherals',
    icon: 'Mic2',
    color: 'bg-yellow-500'
  },
  {
    id: 'gaming-laptops',
    name: 'Gaming Laptops',
    description: 'Portable gaming powerhouses',
    icon: 'Laptop',
    color: 'bg-purple-500'
  },
  {
    id: 'streaming-gear',
    name: 'Streaming Gear',
    description: 'Professional streaming equipment',
    icon: 'Video',
    color: 'bg-red-500'
  },
  {
    id: 'networking',
    name: 'Networking',
    description: 'High-speed networking solutions',
    icon: 'Network',
    color: 'bg-green-500'
  }
];

// Initialize the database with default data
export const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');
    
    // Enable offline persistence first
    await enablePersistence();

    // Clear existing categories
    console.log('Clearing existing categories...');
    const categoriesRef = collection(db, 'categories');
    const categoriesSnapshot = await getDocs(categoriesRef);
    
    for (const doc of categoriesSnapshot.docs) {
      console.log(`Deleting category: ${doc.id}`);
      await deleteDoc(doc.ref);
    }
    
    console.log('Initializing new categories...');
    
    // Add all categories
    for (const category of defaultCategories) {
      console.log(`Adding category: ${category.name}`);
      const categoryRef = doc(db, 'categories', category.id);
      await setDoc(categoryRef, {
        ...category,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }

    // Create other necessary collections
    console.log('Initializing other collections...');
    const collections = ['users', 'products', 'subscriptions'];
    for (const collectionName of collections) {
      console.log(`Initializing collection: ${collectionName}`);
      const configRef = doc(db, collectionName, '_config');
      await setDoc(configRef, {
        initialized: true,
        createdAt: serverTimestamp()
      });
    }

    console.log('Successfully initialized database');
    toast.success('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    console.error('Error details:', error);
    toast.error('Failed to initialize database');
    return false;
  }
};

// Create a new user profile in Firestore
export const createUserProfile = async (uid: string, data: any) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      subscription: {
        status: 'free',
        validUntil: null
      }
    }, { merge: true });
    
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};
