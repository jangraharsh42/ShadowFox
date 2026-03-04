/**
 * Downloads player images and saves them locally.
 * Uses free cricket/sports imagery from Unsplash.
 * Replace with official MI player photos when available.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLAYERS_DIR = path.join(__dirname, '../client/public/players');

// Free cricket/sports images from Unsplash (various cricket scenes)
const IMAGE_URLS = [
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&h=600&fit=crop', // cricket bat
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&h=600&fit=crop', // stadium
  'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=500&h=600&fit=crop', // cricket
  'https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=500&h=600&fit=crop', // sports
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=600&fit=crop', // cricket
  'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500&h=600&fit=crop', // sports
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=600&fit=crop', // stadium
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1487947366323-374a624ae656?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=500&h=600&fit=crop',
];

async function downloadImage(url, filepath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    console.log(`  ✓ ${path.basename(filepath)}`);
    return true;
  } catch (err) {
    console.log(`  ✗ ${path.basename(filepath)}: ${err.message}`);
    return false;
  }
}

async function main() {
  if (!fs.existsSync(PLAYERS_DIR)) {
    fs.mkdirSync(PLAYERS_DIR, { recursive: true });
    console.log('Created', PLAYERS_DIR);
  }

  console.log('Downloading player images...\n');
  for (let i = 0; i < 15; i++) {
    const url = IMAGE_URLS[i] || IMAGE_URLS[0];
    const filepath = path.join(PLAYERS_DIR, `player-${i + 1}.jpg`);
    await downloadImage(url, filepath);
  }
  console.log('\nDone.');
}

main().catch(console.error);
