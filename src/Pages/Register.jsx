import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsersAPI, registerUserAPI } from '../services/allAPI' 

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const [isRegistered, setIsRegistered] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()

    try{
      const people = await getUsersAPI()

      if(people.status>=200&&people.status<300){
        const notunique=people.data.find(user=>(user.username==formData.username))
        if(notunique){
          alert("This username is already taken. Use another username")
          return
        }
      }
      else{
        alert("Unable to fetch users from the server. Check if your server is running")
        return
      }
    }catch(err){
      console.log(err)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match! Please check again.")
      return
    }

    const newUser = {
      username: formData.username,
      password: formData.password
    }

    try {
      const result = await registerUserAPI(newUser)

      if (result.status >= 200 && result.status < 300) {
        setIsRegistered(true)
      } else {
        alert("Registration failed.")
      }
    } catch (err) {
      console.log(err)
      alert("Server is not responding.")
    }
  }

  return (
    <>
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}>
        
        {isRegistered ? (
          <div className="text-center py-4">
            <h2 className="text-success fw-bold">Success! 🎉</h2>
            <p className="text-muted">Your account is ready.</p>
            <Link to="/login" className="btn btn-danger w-100 fw-bold py-2 mt-3">
              Proceed to Login
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-center fw-bold mb-4">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter username"
                  required
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter password"
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Confirm Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Re-enter password"
                  required
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>

              <button type="submit" className="btn btn-danger w-100 py-2 fw-bold shadow-sm">
                Register Now
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="small mb-0 text-muted">
                Already have an account? <Link to="/login" className="text-danger text-decoration-none fw-bold">Login</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Register