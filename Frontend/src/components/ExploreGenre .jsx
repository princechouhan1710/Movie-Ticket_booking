import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import {Autoplay } from 'swiper/modules';
import { NavLink } from 'react-router-dom';

const genre = [
  { genre: 'Comedy' },
  { genre: 'Action' },
  { genre: 'Drama' },
  { genre: 'Sci-Fi' },
  { genre: 'Romance' },
  { genre: 'Horror' },
  { genre: 'Thriller' },
  { genre: 'Crime' },
  { genre: 'Mystery' },
  { genre: 'Biography' },
  { genre: 'Adventure' },
  { genre: 'Animation' },
  { genre: 'Family' }
];
function ExGenre() {
  return (
    <div className='m-10'>

      <h2 className='text-2xl font-bold  p-3'>Explore Latest Movies by Genre</h2>


      <Swiper
        slidesPerView={'auto'}
        spaceBetween={12}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
           modules={[Autoplay]}
        className="mySwiper genre-swiper                    "
      >
        {genre.map((v, i) => (
          <SwiperSlide key={i} className="w-auto! ">
            <NavLink to={`/movies/list/${"category"}/${v.genre}`} className="flex items-center gap-2 border bg-gray-100 px-4 py-2 rounded-2xl 
hover:bg-gray-200 hover:shadow transition font-medium">
              🎬 {v.genre} Movies
            </NavLink>


          </SwiperSlide>
        ))}
      </Swiper>

    </div>

  )

}

export default ExGenre
