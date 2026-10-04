function JobCard({ job, onApply }) {
  return (
    <div className="card shadow-sm h-100">

      <div className="card-body d-flex flex-column">

        <div className="d-flex justify-content-between align-items-start mb-2">

          <div>
            <h5 className="card-title mb-1">
              {job.title}
            </h5>

            <h6 className="card-subtitle">
              {job.company}
            </h6>
          </div>

          <span className="badge bg-primary">
            {job.type}
          </span>

        </div>

        <hr />

        <p className="mb-2">
          📍 <strong>Location:</strong> {job.location}
        </p>

        <p className="mb-2">
          💰 <strong>Salary:</strong> {job.salary}
        </p>

        <p className="mb-4">
          🛠️ <strong>Skills:</strong> {job.skills}
        </p>

        <button
          className="btn btn-outline-primary w-100 mt-auto"
          onClick={() => onApply(job)}
        >
          Apply Now →
        </button>

      </div>

    </div>
  )
}

export default JobCard