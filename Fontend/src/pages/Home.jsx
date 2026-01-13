import React from 'react'
import Content1 from './Content1'

import Movie from './Movie.jsx'
import Upmovie from './Upcoming_movie_Home.jsx'
import Lang from './Explore Language.jsx'
import Genre from './Explore Genre .jsx'

function Home() {
  return (
    <div className=''>
      <Content1 />
      <Movie />
      <Upmovie />
      <Lang />
      <Genre />
    </div>
  )
}

export default Home
