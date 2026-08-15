const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chefconnect';

async function seedAdmin() {
  await mongoose.connect(MONGO_URI);
  let admin = await User.findOne({ email: 'chandan@123@gmail.com' });
  if (!admin) {
    await User.create({ name: 'Admin', email: 'chandan@123@gmail.com', password: 'Admin@123', role: 'admin', status: 'approved' });
    console.log('Admin created.');
  } else {
    console.log('Admin already exists.');
  }
  
  // also update any existing users to approved
  await User.updateMany({}, { $set: { status: 'approved' } });
  console.log('All existing users approved.');
  
  mongoose.disconnect();
}

seedAdmin();
