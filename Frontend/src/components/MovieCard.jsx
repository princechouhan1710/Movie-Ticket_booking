import React from 'react'
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <div className={`w-75 h-[450px] border  border-gray-300   m-auto md:m-0 rounded-lg sm:w-73 lg:w-72  xl:w-75 overflow-hidden cursor-pointer ${!movie.released && 'border-b-0'}`} onClick={() => { navigate(`/movies/${movie.encodeName}`); }}>
      <div className="w-full h-[80%] object-cover relative">
        <img src={movie?.poster?.url} alt="" className='w-full h-full object-cover' />
        
        {!movie.released && <div className=" absolute bottom-2 left-2 bg-black/80 text-white text-xs p-2  rounded ">
          <p>Release Date</p>
          <p className="font-bold">{new Date(movie.releasedate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit", })}</p>
        </div>}
      </div>
      <p className='px-5 font-bold text-xl pt-3'>{movie.name}</p>
      <div className='flex items-center px-5 gap-2 text-gray-500 text-[14px]  pt-2 font-bold'>
        <p className=''>{movie.genre}</p>
        <span className="w-1.5 h-1.5 rounded-2xl bg-gray-500 "></span>
        <p className='text-sm'>{movie?.langauage.slice(0, 2).join(",")}</p>
      </div>
    </div>


  )
}

export default MovieCard
