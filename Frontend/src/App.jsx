import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Layout/Navbar.jsx'
import Footer from './Layout/Footer.jsx'
import Upcoming from './pages/Upcoming_movie_inner.jsx'
import Home from './pages/Home.jsx'
import Ineerpage from './pages/MovieDetailsPage.jsx'
import { BrowserRouter, Route, Router, Routes, useLocation } from 'react-router-dom'
import History from './pages/History.jsx'
import Contact from './pages/Contact.jsx'
import Condition from './pages/Terms&Condition.jsx'
import Frequently from './pages/FrequentlyAskedQuestion.jsx'
import Theaters from './pages/Theaters.jsx'
import MovieList from './pages/MovieList.jsx'
import AllTheaters from './pages/AllTheaters.jsx'
import LoginAdmin from './admin/loginAdmin.jsx'
import ProtectedRoute from './admin/ProtectedRoute.jsx'
import Dashboard from './admin/Dashboard.jsx'
import Dash from './admin/Dash.jsx'
import AddMovie from './admin/AddMovie.jsx'
import AddTheatres from './admin/AddTheatres.jsx'
import AllTheatres from './admin/AllTheatres.jsx'
import AllMovies from './admin/AllMovies.jsx'
import CreateShow from './admin/CreateShow.jsx'
export const theatrescontext = createContext();
export const moviecontext = createContext();

function App() {
  const location = useLocation();
  const [open, setOpen] = useState([])
  const [Mov, setMovie] = useState([]);
  const fetchMovies = async () => {
    const res = await fetch(" /api/movie/getmovies");
    const data = await res.json(); setMovie(data.data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  const [theatres, setTheatres] = useState([])
  const fetchTheatres = async () => {
    const res = await fetch("/api/theatres/gettheatres")
    const data = await res.json();
    setTheatres(data.data)
  };
  useEffect(() => {
    fetchTheatres();
  }, [])
  const pathname = location.pathname
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (<div>  <moviecontext.Provider value={{ Mov, setMovie }}>
    <theatrescontext.Provider value={{ theatres, setTheatres }}>
      {!["/loginadmin", "/dashboard","/dashboard/addmovie","/dashboard/addtheatre","/dashboard/allmovies","/dashboard/createshow","/dashboard/alltheatres"].includes(location.pathname) && <Navbar />}

      {/* {!location.pathname.includes("/Dashboard") && <Navbar />} */}
      <Routes>
        <Route path='/' element={<Home />}> </Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/movies/frequently-asked-questions' element={<Frequently />}></Route>
        <Route path='/movies/contact' element={<Contact />}></Route>
        <Route path='/movies/terms-and-condition' element={<Condition />}></Route>
        <Route path='/theatres' element={<AllTheaters />}></Route>
        <Route path='/UpComing' element={<Upcoming />}></Route>
        <Route path='/movies/:name' element={<Ineerpage />}></Route>
        <Route path='/theatre/list/:name' element={<Theaters />}></Route>
        <Route path='/movies/list/:key/:value' element={<MovieList />}></Route>
<Route path='/loginadmin' element={<LoginAdmin />}></Route>
        {/* dashboard routes */}
        <Route path='/Dashboard' element={<ProtectedRoute > <Dashboard /></ProtectedRoute>}>
          
          <Route index element={<Dash />}></Route>
          <Route path='addmovie' element={<AddMovie />}></Route>
          <Route path='addtheatre' element={<AddTheatres />}></Route>
          <Route path='alltheatres' element={<AllTheatres />}></Route>
          <Route path='allmovies' element={<AllMovies />}></Route>
          <Route path='createshow' element={<CreateShow />}></Route>
        </Route>
      </Routes>
      {/* {!["/dashboard", "/history", "/movies/frequently-asked-questions", "/movies/contact", "/movies/terms-and-condition"].includes(location.pathname) && <Footer />} */}

    </theatrescontext.Provider>
  </moviecontext.Provider>
  </div>
  )
}

export default App
