import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";

const languages = [
  "Hindi",
  "English",
  "Telugu",
  "Tamil",
  "Kannada",
  "Bengali",
  "Malayalam",
  "Bhojpuri",
  "Odia",
  "Marathi",
  "Punjabi",
];

function ExLang() {
  return (
    <div className="md:m-10">
      <h2 className="text-2xl font-bold p-3">
        Explore Latest Movies by Language
      </h2>
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay]}>
        {languages.map((lang) => (
          <SwiperSlide key={lang} className="w-auto!">
            <NavLink
              to={`/movies/list/langauage/${lang}`}
              className="flex items-center gap-2 border bg-gray-100 px-4 py-2 rounded-2xl
                         hover:bg-gray-200 hover:shadow transition font-medium whitespace-nowrap">
              🎧 {lang} Movies
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ExLang;