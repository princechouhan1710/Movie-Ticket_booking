import React, { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { moviecontext } from "../App";
import { NavLink, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

function Upmovie() {
  const { Mov } = useContext(moviecontext);
  const navigate = useNavigate();
  const upcomingmovies = Mov.filter((movie) => movie.released === false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="mt-5">
      <div className="flex justify-between w-full items-center mb-4">
        <h2 className="text-2xl font-medium">UpComing Movies</h2>
        <NavLink
          to={"/UpComing"}
          className=" hidden px-3 py-1 rounded bg-amber-200 hover:bg-amber-300   sm:inline " >
          View all
        </NavLink>
      </div>
      <div className="relative">
        <button
          ref={prevRef}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-transparent shadow flex items-center justify-center text-7xl text-white cursor-pointer "
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          ref={nextRef}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-20 h-20 bg-transparent shadow flex items-center justify-center  text-7xl text-white cursor-pointer  "
          aria-label="Next"
        >
          ›
        </button>

        <Swiper
          slidesPerView="auto"
          spaceBetween={12}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}

          modules={[Navigation, Autoplay]}
          className="mySwiper" >
          {upcomingmovies.map((v, i) => (
            <SwiperSlide key={v.id ?? i} className="w-auto!">
              <MovieCard movie={v} key={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Upmovie;