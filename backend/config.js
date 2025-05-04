// Load environment variables
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI || process.env.MONGO_CONN || 'mongodb://localhost:27017/hrms-dashboard',
  JWT_SECRET: process.env.JWT_SECRET || 'hrms-dashboard-secret-key-for-jwt',
}; 