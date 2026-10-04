import { useState } from 'react'

function RegisterForm({ setPage }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors({})
    setSuccess('')
    setServerError('')

    const newErrors = {}

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password =
        'Password must be at least 6 characters'
    }

    // Confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword =
        'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        'https://job-portal-cmf6.onrender.com/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setServerError(
          data.message || 'Registration failed'
        )
        return
      }

      setSuccess(
        'Registration successful! Redirecting to login...'
      )

      // Clear form
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')

      // Go to login
      setTimeout(() => {
        setPage('login')
      }, 1000)

    } catch (error) {
      console.error(error)

      setServerError(
        'Unable to connect to the server. Please make sure the backend is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Create Account
              </h2>

              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}

              {serverError && (
                <div className="alert alert-danger">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? 'is-invalid' : ''
                    }`}
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your name"
                  />

                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                  />

                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter password"
                  />

                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword
                        ? 'is-invalid'
                        : ''
                    }`}
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm password"
                  />

                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading
                    ? 'Creating Account...'
                    : 'Register'}
                </button>

              </form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Already have an account?
                </p>

                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setPage('login')}
                >
                  Login
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RegisterForm