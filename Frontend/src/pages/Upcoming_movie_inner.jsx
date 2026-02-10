import { useContext, useEffect, useState } from 'react'
import { moviecontext } from '../App'
import MovieCard from '../components/MovieCard'
import axios from 'axios'
import Language from '../components/ExploreLanguage.jsx'
import Category from '../components/ExploreGenre .jsx'


function Upcoming() {
  const { Mov, setMovie } = useContext(moviecontext)

  const [upcomingmovies, setUpomingmovies] = useState([]);
  useEffect(() => {
    setUpomingmovies(Mov.filter(movie => movie.released === false))

  }, [Mov])
  const releasedmovies = Mov.filter(movie => movie.released !== false)
  const [filter, setfilter] = useState({ langauage: null, category: null })
  const FilterMovie = async () => {
    try {
      const { data } = await axios(`movie/filtermovie-query/?langauage=${filter.langauage}&category=${filter.category}`)
      const upcomingdOnly = data.data.filter(
        movie => movie.released === false
      );
      setUpomingmovies(upcomingdOnly)
    } catch (error) {
      console.log(error)

    }
  }
  useEffect(() => {
    FilterMovie()
  }, [filter])
  return (
    <>

      <div className='py-2 md:p-5 md:m-10  max-w-[1450px] 2xl:m-auto '>
        <div className='flex  w-full'>
          <h2 className='text-2xl font-medium'>Upcoming Movies</h2>
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
            upcomingmovies.map((v, i) => {
              return (
                <MovieCard movie={v} key={i} />
              )
            })
          }
        </div>
      </div>
      <div className='py-2 md:p-5 md:m-10 max-w-[1450px] 2xl:m-auto '>
        <div className='flex  w-full'>
          <h2 className='text-2xl font-medium'>Book your Favourite Movie</h2>
        </div>
        <div className='flex gap-10  w-full flex-wrap lg:gap-5  xl:gap-10 '>
          {
            releasedmovies.map((v, i) => {
              return (
                <MovieCard movie={v} key={i} />
              )
            })
          }
        </div>
        <Language/>
        <Category/>
        </div>

    </>
  )
}

export default Upcoming