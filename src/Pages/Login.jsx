import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsersAPI } from '../Services/allAPI'

function Login() {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await getUsersAPI()
      if (result.status >= 200 && result.status < 300) {
        const user = result.data.find(
          (users) => users.username === loginData.username && users.password === loginData.password
        )

        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user))
          setIsLoggedIn(true)
        } else {
          alert("Invalid credentials!")
        }
      }
    } catch (err) {
      alert("Server error")
    }
  }

  return (
    <>
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '15px' }}>
        {isLoggedIn ? (
          <div className="text-center py-4">
            <h2 className="text-success fw-bold">Login Successful!</h2>
            <p className="text-muted">Welcome to your dashboard.</p>
            <Link to="/create" className="btn btn-danger w-100 fw-bold py-2 mt-3">
              Go to My Watchlist
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-center fw-bold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input placeholder='Username' type="text" className="form-control" required
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input placeholder='Password' type="password" className="form-control" required
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
              </div>
              <button type="submit" className="btn btn-danger w-100 py-2 fw-bold shadow-sm">Login</button>
            </form>
            <p className="text-center mt-3 small">
              New here? <Link to="/register" className="text-danger fw-bold">Register</Link>
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Login