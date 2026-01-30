import React, { useContext, useEffect, useState } from 'react'
import { moviecontext } from '../App'
import { useNavigate } from 'react-router-dom'


function AllMovie() {
  let { Mov, setMovie } = useContext(moviecontext)
  let navigate = useNavigate();

  return (
    <div className='py-2 md:p-5 md:m-10 '>
      <div className='flex  w-full'>
        <h2 className='text-3xl font-bold'>All Movies</h2>
      </div>
     
      <div className='flex gap-10  w-full flex-wrap  py-3 lg:gap-15 xl:gap-10 '>
        {
          Mov.map((v, i) => {
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

export default AllMovie
