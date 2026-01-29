import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";

const genres = [
  "Comedy",
  "Action",
  "Drama",
  "Sci-Fi",
  "Romance",
  "Horror",
  "Thriller",
  "Crime",
  "Mystery",
  "Biography",
  "Adventure",
  "Animation",
  "Family",
];

function ExGenre() {
  return (
    <div className="md:m-10">
      <h2 className="text-2xl font-bold p-3">
        Explore Latest Movies by Genre
      </h2>
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay]} >
        {genres.map((genre) => (
          <SwiperSlide key={genre} className="w-auto!">
            <NavLink
              to={`/movies/list/category/${genre}`}
              className="flex items-center gap-2 border bg-gray-100 px-4 py-2 rounded-2xl
                         hover:bg-gray-200 hover:shadow transition font-medium whitespace-nowrap"            >
              🎬 {genre} Movies
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ExGenre;
