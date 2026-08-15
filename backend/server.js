const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

// Models for seeding
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const StaffRequest = require('./models/StaffRequest');
const EmployeeProfile = require('./models/EmployeeProfile');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chefconnect';

async function seedData() {
  const count = await User.countDocuments();
  if (count === 0) {
    console.log('Seeding initial data...');
    const owner1 = await User.create({ name: 'Rahul Kapoor', email: 'rahul@spiceterrace.com', password: 'password123', role: 'owner', status: 'approved' });
    const owner2 = await User.create({ name: 'Chandan', email: 'chandan@123gmail.com', password: 'chandan@123', role: 'owner', status: 'approved' });
    const empUser1 = await User.create({ name: 'Ramesh Iyer', email: 'ramesh@example.com', password: 'password123', role: 'employee', status: 'approved' });

    const rest1 = await Restaurant.create({
      user: owner1._id,
      name: 'Spice Terrace',
      type: 'Restaurant',
      city: 'Mumbai',
      cuisine: 'North Indian, Mughlai',
      status: 'Verified',
      openRoles: 4,
      rating: 4.6
    });

    await StaffRequest.create({
      owner: owner1._id,
      restaurant: rest1._id,
      role: 'Tandoor Chef',
      city: 'Mumbai',
      vacancies: 2,
      salary: '₹45,000 – ₹55,000',
      urgent: true,
      stage: 'Candidate contacted',
      candidate: empUser1._id
    });

    await EmployeeProfile.create({
      user: empUser1._id,
      role: 'Tandoor Chef',
      category: 'Kitchen',
      city: 'Mumbai',
      state: 'Maharashtra',
      experience: 11,
      skills: ['Tandoor', 'Mughlai', 'Kebabs', 'Bulk Cooking'],
      languages: ['Hindi', 'Marathi', 'English'],
      rating: 4.9,
      expectedSalary: 48000,
      availability: 'Immediate',
      qualification: 'ITI Food Production',
      status: 'Serving notice',
      verified: true,
      badge: 'Gold',
      matchScore: 96,
      initials: 'RI'
    });
    console.log('Seed complete.');
  }

  // Ensure Admin always exists
  let admin = await User.findOne({ email: 'chandan@123@gmail.com' });
  if (!admin) {
    await User.create({ name: 'Admin', email: 'chandan@123@gmail.com', password: 'Admin@123', role: 'admin', status: 'approved' });
    console.log('Admin user seeded');
  }
}

async function startServer() {
  try {
    console.log('Attempting to connect to MongoDB at', MONGO_URI);
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('MongoDB connected');
    await seedData();
  } catch (err) {
    console.log('Local MongoDB not running. Starting in-memory MongoDB...');
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('In-memory MongoDB connected at', uri);
    await seedData();
  }

  // Routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/admin', require('./routes/admin'));
  app.use('/api/hiring', require('./routes/hiring'));

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();
