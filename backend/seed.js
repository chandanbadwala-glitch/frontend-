const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const StaffRequest = require('./models/StaffRequest');
const EmployeeProfile = require('./models/EmployeeProfile');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chefconnect';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding');

    // Clear existing
    await User.deleteMany();
    await Restaurant.deleteMany();
    await StaffRequest.deleteMany();
    await EmployeeProfile.deleteMany();

    // Create Admin
    const admin = await User.create({ name: 'Admin User', email: 'admin@chefconnect.com', password: 'password123', role: 'admin' });
    
    // Create Owner
    const owner1 = await User.create({ name: 'Rahul Kapoor', email: 'rahul@spiceterrace.com', password: 'password123', role: 'owner' });
    
    // Create Employee
    const empUser1 = await User.create({ name: 'Ramesh Iyer', email: 'ramesh@example.com', password: 'password123', role: 'employee' });

    // Create Restaurant
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

    // Create Staff Request
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

    // Create Employee Profile
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
      resumeScore: 88,
      initials: 'RI'
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
