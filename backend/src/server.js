const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); // Forces Node to use Cloudflare and Google DNS

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Load environment variables from the root backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse incoming JSON data from HTTP requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for frontend requests
const cors = require('cors');
const allowedOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Adds security headers to protect against common vulnerabilities
app.use(helmet()); 

// Limits the number of requests from a single IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// ... under your other routes
app.use('/api/users', require('./routes/userRoutes'));


// Register Routes
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Overwrite default Express error handler
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports.app = app;\n}\n\n// Only listen if not in Vercel serverless\nif (!process.env.VERCEL) {\n  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));\n}
