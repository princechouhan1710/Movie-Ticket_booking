import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
 
export default function MovieList() {
    let { key, value } = useParams();
    let [movies, setMovies] = useState([])
    let navigate = useNavigate()
    let getMovies = async () => {
        let { data } = await axios(`/api/movie/filtermovie/${key}/${value}`)
        console.log(data)
        setMovies([...data.data])
    }
    useEffect(() => {
        getMovies()
    }, [key, value])
    return (
          <div className='py-2 md:p-5 md:m-10 '>
      <div className='flex justify-between w-full'>
                <h2 className='text-3xl font-bold'>All {value} Movies</h2>
                            </div>
           <div className=" flex overflow-x-scroll  gap-3 py-2 md:p-5 ">
        {["Filter", "English", "Hindi", "Romance", "Drama", "3D"].map((value, i) => (
          <button className=" px-3 py-2 md:px-4 md:py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition" key={i}>
            {value}
          </button>
        ))}
      </div>
 
      <div className='flex gap-10 justify-between w-full flex-wrap  py-3'>
                {
                    movies.map((v, i) => {
                        return (
              <div className='w-75 h-[450px] border  m-auto md:m-0 rounded-b-lg ' key={i} onClick={() => { navigate(`/movies/${v.encodeName}`); }}>
                                <img src={v.poster.url} alt="" className='w-full h-[85%] object-cover' />
                                <p className='px-5 font-bold text-xl py-1'>{v.name}</p>
                                <div className='flex items-center px-5 gap-2 text-gray-500 text-[14px]  font-bold'>
                                    <p className=''>{v.genre}</p>
                                    <span className="w-1.5 h-1.5 rounded-2xl bg-gray-500 "></span>
                                    <p>{v?.langauage.slice(0, 2).join(",")}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div> 
        </div>
    )
} 