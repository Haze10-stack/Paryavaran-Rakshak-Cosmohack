const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedCors = [
  process.env.CORS_ORIGIN || 'http://localhost:5173',
  'http://localhost:5174',
  'https://paryavaran-rakshak-cosmohack.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedCors.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('CORS policy does not allow access from the specified Origin.'), false);
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for media
app.use('/media', express.static('uploads'));

// Routes
app.use('/api', require('./src/routes/accounts.routes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Adventure Learning API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
