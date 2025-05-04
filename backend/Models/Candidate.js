// backend/Models/Candidate.js
const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true, unique: true },   
  phoneNumber: { type: String, required: true },
  position:    { type: String, required: true },
  status:      { type: String, enum: ['New','Scheduled','Ongoing','Selected','Rejected'], default: 'New' },
  experience:  { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema); 
