const Application = require('../models/Application')

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body

    if (!jobId) {
      return res.status(400).json({
        message: 'Job ID is required'
      })
    }

    // Check if already applied
    const existingApplication =
      await Application.findOne({
        user: req.user.userId,
        job: jobId
      })

    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already applied for this job'
      })
    }

    const application = await Application.create({
      user: req.user.userId,
      job: jobId
    })

    res.status(201).json({
      message: 'Job application submitted successfully',
      application
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Server error'
    })
  }
}


// Get logged-in user's applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.userId
    })
      .populate('job')
      .sort({ createdAt: -1 })

    res.status(200).json({
      count: applications.length,
      applications
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Server error'
    })
  }
}


module.exports = {
  applyForJob,
  getMyApplications
}