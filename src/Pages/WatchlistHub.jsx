import React, { useState, useEffect } from 'react'
import { getAllWatchlistsAPI, updateWatchlistAPI } from '../services/allAPI'
import DetailedView from '../Components/DetailedView';


function WatchlistHub() {
  const [allLists, setAllLists] = useState([])
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    fetchLists()
  }, [])

  const fetchLists = async () => {
    try {
      const result = await getAllWatchlistsAPI()
      if (result.status >= 200 && result.status < 300) {
        setAllLists(result.data)
      }
    } catch (err) { 
      console.log(err) 
    }
  }

  const closeModal = () => setSelectedList(null);

const updateRating = async (listId, movieId, newRating, newStatus) => {
    const listToUpdate = allLists.find(list => list.id === listId);
    const updatedMovies = listToUpdate.movies.map(movie => 
      movie.id === movieId ? { ...movie, rating: newRating, status: newStatus } : movie
    );
    
    const updatedList = { ...listToUpdate, movies: updatedMovies };
    
    try {
      const result = await updateWatchlistAPI(listId, updatedList);
      if (result.status >= 200 && result.status < 300) {
        setAllLists(allLists.map(l => l.id === listId ? updatedList : l));
        setSelectedList(updatedList);
      }
    } catch (err) {
      console.error("update failed", err);
    }
  };

  return (
    <>
      <div className="container py-5 text-center" style={{ minHeight: '80vh' }}>
        <h1 className="fw-bold mb-5 display-4">Watchlist Hub</h1>

        <div className="row g-4 justify-content-center">
          {allLists.length > 0 ? (
            allLists.map((list) => (
              <div className="col-md-4" key={list.id}>
                <div className="card h-100 shadow-sm border-0 bg-dark text-white p-3">
                  <h3>🎬</h3>
                  <h5 className="fw-bold">{list.userName}'s List</h5>
                  <p className="text-secondary">{list.movies?.length || 0} Items</p>
                  <button 
                    className="btn btn-outline-light w-100 mt-3 py-2" 
                    onClick={() => setSelectedList(list)} 
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-lg-8 mt-5">
              <div className="py-5 border border-2 border-dashed rounded-5 bg-light">
                <h2 className="text-dark fw-bold mb-3">No watchlists found yet!</h2>
                <p className="text-muted fs-5 mb-0">
                  Be the first to create a public watchlist for others to see.
                </p>
                <div className="mt-4 opacity-50">
                  <span className="display-1">📂</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedList && (
        <DetailedView
          list={selectedList}
          onClose={closeModal}
          onUpdateRating={updateRating}
        />
      )}
    </>
  )
}

export default WatchlistHub