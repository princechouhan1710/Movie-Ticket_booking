import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Seat from "../pages/Seat.jsx"
import Navbar from '../Layout/Navbar.jsx';

function BookingTicket() {
<<<<<<< HEAD
  const [selectedShow, setSelectedShow] = useState(null);
  const location = useLocation();

  const {
    movieId,
    movieName,
    theatre,
    duration,
    language,
    genre,
    poster,
    selectedDate,
    selectedTime
  } = location.state || {};

  const [activeDate, setActiveDate] = useState(null);

=======
  const location = useLocation();
  const { movieId, movieName, theatre, moviePoster, movieGenre, movieLength, movieLang, time } = location.state || {};
  const [selectedTime, setSelectedTime] = useState(time?.time || null);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentTheatre, setCurrentTheatre] = useState(null);
  const [currentTheatreCity, setCurrentTheatreCity] = useState(null);
  const [currentTheatreLocation, setCurrentTheatreLocation] = useState(null);
>>>>>>> a79176f88186b8693aa3c7a5661d8642a5de57ee
  const [show, setShow] = useState([]);

  const getShow = async (movieId) => {
    try {
      const res = await axios.get(
        `/api/show/getshow/${movieId}`
      );

      if (res.data.success) {
        setShow(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching show:", error);
    }
  };

  useEffect(() => {
    if (movieId) {
      getShow(movieId);
    }
  }, [movieId]);
<<<<<<< HEAD
  useEffect(() => {
    if (selectedDate) {
      setActiveDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!show.length || !selectedTime) return;

    show.forEach((s) => {
      if (s.theatre?._id === theatre?._id) {
        const matched = s.showTimings.find(
          (val) =>
            new Date(val.time).toISOString() ===
            new Date(selectedTime).toISOString()
        );

        if (matched) {
          setSelectedShow(matched);
        }
      }
    });
  }, [show, selectedTime, theatre]);


  return (
    <>
      <Navbar
        movieId={movieId}
        movieName={movieName}
        theatre={theatre} />


      <div className="min-h-screen bg-gray-100 p-6">



        <div className="space-y-6 ">

          {show
            .filter((s) => s.theatre?._id === theatre?._id)
            .map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Available Show Timings
                </h2>

                <div className="flex flex-wrap gap-4">
                  {value.showTimings
                    ?.filter((val) => {
                      if (!activeDate) return true;

                      return (
                        new Date(val.time).toDateString() ===
                        activeDate.toDateString()
                      );
                    })
                    .map((val, ind) => (
                      <div
                        key={ind}
                        onClick={() => setSelectedShow(val)}
                        className={`w-36 border rounded-xl p-4 text-center 
  transition-all duration-300 cursor-pointer shadow-md transform
  ${selectedShow?.time === val.time
                            ? "bg-linear-to-r from-gray-200 to-gray-300 text-white border-gray-800 shadow-xl scale-105 ring-2 ring-gray-400"
                            : "bg-linear-to-br from-gray-50 to-gray-100 text-gray-300 border-gray-300 hover:from-gray-200 hover:to-gray-300 hover:border-gray-500 hover:shadow-lg hover:scale-105"
                          }
`}



                      >
                        <p className="font-semibold text-gray-800">
                          {new Date(val.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(val.time).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    ))}
                </div>

              </div>
            ))}
        </div>

        <div className="mt-10">
          <Seat
            movieId={movieId}
            movieName={movieName}
            theatre={theatre}
            selectedDate={selectedShow?.time || null}
            selectedTime={selectedShow?.time || null}
            duration={duration}
            language={language}
            genre={genre}
            poster={poster}
          />





        </div>

      </div>
    </>
  );

=======
 useEffect(() => {
    if (setCurrentMovie) setCurrentMovie(movieName);
    if (setCurrentTheatre) setCurrentTheatre(theatre?.name);
    if (setCurrentTheatreLocation) setCurrentTheatreLocation(theatre?.location);
    if (setCurrentTheatreCity) setCurrentTheatreCity(theatre?.city);
  }, [movieName, theatre, setCurrentMovie, setCurrentTheatre,setCurrentTheatreLocation,setCurrentTheatreCity]);
  return (
    <>

      <Navbar movieName={currentMovie} theatreName={currentTheatre} movieId={movieId} theatreCity={currentTheatreCity} theatreLoacation={currentTheatreLocation}/>
    <div className="min-h-screen bg-gray-100 p-6">

      

      <div className="space-y-6">
        {show
          .filter((s) => s.theatre?._id === theatre?._id)
          .map((value, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Available Show Timings
              </h2>

              <div className="flex flex-wrap gap-4">
                {value.showTimings.map((val, ind) => (
                  <div
                    key={ind}
                    onClick={() => setSelectedTime(val.time)}
                 className={`w-36 border rounded-xl p-4 text-center cursor-pointer transition-all duration-300
  ${
    selectedTime === val.time
      ? "bg-linear-to-br from-purple-400 via-pink-400 to-red-400 text-white border-transparent shadow-lg scale-105"
      : "border-gray-200 hover:bg-linear-to-br hover:from-purple-100 hover:via-pink-100 hover:to-red-100 hover:border-gray-300"
  }`}

                  >
                    <p className="font-semibold text-gray-800">
                      {new Date(val.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(val.time).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {selectedTime && (
        <div className="mt-10">
          <Seat
            movieName={movieName}
            theatre={theatre}
            selectedTime={selectedTime}
            moviePoster={moviePoster}
            movieGenre={movieGenre}
            movieLength={movieLength}
            movieLang={movieLang}
          />
        </div>
      )}

    </div>
    </>
  );
>>>>>>> a79176f88186b8693aa3c7a5661d8642a5de57ee
}

export default BookingTicket;
