import React from 'react';

function DetailedView({ list, onClose, onUpdateRating }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isOwner = currentUser && currentUser.username === list?.userName;

  const handleRatingChange = (movieId, value, status) => {
    if (!isOwner) {
      alert("Only the creator can modify the watchlist they made.");
      return;
    }

    if (status !== "Watched") {
      alert("You can only rate shows that are marked as 'Watched'.");
      return;
    }

    const numValue = parseFloat(value);
    if (numValue < 0 || numValue > 5) {
      alert("The rating can be from 0 to 5 only.");
      return;
    }

    const formattedValue = Math.round(numValue * 100) / 100;
    onUpdateRating(list.id, movieId, formattedValue, status);
  };

  const handleStatusChange = (movieId, currentRating, newStatus) => {
    if (!isOwner) {
      alert("Only the creator can modify the watchlist they made.");
      return;
    }
    const finalRating = newStatus === "Unwatched" ? 0 : currentRating;
    onUpdateRating(list.id, movieId, finalRating, newStatus);
  };

  return (
    <>
    <div className="modal d-block bg-dark bg-opacity-75" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold">{list?.userName}'s Watchlist</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body py-4">
            <div className="row fw-bold mb-2 border-bottom pb-2">
              <div className="col-5">Movies & Shows</div>
              <div className="col-3 text-center">Status</div>
              <div className="col-4 text-center">{list?.userName}'s Rating</div>
            </div>

            <ul className="list-group list-group-flush">
              {list?.movies?.map((movie) => (
                <li key={movie.id} className="list-group-item d-flex align-items-center px-0">
                  <div className="col-5 fw-medium">{movie.title}</div>
                  
                  <div className="col-3">
                    <select 
                      className="form-select form-select-sm"
                      value={movie.status || "Unwatched"}
                      disabled={!isOwner}
                      onChange={(e) => handleStatusChange(movie.id, movie.rating, e.target.value)}
                    >
                      <option value="Unwatched">Unwatched</option>
                      <option value="Watched">Watched</option>
                    </select>
                  </div>

                  <div className="col-4 d-flex align-items-center justify-content-center">
                    <input 
                      type="number" 
                      step="0.01"
                      className="form-control form-control-sm w-50 me-1"
                      value={movie.rating || 0}
                      disabled={!isOwner || movie.status !== "Watched"}
                      onChange={(e) => handleRatingChange(movie.id, e.target.value, movie.status)}
                    />
                    <span className="text-muted">/ 5</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-footer border-0">
            <button 
              className={`btn w-100 fw-bold ${isOwner ? 'btn-danger' : 'btn-secondary opacity-50'}`} 
              onClick={() => isOwner ? window.location.href = "/create" : alert("Only the creator can modify the watchlist.")}
            >
              {isOwner ? 'Edit My Watchlist' : 'View Only Mode'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default DetailedView;