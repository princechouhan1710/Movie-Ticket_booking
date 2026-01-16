import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { moviecontext, theatrescontext } from '../App'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import ExGenre from './Explore Genre ';
import ExLAng from './Explore Language';
import Upcoming from './Upcoming_movie_inner';
import Upmovie from './Upcoming_movie_Home';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
function Ineer() {
  const { name } = useParams();
  const { Mov } = useContext(moviecontext);
  let { theatres } = useContext(theatrescontext);
  let [view, setView] = useState(false)
  let [movie, setMovie] = useState(null)
      let [show, setShow] = useState([])
  // const movie = Mov.find(m => m._id?.toString() === id);
  // let movie = Mov[id]

  let getMovie = async () => {

    try {
      let data = await fetch(`http://localhost:4000/api/movie/getmovie/${name}`);
      let res = await data.json();
      console.log("first", res)
        if (res.success) {
            setMovie({ ...res.data })
            getShow(res.data._id)
            // console.log(res.data)
        }
    } catch (error) {
      // console.log("third", error)
    }
  }

  useEffect(() => {
    getMovie();
  }, [name])
      let getShow = async (movieId) => {
        // console.log("movie",movieId)
        let data = await fetch("http://localhost:4000/api/show/getshow/" + movieId);
        let res = await data.json();
        if (res.success) {
            setShow([ ...res.data ])
            // console.log(res.data)
        }}
          // console.log(movie ,show)
  if (!movie) return <h2 className='text-2xl text-center p-10 font-bold'>Movie Not Found</h2>;
  const now = new Date();

  // console.log(movie)
  return (
    <>
      <div className="p-10 max-w-5xl mx-auto space-y-8">

        <div className="flex gap-6 p-5 bg-white rounded-xl shadow">
          
          <img
            src={movie?.poster?.url}
            alt=""
            className="w-28 h-40 object-cover rounded-lg shadow"
          />

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-3xl font-bold">{movie.name}</p>
              <p className="text-gray-500 text-sm mt-1">
                {movie.genre} | {movie?.langauage.join(",")} | {movie.length} hr
              </p>
            </div>

            <NavLink
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow text-center hover:bg-blue-700 transition "
              onClick={() => setView(true)}
            >
              View Details
            </NavLink>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 bg-gray-100 rounded-xl shadow-sm">
          <div className="text-amber-500 font-bold text-3xl bg-white rounded-xl px-4 py-2 shadow">
            A
          </div>

          <div>
            <p className="text-[14px] font-semibold">
              Movie suitable for adults (18+ Years) only
            </p>
            <p className="text-[14px] text-gray-600">
              Please carry your ID with birth date for verification.
            </p>
          </div>
        </div>

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

        <div className="flex gap-4">
          {["Filter", "After 10 PM", "Premium Seats"].map((b) => (
            <button
              key={b}
              className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-200 transition"
            >
              {b}
            </button>
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
 {console.log("thr",theatres,show)}
         {/* <div className="space-y-10 border h-50 w-100"> */}
           {/* {show?.map((v, i) => (
            
                <div>
                 
                    {
                        v?.theatre?.name
                    }
                     {
                        v.showDates?.map((date,index)=>(
                            <p> { new Date(date.date).getDate()}</p>
                        ))
                     }
                </div>
 
            ))} */}

 {show.map((v, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-5">
                  <img
                    src={v?.theatre?.image.url}
                    alt=""
                    className="w-14 h-14 rounded-full border shadow"
                  />
                  <div>
                    <p className="text-xl font-bold">{v?.theatre?.name} , {v?.theatre?.location} , {v?.theatre?.city}</p>
                    <p className="text-sm text-gray-500">Non-cancellable</p>
                  </div>
                </div>

                <p className="text-2xl cursor-pointer">🤍</p>
              </div>
            
              <div className=' flex gap-5 '>
  {
                        v.showTimings?.map((time,index)=>(
                           <div className='border border-gray-500  px-8 py-2 rounded ' >
                            {console.log(time)}
                  <p className='font-semibold'> { new Date(time.time).getHours()}:{ new Date(time.time).getMinutes()} PM</p>
                 
                  <p></p>
                </div>
                            
                        ))
                     }
               
              </div>
            
            </div>
          ))}

        {/*  {theatres.map((v, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-5">
                  <img
                    src={v.image.url}
                    alt=""
                    className="w-14 h-14 rounded-full border shadow"
                  />
                  <div>
                    <p className="text-xl font-bold">{v.name} , {v.location} , {v.city}</p>
                    <p className="text-sm text-gray-500">Non-cancellable</p>
                  </div>
                </div>

                <p className="text-2xl cursor-pointer">🤍</p>
              </div>

            
            </div>
          ))}*/}

        {/* </div>  */}
         

        <ExLAng />
        <ExGenre />
      </div>

      <Upmovie />



      <Dialog open={view} onClose={() => setView(false)} className="relative z-50 ">

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm " onClick={() => setView(false)} />

        <div className="fixed inset-0 flex justify-center items-start p-6  ">
          <DialogPanel
            className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="sticky top-0 bg-white z-10 pb-4">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">
                🎬 Movie Details
              </h2>

              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {movie.name}
              </h3>

              <div className="flex justify-between bg-gray-100 rounded-xl h-10 p-2 ">
                {["Reviews", "Synopsis", "Cast", "Video", "Posters"].map((tab) => (
                  <p
                    key={tab}
                    className="text-sm font-semibold text-gray-600 cursor-pointer hover:text-blue-600 transition px-2"
                  >
                    {tab}
                  </p>
                ))}
              </div>
            </div>


            <div className="overflow-y-auto mt-6 pr-2">


              <section className="mb-10">
                <h3 className="text-xl font-bold mb-4">⭐ Reviews</h3>

                <Swiper
                  slidesPerView={2}
                  spaceBetween={20}
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  className="w-full"
                >
                  {movie.reviews?.map((rev, index) => (
                    <SwiperSlide
                      key={index}
                      className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-gray-700">{rev.platform}</p>
                        <p className="text-yellow-500 font-semibold">⭐ {rev.rating}</p>
                      </div>
                      <p className="mt-3 text-gray-600 text-sm">{rev.review}</p>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <style>
                  {`
            .swiper-pagination {
              margin-top: 20px !important;
            }
          `}
                </style>
              </section>

              <section className="mb-10">
                <h3 className="text-xl font-bold mb-4">📌 Synopsis</h3>
                <div className="bg-gray-50 p-5 rounded-xl shadow-inner">
                  <p className="text-gray-700 leading-relaxed">{movie.description}</p>

                  <div className="mt-5  grid-cols-3 gap-4 text-sm text-gray-700 flex flex-col" >
                    <p><span className="font-bold">🎬 Category:</span> {movie?.category.join(",")}</p>
                    <p><span className="font-bold">🌐 Language:</span> {movie?.langauage.join(",")}</p>
                    <p><span className="font-bold">⭐ Rating:</span> {movie.rating}</p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h3 className="text-xl font-bold mb-4">🎭 Cast</h3>

                <div className="flex flex-wrap gap-6">
                  <p className='font-bold text-xl'>{movie?.castNames.join(" ")}</p>
                </div>
              </section>

              <section className="mb-10">
                <h3 className="text-xs font-bold mb-4">🎥 Trailer</h3>

                <div className="flex justify-center">
                  {/* <iframe
            width="560"
            height="315"
            src={movie.video}
            className="rounded-xl shadow-lg"
            allowFullScreen
          ></iframe> */}
                </div>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-bold mb-4">🖼 Posters & Wallpapers</h3>

                <img
                  src={movie.poster.url}
                  className="rounded-xl shadow-lg w-full object-cover"
                  alt=""
                />
              </section>
            </div>
          </DialogPanel>
        </div>
      </Dialog>


    </>
  );
}

export default Ineer;


