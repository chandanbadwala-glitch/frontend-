const mongoose = require('mongoose');

const StaffRequestSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  role: { type: String, required: true },
  city: { type: String, required: true },
  vacancies: { type: Number, required: true, default: 1 },
  salary: { type: String, required: true },
  urgent: { type: Boolean, default: false },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stage: { 
    type: String, 
    enum: ['New request', 'Admin reviewing', 'Candidate contacted', 'Employee accepted', 'Connected'],
    default: 'New request' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StaffRequest', StaffRequestSchema);
