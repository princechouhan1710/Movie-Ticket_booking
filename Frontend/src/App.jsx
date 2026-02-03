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

      <Navbar />
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
      </Routes>
      {!location.pathname.includes("/history"  ) && <Footer />}

    </theatrescontext.Provider>
  </moviecontext.Provider>
  </div>
  )
}

export default App
