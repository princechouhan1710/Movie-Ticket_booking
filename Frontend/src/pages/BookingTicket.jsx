import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Seat from "../pages/Seat.jsx"

function BookingTicket() {

  const location = useLocation();
  const { movieId, movieName, time ,theatre} = location.state || {};

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

  console.log(movieId);
  console.log(movieName);
  console.log(time);

  
   return (
  <div className="min-h-screen bg-gray-100 p-6">
    
    <div className="bg-white rounded-xl flex flex-col items-center w-fit m-auto shadow-md p-6 mb-6">
      <h1 className="text-2xl font-bold text-gray-800 ">
        {movieName}
      </h1>
      <p className="text-gray-500 mt-2">
        at {theatre?.name},{theatre?.location},{theatre?.city}
      </p>
    </div>

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
              {value.showTimings.map((val, ind) => (
                <div
                  key={ind}
                  className="w-36 border border-gray-200 rounded-xl p-4 text-center 
                             hover:bg-red-50 hover:border-red-400 
                             hover:shadow-lg transition-all duration-300 
                             cursor-pointer"
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
      <Seat />
    </div>

  </div>
);

}

export default BookingTicket;
