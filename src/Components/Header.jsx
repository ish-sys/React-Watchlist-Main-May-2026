import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const existingUser = localStorage.getItem("currentUser")
    if (existingUser) {
      setUser(JSON.parse(existingUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setUser(null)
    window.location= "/"
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <Link className="navbar-brand fw-bold fs-3" to="/">WATCHLIST <span className="text-danger">HUB</span></Link>
      
      <div className="ms-auto d-flex align-items-center">
        <Link to="/hub" className="nav-link text-white me-4">Public Hub</Link>
        
        {user ? (
          <div>
            <Link to="/create" className="nav-link text-white me-4">My Watchlist</Link>
            <span className="text-danger fw-bold me-3">Hi, {user.username}!</span>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login" className="btn btn-outline-light btn-sm me-2">Login</Link>
            <Link to="/register" className="btn btn-danger btn-sm">Register</Link>
          </div>
        )}
      </div>
    </nav>
    </>
  )
}

export default Header