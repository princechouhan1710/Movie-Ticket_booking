import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TimeCard({ 
  time, 
  movieId, 
  movieName,
  theatre,
  moviePoster,
  movieGenre,
  movieLength,
  movieLang
}) {
  const [timePop, setTimePop] = useState(false)
  const [selected, setSelected] = useState(false) 
  const navigate = useNavigate()

  const handleClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to book tickets");
      return; 
    }

    setSelected(true);

   
    navigate(`/booking/${movieId}`, {
      state: {
        movieId,
        movieName,
        time,          
        theatre,
        moviePoster,
        movieGenre,
        movieLength,
        movieLang
      },
    });
  };

  return (
    <div
      className={`relative px-8 py-2 rounded-lg text-center cursor-pointer transition-all duration-300
  ${
    selected
      ? "bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-200 text-gray-900 shadow-2xl scale-105 ring-1 ring-purple-400"
      : "border border-gray-300 bg-white hover:bg-gradient-to-br hover:from-purple-100 hover:via-pink-50 hover:to-yellow-50 shadow-md"
  }
`}

      onMouseLeave={() => setTimePop(false)}
      onMouseEnter={() => setTimePop(true)}
      onClick={handleClick}
    >
      <p className="font-semibold text-sm">
        {new Date(time.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>

      <p className="text-xs mt-1">
        {new Date(time.time).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
      </p>

      {timePop && (
        <div className="absolute flex gap-2 bg-gray-200 z-10 -bottom-16 left-0 flex-col sm:flex-row rounded shadow-lg p-2">
          {time.seatCategories.map((v, i) => (
            <div className="px-3 py-1" key={i}>
              <p className="font-thin text-xs">{v.categoryName}</p>
              <p className="font-medium text-sm">₹{v.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
