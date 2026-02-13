import React, { useContext, useEffect, useState } from 'react'
import { moviecontext } from '../App'
import MovieCard from './MovieCard.jsx';
import axios from 'axios';
import Btn from './Btn.jsx';

function Movie() {
  const { Mov, setMovie } = useContext(moviecontext)
  const [releasedmovies, setReleasedMovies] = useState([]);
  useEffect(() => {
    setReleasedMovies(Mov.filter(movie => movie.released !== false));
  }, [Mov]);
  const [filter, setfilter] = useState({ langauage: null, category: null })
  const FilterMovie = async () => {
    try {
      const { data } = await axios(`/api/movie/filtermovie-query/?langauage=${filter.langauage}&category=${filter.category}`)
      const releasedOnly = data.data.filter(
        movie => movie.released !== false
      );
      setReleasedMovies(releasedOnly)
    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  }
  useEffect(() => {
    if(filter.langauage || filter.category){
      FilterMovie()
    }
  }, [filter])
  console.log(filter)
  return (
    <div className='  '>
      <div className='flex  w-full'>
        <h2 className='text-2xl font-medium'>Now Showing</h2>
      </div>
      <div className=" flex overflow-x-scroll md:overflow-hidden gap-3 py-2 md:py-5 ">

        <button className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition ">
          Filter
        </button>
        <Btn name="English" setfilter={setfilter} filter={filter} lang={"English"} />
        <Btn name="Hindi" setfilter={setfilter} filter={filter} lang={"Hindi"} />
        <Btn name="Action" setfilter={setfilter} filter={filter} cat={"action"} />
        <Btn name="Biography" setfilter={setfilter} filter={filter} cat={"biography"} />
      </div>
      <div className='flex gap-10 justify-evenly  w-full flex-wrap lg:gap-5  xl:gap-10 '>
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
