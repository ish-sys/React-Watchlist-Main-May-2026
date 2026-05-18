import React, { useState, useEffect } from 'react'
import { addWatchlistAPI, getAllWatchlistsAPI, updateWatchlistAPI, deleteWatchlistAPI } from '../services/allAPI'
import { Button } from 'react-bootstrap'

function Createwatchlist() {
  const [user, setUser] = useState(null)
  const [myList, setMyList] = useState(null)
  
  const [newMovie, setNewMovie] = useState({
    title: "",
    status: "Unwatched",
    rating: 0
  })

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (currentUser) {
      setUser(currentUser)
      fetchMyList(currentUser.username)
    }
  }, [])

  const fetchMyList = async (username) => {
    try {
      const result = await getAllWatchlistsAPI()
      const existingList = result.data.find(list => list.userName === username)
      if (existingList) setMyList(existingList)
    } catch (err) { console.log(err) }
  }

  const handleAddItem = async (e) => {
    e.preventDefault()
    if (!newMovie.title) return

    if (newMovie.status === "Watched") {
      if (newMovie.rating < 0 || newMovie.rating > 5) {
        alert("The rating can be from 0 to 5 only.")
        return
      }
    }

    const itemToAdd = { 
      id: Date.now(), 
      ...newMovie,
      rating: newMovie.status === "Unwatched" ? 0 : parseFloat(newMovie.rating) 
    }

    if (myList) {
      const updatedData = { ...myList, movies: [...myList.movies, itemToAdd] }
      await updateWatchlistAPI(myList.id, updatedData)
      setMyList(updatedData)
    } else {
      const newList = {
        userName: user.username,
        movies: [itemToAdd],
        description: `${user.username}'s Curated List`
      }
      const res = await addWatchlistAPI(newList)
      setMyList(res.data)
    }
    setNewMovie({ title: "", status: "Unwatched", rating: 0 })
  }

  const deleteItem = async (itemId) => {
    const updatedMovies = myList.movies.filter(item => item.id !== itemId)
    const updatedData = { ...myList, movies: updatedMovies }
    await updateWatchlistAPI(myList.id, updatedData)
    setMyList(updatedData)
  }

  const deleteEntireList = async () => {
    if (window.confirm("Are you sure? Deleted data cannot be retrieved.")) {
      await deleteWatchlistAPI(myList.id)
      setMyList(null)
    }
  }

  return (
    <>
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow p-4 border-0 mb-4 bg-light">
            <h2 className="fw-bold mb-4 text-center">Manage My Watchlist</h2>
            
            <form onSubmit={handleAddItem} className="row g-2 align-items-end mb-4">
              <div className="col-md-5">
                <label className="form-label small fw-bold">Movie/Show Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Inception, Breaking Bad..." 
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Status</label>
                <select 
                  className="form-select"
                  value={newMovie.status}
                  onChange={(e) => setNewMovie({...newMovie, status: e.target.value, rating: e.target.value === "Unwatched" ? 0 : newMovie.rating})}
                >
                  <option value="Unwatched">Unwatched</option>
                  <option value="Watched">Watched</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-bold">Rating (0-5)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="form-control"
                  disabled={newMovie.status === "Unwatched"}
                  value={newMovie.rating}
                  onChange={(e) => setNewMovie({...newMovie, rating: e.target.value})}
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-danger w-100 fw-bold">Add</button>
              </div>
            </form>

            <hr />

            {myList && myList.movies.length > 0 ? (
              <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Rating</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myList.movies.map((movie) => (
                      <tr key={movie.id}>
                        <td className="fw-bold">{movie.title}</td>
                        <td>
                          <span className={`badge ${movie.status === 'Watched' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {movie.status}
                          </span>
                        </td>
                        <td>{movie.status === "Watched" ? `${movie.rating}/5` : "N/A"}</td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(movie.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-center mt-4">
                   <Button onClick={deleteEntireList} variant="danger" className="px-4 shadow-sm">
                     Delete Entire Watchlist
                   </Button>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted py-5">Your watchlist is empty. Add your first show above!</p>
            )}
          </div>
          
          <div className="text-center">
             <button className="btn btn-dark btn-sm" onClick={() => window.location.href='/hub'}>
                Go to Watchlist Hub
             </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Createwatchlist