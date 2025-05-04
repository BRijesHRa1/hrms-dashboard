// Load environment variables
require('dotenv').config();

// For debugging
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('MONGO_CONN:', process.env.MONGO_CONN);

// Use a hardcoded fallback if environment variables are not available
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_CONN || 'mongodb://127.0.0.1:27017/hrms-dashboard';

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'hrms-dashboard-secret-key-for-jwt',
}; 