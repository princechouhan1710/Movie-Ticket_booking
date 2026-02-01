import React from 'react'
import Content1 from '../components/HomeHeroSlider.jsx'
import Movie from '../components/Movie.jsx'
import Upmovie from '../components/Upcoming_movie_Home.jsx'
import { categories, langauages } from '../assets/data.js'
import CategoryNavigator from '../components/CategoryNavigator.jsx'


function Home() {
  return (
    < >
      <Content1 />
      <div className='py-2 md:p-5 md:m-10 max-w-[1450px] 2xl:m-auto'>
        <Movie />
        <Upmovie />
        <CategoryNavigator category={"Genre"} redirecturl={"category"} data={categories} />
        <CategoryNavigator category={"langauage"} redirecturl={"langauage"} data={langauages} />
      </div>
    </>
  )
}

export default Home
