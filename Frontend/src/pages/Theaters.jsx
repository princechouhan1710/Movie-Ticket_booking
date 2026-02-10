import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TimeCard from './TimeCard.jsx';
import Language from '../components/ExploreLanguage.jsx'
import Category from '../components/ExploreGenre .jsx'

function Theater() {
  const [theater, setTheater] = useState([])
  const { name } = useParams();
  const [loading, setLoading] = useState(true)
  const now = new Date();
  const gettheatres = async (name) => {
    try {
      const { data } = await axios.get(
        ` theatres/filterTheatre/${name}`
      );
      setTheater(data.data);
    } catch (err) {
      console.error("API ERROR:", err.response?.data || err.message);
    }
  };
  useEffect(() => {
    gettheatres(name);
  }, [name]);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1200);
  }, [name])
  return (
    <>
      {loading ? <div className='w-full h-screen flex items-center justify-center'>
        <div className="loader"></div>
      </div> :
          <div className="py-10 md:p-10 max-w-5xl mx-auto space-y-8">


            <div className="flex gap-6 py-5 px-2 md:p-5 bg-white rounded-xl shadow">            <div className='flex gap-3  ' >
              <img src={theater[0]?.theatre?.image?.url} alt=""                className="w-25 h-25 object-cover rounded-full shadow"
 />
              <div >
                <p className='text-2xl md:text-2xl font-bold '>{name},{theater[0]?.theatre?.location}  🤍 </p>
                <p className='text-gray-500 text-sm mt-1'>{theater[0]?.theatre?.screens}</p>
                <p className='  text-gray-500 text-sm mt-1'>{theater[0]?.theatre?.city}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <p className="text-gray-500 font-semibold px-3 py-1 rounded-full bg-gray-200">
                {now.toLocaleString("default", { month: "short" })}
              </p>
              {[0, 1, 2, 3].map((d) => (
                <div
                  key={d}
                  className="px-4 py-2 bg-gray-100 rounded-xl shadow text-center hover:bg-blue-100 cursor-pointer"
                >
                  <p className="text-xl font-bold">{now.getDate() + d}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-100 flex justify-start gap-8 px-6 py-3 rounded-xl shadow">
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-black rounded-full"></span> Available
              </p>
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span> Filling fast
              </p>
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span> Almost full
              </p>
            </div>
            {theater.map((v, i) => {
              return (
                <div className='flex flex-col gap-5' key={i}>
                  <div className="flex gap-6 p-5 bg-white rounded-xl shadow">
                    <img
                      src={v?.movie?.poster?.url}
                      alt=""
                      className="w-18 h-20 object-cover rounded-lg shadow"
                    />

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-2xl font-bold">{v?.movie?.name}</p>
                        <p className="text-gray-500 text-sm mt-1">
                          {v?.movie?.genre} | {v?.movie?.langauage.join(",")}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">{v?.movie?.category.join(",")}</p>
                      </div>
                    </div>

                  </div>
                  <div className='flex gap-5 '>
                    {
                      v.showTimings?.map((time, index) => (
                        <TimeCard key={index} time={time} />
                      ))
                    }
                  </div>
                </div>
              )
            })}
           <Language/>
        <Category/>
          </div>
        </div>}
    </>
  )
}

export default Theater