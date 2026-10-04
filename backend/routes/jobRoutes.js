const express = require('express')

const {
  createJob,
  getJobs,
  getJobById
} = require('../controllers/jobController')

const protect = require('../middleware/authMiddleware')

const router = express.Router()

// Create job - protected
router.post('/', protect, createJob)

// Get all jobs
router.get('/', getJobs)

// Get single job
router.get('/:id', getJobById)

module.exports = router