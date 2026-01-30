import React, { useContext, useEffect, useState } from 'react'
import { moviecontext } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Movie() {
  let { Mov, setMovie } = useContext(moviecontext)
  let navigate = useNavigate();
  const releasedmovies = Mov.filter(movie => movie.released !== false)
    const [filter, setfilter] = useState({ langauage: null, category: null })
  let FilterMovie = async () => {
    try {
      let { data } = await axios(`/api/movie/filtermovie-query/?langauage=${filter.langauage}&category=${filter.category}`)
      console.log(data)
      setMovie([...data.data])
    } catch (error) {
      console.log(error)
 
    }
  }
  console.log(filter)
  useEffect(() => {
    FilterMovie()
  }, [filter])
  return (
    <div className='py-2 md:p-5 md:m-10 '>
      <div className='flex  w-full'>
        <h2 className='text-3xl font-bold'>Now Showing</h2>
      </div>
      <div className=" flex overflow-x-scroll md:overflow-hidden gap-3 py-2 md:p-5 ">
        {/* {["Filter", "English", "Hindi", "Romance", "Drama", "3D"].map((value, i) => (
          <button className=" px-3 py-2 md:px-4 md:py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition" key={i}>
            {value}
          </button>
        ))} */}
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
      <div className='flex gap-10  w-full flex-wrap  py-3 lg:gap-15 xl:gap-10 '>
        {
          releasedmovies.map((v, i) => {
            return (
              <div className='w-75 h-[450px] border  m-auto md:m-0 rounded-b-lg lg:w-100  xl:w-75 ' key={i} onClick={() => { navigate(`/movies/${v.encodeName}`); }}>
                <img src={v.poster.url} alt="" className='w-full h-[85%] object-cover' />
                <p className='px-5 font-bold text-xl py-1'>{v.name}</p>
                <div className='flex items-center px-5 gap-2 text-gray-500 text-[14px]  font-bold'>
                  <p className=''>{v.genre}</p>
                  <span className="w-1.5 h-1.5 rounded-2xl bg-gray-500 "></span>
                  <p>{v?.langauage.join(",")}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Movie
