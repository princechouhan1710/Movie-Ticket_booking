import React, { useContext, useEffect, useState } from 'react'
import { moviecontext } from '../App'
import { useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard'


function AllMovie() {
  const { Mov, setMovie } = useContext(moviecontext)
  const navigate = useNavigate();

  const [upcomingmovies, setUpomingmovies] = useState([]);
  useEffect(() => {
    setUpomingmovies(Mov.filter(movie => movie.released === false))

  }, [Mov])
  const releasedmovies = Mov.filter(movie => movie.released !== false)

  return (
    <>
      <div className='py-2 md:p-5 md:m-10 max-w-[1450px] 2xl:m-auto '>
        <div className='flex  w-full'>
          <h2 className='text-2xl font-medium'>ALL Movies</h2>
        </div>
        <div className='flex gap-10  w-full flex-wrap lg:gap-5  xl:gap-10 '>
          {
            Mov.map((v, i) => {
              return (
                <MovieCard movie={v} key={i} />
              )
            })
          }
        </div>
        {/* <Lang/> */}
      </div>
    </>
  )
}

export default AllMovie
