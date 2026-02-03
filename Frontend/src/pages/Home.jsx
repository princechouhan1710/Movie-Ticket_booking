import React from 'react'
import Content1 from '../components/HomeHeroSlider.jsx'
import Movie from '../components/Movie.jsx'
import Upmovie from '../components/Upcoming_movie_Home.jsx'
import Language from '../components/ExploreLanguage.jsx'
import Category from '../components/ExploreGenre .jsx'


function Home() {
  return (
    < >
      <Content1 />
      <div className='py-2 md:p-5 md:m-10 max-w-[1450px] 2xl:m-auto'>
        <Movie />
        <Upmovie />
        <Language/>
        <Category/>
      </div>
    </>
  )
}

export default Home
