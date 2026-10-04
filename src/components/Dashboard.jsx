import { useEffect, useState } from 'react'
import JobCard from './JobCard'
import Navbar from './Navbar'

function Dashboard({ setPage }) {
  const loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUser')
  )

  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // Get JWT token
  const token = localStorage.getItem('token')

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError('')

      let url = 'https://job-portal-cmf6.onrender.com'

      const params = new URLSearchParams()

      if (search.trim()) {
        params.append('search', search.trim())
      }

      if (filter !== 'All') {
        params.append('type', filter)
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to load jobs')
        return
      }

      setJobs(data.jobs)

    } catch (error) {
      console.error(error)

      setError(
        'Unable to connect to the backend server.'
      )
    } finally {
      setLoading(false)
    }
  }


  // Fetch user's applications
  const fetchApplications = async () => {
    try {
      const response = await fetch(
        'https://job-portal-cmf6.onrender.com/api/applications/my',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.message || 'Failed to load applications'
        )
        return
      }

      setApplications(data.applications)

    } catch (error) {
      console.error(error)

      setError(
        'Unable to load your applications.'
      )
    }
  }


  // Load jobs whenever search/filter changes
  useEffect(() => {
    fetchJobs()
  }, [search, filter])


  // Load applications when dashboard opens
  useEffect(() => {
    if (token) {
      fetchApplications()
    }
  }, [])


  // Apply for job
  const handleApply = async (job) => {
    try {
      setMessage('')
      setError('')

      if (!token) {
        setError('Please login again.')
        return
      }

      const response = await fetch(
        'https://job-portal-cmf6.onrender.com/api/applications',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            jobId: job._id
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.message || 'Failed to apply for job'
        )
        return
      }

      setMessage(
        `Successfully applied for ${job.title}!`
      )

      // Refresh applications
      fetchApplications()

    } catch (error) {
      console.error(error)

      setError(
        'Unable to connect to the backend server.'
      )
    }
  }


  return (
    <div>

      <Navbar setPage={setPage} />

      <div className="container mt-4">

        <h2 className="mb-4">
          Welcome to your Dashboard
        </h2>


        {/* Success message */}
        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}


        {/* Error message */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}


        <div className="row">

          {/* PROFILE */}
          <div className="col-md-4 mb-4">

            <div className="card shadow-sm">

              <div className="card-body">

                <h4 className="card-title">
                  My Profile
                </h4>

                <hr />

                <p>
                  <strong>Name:</strong>{' '}
                  {loggedInUser?.name}
                </p>

                <p>
                  <strong>Email:</strong>{' '}
                  {loggedInUser?.email}
                </p>

                <p>
                  <strong>Skills:</strong>{' '}
                  React, JavaScript, Bootstrap
                </p>

                <button className="btn btn-outline-primary">
                  Edit Profile
                </button>

              </div>

            </div>

          </div>


          {/* JOB SECTION */}
          <div className="col-md-8">

            {/* SEARCH + FILTER */}

            <div className="row mb-4">

              <div className="col-md-8 mb-2">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search jobs by title, company or skills..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>


              <div className="col-md-4">

                <select
                  className="form-select"
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value)
                  }
                >

                  <option value="All">
                    All Jobs
                  </option>

                  <option value="Full Time">
                    Full Time
                  </option>

                  <option value="Part Time">
                    Part Time
                  </option>

                  <option value="Internship">
                    Internship
                  </option>

                </select>

              </div>

            </div>


            {/* AVAILABLE JOBS */}

            <h4 className="mb-3">
              Available Jobs
            </h4>


            {loading ? (

              <div className="alert alert-info">
                Loading jobs...
              </div>

            ) : (jobs || []).length > 0 ? (

              <div className="row">

                {(jobs || []).map((job) => (

                  <div
                    className="col-md-6 mb-4"
                    key={job._id}
                  >

                    <JobCard
                      job={job}
                      onApply={handleApply}
                    />

                  </div>

                ))}

              </div>

            ) : (

              <div className="alert alert-warning">
                No jobs found.
              </div>

            )}


            {/* MY APPLICATIONS */}

            <div className="mt-4">

              <h4 className="mb-3">
                My Applications
              </h4>


              {applications.length === 0 ? (

                <div className="alert alert-info">
                  You have not applied for any jobs yet.
                </div>

              ) : (

                applications.map((application) => (

                  <div
                    className="card mb-2"
                    key={application._id}
                  >

                    <div className="card-body">

                      <h5>
                        {application.job?.title}
                      </h5>

                      <p className="mb-1">
                        {application.job?.company}
                      </p>

                      <p className="mb-1">
                        📍 {application.job?.location}
                      </p>

                      <span className="badge bg-success">
                        {application.status}
                      </span>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard