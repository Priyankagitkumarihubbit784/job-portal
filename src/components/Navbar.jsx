function Navbar({ setPage }) {
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('token')

    setPage('login')
  }

  return (
    <nav className="navbar navbar-dark">
      <div className="container">

        <span className="navbar-brand fw-bold">
          💼 JobHub
        </span>

        <div className="d-flex align-items-center gap-3">

          <span className="text-white d-none d-md-block">
            Find your next opportunity
          </span>

          <button
            className="btn btn-light"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  )
}

export default Navbar