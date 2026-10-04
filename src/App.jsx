import { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'

function App() {
  const [page, setPage] = useState(() => {
    const token = localStorage.getItem('token')

    return token ? 'dashboard' : 'login'
  })

  const handlePageChange = (nextPage) => {
    if (nextPage === 'dashboard') {
      const token = localStorage.getItem('token')

      if (!token) {
        setPage('login')
        return
      }
    }

    setPage(nextPage)
  }

  return (
    <div>
      {page === 'login' && (
        <LoginForm setPage={handlePageChange} />
      )}

      {page === 'register' && (
        <RegisterForm setPage={handlePageChange} />
      )}

      {page === 'dashboard' && (
        <Dashboard setPage={handlePageChange} />
      )}
    </div>
  )
}

export default App