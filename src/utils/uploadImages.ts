import { uploadImage } from '../services/imageService';
import fs from 'fs';
import path from 'path';

export const uploadImagesToFirebase = async (localDirectory: string, firebasePath: string) => {
  try {
    const files = fs.readdirSync(localDirectory);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
        const filePath = path.join(localDirectory, file);
        const fileBuffer = fs.readFileSync(filePath);
        const fileBlob = new Blob([fileBuffer]);
        const firebaseFilePath = `${firebasePath}/${file}`;
        
        try {
          const url = await uploadImage(fileBlob as File, firebaseFilePath);
          console.log(`Uploaded ${file} to Firebase Storage: ${url}`);
        } catch (error) {
          console.error(`Failed to upload ${file}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }
};
