import React, { useContext, useEffect, useState } from 'react'
import { moviecontext } from '../App'
import MovieCard from './MovieCard.jsx';
import axios from 'axios';

function Movie() {
  let { Mov, setMovie } = useContext(moviecontext)
const [releasedmovies, setReleasedMovies] = useState([]);
useEffect(() => {
  setReleasedMovies(Mov.filter(movie => movie.released !== false));
}, [Mov]);
    const [filter, setfilter] = useState({ langauage: null, category: null })
  let FilterMovie = async () => {
    try {
      let { data } = await axios(`/api/movie/filtermovie-query/?langauage=${filter.langauage}&category=${filter.category}`)
      console.log(data)      
    const releasedOnly = data.data.filter(
      movie => movie.released !== false
    );
      setReleasedMovies(releasedOnly)
    } catch (error) {
      console.log(error)
 
    }
  }
  console.log(filter)
  useEffect(() => {
    FilterMovie()
  }, [filter])
  return (
    <div className='  '>
      <div className='flex  w-full'>
        <h2 className='text-2xl font-medium'>Now Showing</h2>
      </div>
      <div className=" flex overflow-x-scroll md:overflow-hidden gap-3 py-2 md:p-5 ">
        
        <button className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Filter
        </button>
 
        <button onClick={() => {
          setfilter({ ...filter, langauage: "English" })
 
        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          English
        </button>
 
        <button onClick={() => {
          setfilter({ ...filter, langauage: "Hindi" })
 
        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Hindi
        </button>
 
        <button onClick={() => {
          setfilter({ ...filter, category: "action" })
 
        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Action
        </button>
 
        <button onClick={() => {
          setfilter({ ...filter, category: "biography" })
 
        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Biography
        </button>
 
        <button className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          3D
        </button>
      </div>
       <div className='flex gap-10  w-full flex-wrap lg:gap-5  xl:gap-10 '>
          {
          releasedmovies.map((v, i) => {
            return (
              <MovieCard key={i} movie={v} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Movie
