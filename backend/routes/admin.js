const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const StaffRequest = require('../models/StaffRequest');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const EmployeeProfile = require('../models/EmployeeProfile');

// @route   GET /api/admin/requests
// @desc    Get all staff requests
// @access  Private (Admin only)
router.get('/requests', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const requests = await StaffRequest.find().populate('owner', 'name').populate('restaurant', 'name city').populate('candidate', 'name');
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/admin/requests/:id/advance
// @desc    Advance request stage
// @access  Private (Admin only)
router.put('/requests/:id/advance', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    
    let request = await StaffRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Request not found' });

    const stages = ['New request', 'Admin reviewing', 'Candidate contacted', 'Employee accepted', 'Connected'];
    const currentIndex = stages.indexOf(request.stage);
    
    if (currentIndex < stages.length - 1) {
      request.stage = stages[currentIndex + 1];
      await request.save();
    }
    
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/admin/employees
// @desc    Get all employees
// @access  Private (Admin only)
router.get('/employees', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const employees = await EmployeeProfile.find().populate('user', 'name email');
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/admin/stats
// @desc    Get dashboard stats
// @access  Private (Admin only)
router.get('/stats', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const totalRestaurants = await Restaurant.countDocuments();
    const totalEmployees = await EmployeeProfile.countDocuments();
    const pendingRequests = await StaffRequest.countDocuments({ stage: { $ne: 'Connected' } });
    
    res.json({
      totalRestaurants,
      totalEmployees,
      pendingRequests
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/admin/pending-users
// @desc    Get all users pending approval
// @access  Private (Admin only)
router.get('/pending-users', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const pendingUsers = await User.find({ status: 'pending' }).select('-password');
    res.json(pendingUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/admin/approve-user/:id
// @desc    Approve a pending user
// @access  Private (Admin only)
router.put('/approve-user/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    
    user.status = 'approved';
    await user.save();
    
    res.json({ msg: 'User approved successfully', user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
