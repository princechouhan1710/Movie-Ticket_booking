import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { moviecontext } from "../App";
import { useNavigate } from "react-router-dom";

function Content1() {
  const { Mov } = useContext(moviecontext);
  const navigate = useNavigate();

  return (

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
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper sm:h-100 w-full max-w-[1450px] 2xl:m-auto "
    >
      {Mov.map((v, i) => {
        return (
          <SwiperSlide className=' text-black w-50 h-150 shadow-2xl my-5 py-5 sm:p-0 ' onClick={() => { navigate(`/movies/${v.encodeName}`); }}>
            <div className='flex flex-col-reverse sm:flex-row  justify-between w-full h-full gap-3  '>
              <div className='flex flex-col justify-center text-center items-center w-full sm:w-[50%] gap-3'>
                <h1 className='text-3xl m-auto sm:m-0 sm:text-2xl md:text-3xl font-bold'>{v.name}</h1>
                <h2 className='text-xl md:text-2xl font-bold'>{v.genre}|{v.category}</h2>
                <button className="bg-gray-800  shadow-2xl text-white font-bold py-2 px-4 rounded  hover:bg-gray-950 transition cursor-pointer">
                  Book me
                </button>
              </div>
              <div className='w-full sm:w-[50%] text-center  sm:p-1 '>
                <img src={v.poster.url} className="w-[80%] h-full m-auto sm:w-[70%]  xl:w-[50%]  sm:h-[90%] sm:p-2 sm:flex sm:justify-end rounded-2xl object-cover " alt="..." />
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
}

export default Content1;
