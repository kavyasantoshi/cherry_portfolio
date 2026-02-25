// compress.js (ES Module Version)
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, 'public', 'images');

async function compressImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  if (!/\.(jpg|jpeg|png)$/i.test(ext)) return;

  try {
    const outputPath = inputPath.replace(/\.[^/.]+$/, '.webp');
    
    await sharp(inputPath)
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(outputPath);
    
    // Delete original large file
    await fs.unlink(inputPath);
    
    const stats = await fs.stat(outputPath);
    const newSize = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`✅ ${path.basename(inputPath)} → ${newSize}MB`);
  } catch (err) {
    console.error(`❌ ${path.basename(inputPath)}: ${err.message}`);
  }
}

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip logos folder - keep them high quality
      if (entry.name === 'logos') continue;
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await compressImage(fullPath);
    }
  }
}

console.log('🚀 Starting image compression...\n');
processDirectory(IMAGES_DIR).then(() => {
  console.log('\n✨ Compression complete! Run "du -sh public/images" to verify.');
}).catch(err => {
  console.error('💥 Error:', err);
});