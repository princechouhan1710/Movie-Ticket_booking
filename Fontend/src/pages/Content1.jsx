

import React, { createContext, useContext, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { moviecontext } from '../App';
import { useNavigate } from 'react-router-dom';


export default function Content1() {
  let { Mov, setMovie } = useContext(moviecontext)
  let navigate = useNavigate()
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper h-100 "
      >
        {Mov.map((v, i) => {
          return (
            <SwiperSlide className=' text-black w-50 h-150 shadow-2xl my-5 ' onClick={() => { navigate(`/movies/${v.encodeName}`); }}>
              <div className='flex  justify-between w-full h-full  gap-3'>
                <div className='flex flex-col justify-center text-center items-center w-[50%] gap-3'>

                  <h1 className='text-5xl'>{v.name}</h1>
                  <h2 className='text-2xl'>{v.genre}|{v.category}</h2>
                  <button class="bg-gray-800  shadow-2xl text-white font-bold py-2 px-4 rounded  hover:bg-gray-950 transition cursor-pointer">
                    Book me
                  </button>
                </div>
                <div className='w-[50%] text-center  p-1'>
                  <img src={v.poster.url} class=" w-[50%] mx-39 h-[90%] p-2 flex justify-end rounded-2xl object-cover " alt="..." />

                </div>
              </div>
            </SwiperSlide>
          )
        })}


      </Swiper>
    </>
  );
}

