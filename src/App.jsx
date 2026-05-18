
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Landingpage from './Pages/Landingpage'
import Register from './Pages/Register'
import Login from './Pages/Login'
import WatchlistHub from './Pages/WatchlistHub'
import Createwatchlist from './Pages/Createwatchlist'
import PnF from './Pages/PnF'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='' element={<Landingpage/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='hub' element={<WatchlistHub/>}/>
        <Route path='create' element={<Createwatchlist/>}/>
        <Route path='/*' element={<PnF/>}/>
      </Routes>
    </>
  )
}

export default App
