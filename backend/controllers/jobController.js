const Job = require('../models/Job')

// Create Job
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      salary,
      skills
    } = req.body

    // Server-side validation
    if (
      !title ||
      !company ||
      !location ||
      !type ||
      !salary ||
      !skills
    ) {
      return res.status(400).json({
        message: 'All job fields are required'
      })
    }

    const job = await Job.create({
      title,
      company,
      location,
      type,
      salary,
      skills
    })

    res.status(201).json({
      message: 'Job created successfully',
      job
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Server error'
    })
  }
}


// Get All Jobs
const getJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      type
    } = req.query

    const filter = {}

    // Search by title, company or skills
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          company: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          skills: {
            $regex: search,
            $options: 'i'
          }
        }
      ]
    }

    // Filter by location
    if (location) {
      filter.location = {
        $regex: location,
        $options: 'i'
      }
    }

    // Filter by job type
    if (type && type !== 'All') {
      filter.type = type
    }

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })

    res.status(200).json({
      count: jobs.length,
      jobs
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Server error'
    })
  }
}


// Get Single Job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      })
    }

    res.status(200).json(job)

  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    })
  }
}


module.exports = {
  createJob,
  getJobs,
  getJobById
}