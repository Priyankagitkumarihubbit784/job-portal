import { useState } from 'react'

function LoginForm({ setPage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        'https://job-portal-cmf6.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.trim(),
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed')
        return
      }

      // Store JWT token
      localStorage.setItem('token', data.token)

      // Store logged-in user
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify(data.user)
      )

      setSuccess('Login successful! Welcome back.')

      setTimeout(() => {
        setPage('dashboard')
      }, 800)

    } catch (error) {
      console.error(error)

      setError(
        'Unable to connect to the server. Please make sure the backend is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Login
              </h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading
                    ? 'Logging in...'
                    : 'Login'}
                </button>

              </form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Don't have an account?
                </p>

                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setPage('register')}
                >
                  Create Account
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginForm