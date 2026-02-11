import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard';

export default function MovieList() {
  const { key, value } = useParams();
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  const getMovies = async () => {
    const { data } = await axios(`/api/movie/filtermovie/${key}/${value}`)
        setMovies([...data.data])
  }
  useEffect(() => {
    getMovies()
  }, [key, value])
  return (
    <div className='py-2 md:p-5 md:m-10 '>
      <div className='flex  w-full'>
        <h2 className='text-2xl font-medium'>All {value} Movies</h2>
      </div>

      <div className='flex gap-10  w-full flex-wrap  py-3 lg:gap-15 xl:gap-10 '>
        {
          movies.map((v, i) => {
            return (
              <MovieCard key={i} movie={v} />
            )
          })
        }
      </div>
    </div>
  )
} 