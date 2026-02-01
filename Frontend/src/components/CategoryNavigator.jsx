import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from "swiper/modules";
import { NavLink } from 'react-router-dom';

function CategoryNavigator({ category, redirecturl, data }) {
  return (
    <div className="md:m-10">
      <h2 className="text-2xl font-bold p-3">
        Explore Latest Movies in Indore by {category}</h2>
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay]}>
        {data.map((v, i) => (
          <SwiperSlide key={i} className="w-auto!">
            <NavLink to={`/movies/list/${redirecturl}/${v.lan}`}
              className="flex items-center gap-2 border bg-gray-100 px-4 py-2 rounded-2xl
                         hover:bg-gray-200 hover:shadow transition font-medium whitespace-nowrap">
              {v.lan} Movies
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CategoryNavigator
