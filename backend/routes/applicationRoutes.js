const express = require('express')

const {
  applyForJob,
  getMyApplications
} = require('../controllers/applicationController')

const protect = require('../middleware/authMiddleware')

const router = express.Router()

// Apply for job
router.post('/', protect, applyForJob)

// Get my applications
router.get('/my', protect, getMyApplications)

module.exports = router