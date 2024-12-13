import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
const auth = getAuth(app);
const storage = getStorage(app);

async function signIn() {
  try {
    // Replace these with your admin email and password
    const email = process.env.FIREBASE_ADMIN_EMAIL;
    const password = process.env.FIREBASE_ADMIN_PASSWORD;
    
    if (!email || !password) {
      throw new Error('Please set FIREBASE_ADMIN_EMAIL and FIREBASE_ADMIN_PASSWORD environment variables');
    }
    
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Successfully signed in to Firebase');
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

async function uploadImage(filePath, destinationPath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const storageRef = ref(storage, destinationPath);
    
    console.log(`Uploading ${filePath} to ${destinationPath}...`);
    const snapshot = await uploadBytes(storageRef, fileBuffer);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log(`✓ Uploaded ${filePath}`);
    console.log(`  URL: ${downloadURL}`);
    return downloadURL;
  } catch (error) {
    console.error(`× Failed to upload ${filePath}:`, error);
    throw error;
  }
}

async function uploadImagesInDirectory(sourceDir, targetDir) {
  const files = fs.readdirSync(sourceDir);
  
  console.log(`\nUploading images from ${sourceDir} to ${targetDir}...`);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = `${targetDir}/${file}`;
      
      try {
        await uploadImage(sourcePath, targetPath);
      } catch (error) {
        console.error(`Failed to upload ${file}`);
      }
    }
  }
}

// Upload images from each category directory
async function uploadAllImages() {
  try {
    await signIn();
    
    const categories = ['dating', 'gaming-pcs', 'meet-friends', 'essentials', 'accessories', 'streaming', 'crypto', 'game-dev'];
    const baseDir = path.join(__dirname, '../public/images');
    
    console.log('Starting image upload process...\n');
    
    for (const category of categories) {
      const sourceDir = path.join(baseDir, category);
      const targetDir = `images/${category}`;
      
      if (fs.existsSync(sourceDir)) {
        await uploadImagesInDirectory(sourceDir, targetDir);
      } else {
        console.warn(`Warning: Directory not found - ${sourceDir}`);
      }
    }
    
    console.log('\nImage upload process complete!');
  } catch (error) {
    console.error('Failed to upload images:', error);
  }
}

uploadAllImages().catch(console.error);
