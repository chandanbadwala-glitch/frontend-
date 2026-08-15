const mongoose = require('mongoose');

const EmployeeProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  experience: { type: Number, required: true },
  skills: [{ type: String }],
  languages: [{ type: String }],
  rating: { type: Number, default: 0 },
  expectedSalary: { type: Number },
  availability: { type: String, enum: ['Immediate', '15 Days', '1 Month'], default: 'Immediate' },
  qualification: { type: String },
  status: { type: String, default: 'Available' },
  verified: { type: Boolean, default: false },
  badge: { type: String, enum: ['Gold', 'Premium', 'Top Rated', 'Experienced', 'Verified', 'None'], default: 'None' },
  matchScore: { type: Number, default: 0 },
  resumeScore: { type: Number, default: 0 },
  initials: { type: String }
});

module.exports = mongoose.model('EmployeeProfile', EmployeeProfileSchema);
