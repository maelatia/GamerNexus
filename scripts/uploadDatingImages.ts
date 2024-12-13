import { uploadImagesToFirebase } from '../src/utils/uploadImages';
import path from 'path';

const uploadDatingImages = async () => {
  const localDirectory = path.join(__dirname, '../public/images/dating');
  const firebasePath = 'images/dating';
  
  console.log('Starting upload of dating app images...');
  await uploadImagesToFirebase(localDirectory, firebasePath);
  console.log('Upload complete!');
};

uploadDatingImages().catch(console.error);
