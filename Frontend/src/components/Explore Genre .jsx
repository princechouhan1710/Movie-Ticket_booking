import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

const lang = [
  { lan: 'Comedy' },
  { lan: 'Action' },
  { lan: 'Drama' },
  { lan: 'Romance' },
  { lan: 'Horror' },
  { lan: 'Thriller' },
  { lan: 'Crime' },
  { lan: 'Mystery' },
  { lan: 'Biography' },
  { lan: 'Adventure' },
  { lan: 'Animation' },
  { lan: 'Family' }
];
function ExGenre() {
  return (
    <div className='m-10'>

      <h2 className='text-2xl font-bold  p-3'>Explore Latest Movies in Indore by Genre</h2>


      <Swiper
        slidesPerView={'auto'}
        spaceBetween={12}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper genre-swiper                    "
      >
        {lang.map((v, i) => (
          <SwiperSlide key={i} className="!w-auto ">
            <button className="flex items-center gap-2 border bg-gray-100 px-4 py-2 rounded-2xl 
hover:bg-gray-200 hover:shadow transition font-medium">
              🎬 {v.lan} Movies
            </button>


          </SwiperSlide>
        ))}
      </Swiper>

    </div>

  )

}

export default ExGenre
