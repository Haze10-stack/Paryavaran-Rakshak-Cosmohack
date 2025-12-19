// scripts/createDirectories.js
const fs = require('fs');
const path = require('path');

const directories = [
  'uploads',
  'uploads/thumbnails',
  'uploads/videos'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

console.log('Directory setup complete!');