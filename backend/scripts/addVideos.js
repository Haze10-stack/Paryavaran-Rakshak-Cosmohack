// scripts/addVideos.js
const mongoose = require('mongoose');
const Video = require('../src/models/Video');
require('dotenv').config();

const videosToAdd = [
  {
    title: 'Plastic Bag Story',
    theme: 'victims',
    description: 'A personal account highlighting the environmental and human cost of plastic bags.',
    thumbnail: 'plastic_bag_thumbnail.png',
    video: 'A_Plastic_Bags_Secret_.mp4'
  },
  {
    title: 'Tragedy of Water Bottle',
    theme: 'victims',
    description: 'A tragic story centered around a discarded water bottle and its aftermath.',
    thumbnail: 'bottle.png',
    video: 'VID-20250926-WA0010.mp4'
  }
];

const addVideos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const v of videosToAdd) {
      const existing = await Video.findOne({ $or: [{ video: v.video }, { title: v.title }] });
      if (existing) {
        // Update fields if missing or different
        existing.theme = v.theme;
        existing.description = v.description;
        existing.thumbnail = v.thumbnail;
        existing.video = v.video;
        await existing.save();
        console.log(`Updated existing video: ${v.title}`);
      } else {
        await Video.create(v);
        console.log(`Inserted video: ${v.title}`);
      }
    }

    console.log('Videos seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding videos:', error);
    process.exit(1);
  }
};

addVideos();