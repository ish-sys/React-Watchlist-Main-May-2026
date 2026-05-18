import React from 'react'
import { Link } from 'react-router-dom'

function PnF() {
  return (
    <>
    <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '80vh' }}>
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-4">Oops! Page Not Found</h2>
      <p className="text-muted mb-4 fs-5">
        The cinematic journey you're looking for doesn't exist or has been moved.
      </p>
      <div className="mb-5">
        <span style={{ fontSize: '5rem' }}>🍿</span>
      </div>
      <Link to="/" className="btn btn-dark btn-lg px-5 shadow">
        Back to Home
      </Link>
    </div>
    </>
  )
}

export default PnF