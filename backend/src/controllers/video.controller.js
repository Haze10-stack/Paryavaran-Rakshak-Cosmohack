// src/controllers/video.controller.js
const Video = require('../models/Video');
const UserVideoProgress = require('../models/UserVideoProgress');
const UserProgress = require('../models/UserProgress');
const Signup = require('../models/Signup');

exports.getVideosByTheme = async (req, res) => {
  try {
    const { theme } = req.params;
    const videos = await Video.find({ theme: new RegExp(`^${theme}$`, 'i') })
      .sort({ createdAt: -1 });

    const videosWithUrls = videos.map(video => ({
      id: video._id,
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail ? `${req.protocol}://${req.get('host')}/media/thumbnails/${video.thumbnail}` : null,
      video: video.video ? `${req.protocol}://${req.get('host')}/media/videos/${video.video}` : null,
      video_url: video.video_url,
      theme: video.theme,
      uploaded_at: video.createdAt
    }));

    res.json(videosWithUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserVideoProgress = async (req, res) => {
  try {
    const { theme } = req.params;
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const videos = await Video.find({ theme: new RegExp(`^${theme}$`, 'i') })
      .sort({ createdAt: -1 });

    const progressEntries = await UserVideoProgress.find({
      user: user._id,
      theme: new RegExp(`^${theme}$`, 'i')
    });

    const progressMap = {};
    progressEntries.forEach(entry => {
      progressMap[entry.video.toString()] = entry.progress;
    });

    const combinedData = videos.map(video => ({
      id: video._id,
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail ? `${req.protocol}://${req.get('host')}/media/thumbnails/${video.thumbnail}` : null,
      video: video.video ? `${req.protocol}://${req.get('host')}/media/videos/${video.video}` : null,
      theme: video.theme,
      uploaded_at: video.createdAt,
      progress: progressMap[video._id.toString()] || 0
    }));

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveOrGetUserVideoProgress = async (req, res) => {
  try {
    const { theme } = req.params;
    const { email, video, progress } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let userProgress = await UserProgress.findOne({ user: user._id });
    if (!userProgress) {
      userProgress = new UserProgress({ user: user._id });
      await userProgress.save();
    }

    if (video && progress !== undefined) {
      const progressFloat = parseFloat(progress);
      
      const videoDoc = await Video.findById(video);
      if (!videoDoc) {
        return res.status(404).json({ error: 'Video not found' });
      }

      let uvp = await UserVideoProgress.findOne({
        user: user._id,
        video: videoDoc._id
      });

      if (!uvp) {
        uvp = new UserVideoProgress({
          user: user._id,
          video: videoDoc._id,
          theme: theme,
          progress: progressFloat
        });
        await uvp.save();

        if (progressFloat > 70) {
          userProgress.xp += 10;
          await userProgress.save();
        }
      } else {
        if (uvp.progress < 70 && progressFloat > 70) {
          userProgress.xp += 10;
          await userProgress.save();
        }

        if (progressFloat > uvp.progress) {
          uvp.progress = progressFloat;
          uvp.theme = theme;
          await uvp.save();
        }
      }
    }

    const videos = await Video.find({ theme: new RegExp(`^${theme}$`, 'i') })
      .sort({ createdAt: -1 });

    const progressEntries = await UserVideoProgress.find({
      user: user._id,
      theme: new RegExp(`^${theme}$`, 'i')
    });

    const progressMap = {};
    progressEntries.forEach(entry => {
      progressMap[entry.video.toString()] = entry.progress;
    });

    const combinedData = videos.map(v => ({
      id: v._id,
      title: v.title,
      description: v.description,
      thumbnail: v.thumbnail ? `${req.protocol}://${req.get('host')}/media/thumbnails/${v.thumbnail}` : null,
      video: v.video ? `${req.protocol}://${req.get('host')}/media/videos/${v.video}` : null,
      theme: v.theme,
      uploaded_at: v.createdAt,
      progress: progressMap[v._id.toString()] || 0
    }));

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};