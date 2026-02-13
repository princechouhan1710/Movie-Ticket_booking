import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Seat from "../pages/Seat.jsx"
import Navbar from '../Layout/Navbar.jsx';

function BookingTicket() {
  const location = useLocation();
  const { movieId, movieName, theatre, moviePoster, movieGenre, movieLength, movieLang, time } = location.state || {};
  const [selectedTime, setSelectedTime] = useState(time?.time || null);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentTheatre, setCurrentTheatre] = useState(null);
  const [currentTheatreCity, setCurrentTheatreCity] = useState(null);
  const [currentTheatreLocation, setCurrentTheatreLocation] = useState(null);
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
}

export default BookingTicket;
