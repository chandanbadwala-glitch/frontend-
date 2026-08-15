const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'Restaurant', 'Cafe', 'Hotel'
  city: { type: String, required: true },
  cuisine: { type: String },
  status: { type: String, enum: ['Pending', 'Verified'], default: 'Pending' },
  openRoles: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
