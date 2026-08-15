const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const StaffRequest = require('../models/StaffRequest');

// @route   POST /api/hiring/request
// @desc    Create a new staff request
// @access  Private (Owner only)
router.post('/request', auth, async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { restaurant, role, city, vacancies, salary, urgent } = req.body;

    const newRequest = new StaffRequest({
      owner: req.user.id,
      restaurant,
      role,
      city,
      vacancies,
      salary,
      urgent
    });

    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/hiring/requests
// @desc    Get owner's staff requests
// @access  Private (Owner only)
router.get('/requests', auth, async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const requests = await StaffRequest.find({ owner: req.user.id }).populate('restaurant', 'name city type rating');
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/hiring/jobs
// @desc    Get all open staff requests for employees
// @access  Private (Employee only)
router.get('/jobs', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const requests = await StaffRequest.find({ stage: { $in: ['New request', 'Admin reviewing'] } }).populate('restaurant', 'name city type rating');
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/hiring/employees
// @desc    Get all employees for search
// @access  Private (Owner only)
router.get('/employees', auth, async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const EmployeeProfile = require('../models/EmployeeProfile');
    const employees = await EmployeeProfile.find().populate('user', 'name email');
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/hiring/restaurants
// @desc    Get owner's restaurants
// @access  Private (Owner only)
router.get('/restaurants', auth, async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const Restaurant = require('../models/Restaurant');
    const restaurants = await Restaurant.find({ user: req.user.id });
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
