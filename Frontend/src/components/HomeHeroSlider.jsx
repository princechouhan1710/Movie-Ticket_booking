import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { moviecontext } from "../App";
import { useNavigate } from "react-router-dom";

function Content1() {
  const { Mov } = useContext(moviecontext);
  const navigate = useNavigate();

  return (
    <Swiper
      spaceBetween={40}
      centeredSlides
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="w-full py-12 mt-15 "
    >
      {Mov.map((movie) => (
        <SwiperSlide
          key={movie.encodeName}
          onClick={() => navigate(`/movies/${movie.encodeName}`)}
          className="cursor-pointer "
        >
          <div className=" max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center m-10">
            
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                {movie.name}
              </h1>

              <p className="text-lg text-gray-500">
                {movie.genre} • {movie.category}
              </p>

              <button className="inline-block bg-black text-white font-semibold py-3 px-8 rounded-full hover:bg-gray-800 transition">
                🎟 Book Now
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src={movie.poster.url}
                alt={movie.name}
                className="w-[300px] md:w-[380px] h-[450px] object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Content1;
