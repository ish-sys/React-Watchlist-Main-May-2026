import React from 'react';
import { Link } from 'react-router-dom';

function Landingpage() {
  return (
    <>
    <div className="container-fluid d-flex align-items-center justify-content-center text-center" style={{minHeight: '92vh',backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop")',backgroundSize: 'cover',backgroundPosition: 'center',backgroundAttachment: 'fixed'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-1 fw-bold text-white mb-3"> WATCHLIST <span className="text-danger">HUB</span></h1>
            <p className="lead text-light mb-5 fs-4">Discover, track, and share your cinematic journey with the world. Your movies, your history, all in one place.</p>

            <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
              <Link to="/hub" className="btn btn-danger btn-lg px-5 py-3 fw-bold shadow-lg">
                Show Watchlists
              </Link>
              
              <Link to="/register" className="btn btn-outline-light btn-lg px-5 py-3 shadow-lg">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Landingpage;