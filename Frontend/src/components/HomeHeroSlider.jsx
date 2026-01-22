import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { moviecontext } from "../App";
import { useNavigate } from "react-router-dom";

function Content1() {
  const { Mov } = useContext(moviecontext);
  const navigate = useNavigate();

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper" >
      {Mov.map((movie) => (
        <SwiperSlide
          key={movie.encodeName}
          onClick={() => navigate(`/movies/${movie.encodeName}`)}
          className="cursor-pointer">
          <div className="flex items-center justify-between max-w-6xl mx-auto px-8">
            <div className="w-1/2 text-center space-y-4">
              <h1 className="text-4xl font-bold">{movie.name}</h1>
              <h2 className="text-lg text-gray-600">
                {movie.genre} | {movie.category}
              </h2>
              <button className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-900 transition">
                Book Now
              </button>
            </div>
            <div className="w-1/2 flex justify-center">
              <img
                src={movie.poster.url}
                alt={movie.name}
                className="w-72 h-96 object-cover rounded-2xl shadow-xl"/>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Content1;