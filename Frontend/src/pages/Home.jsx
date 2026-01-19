import React from 'react'
import Content1 from '../components/HomeHeroSlider.jsx'

import Movie from '../components/Movie.jsx'
import Upmovie from '../components/Upcoming_movie_Home.jsx'
import Lang from '../components/ExploreLanguage.jsx'
import Genre from '../components/ExploreGenre .jsx'

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
