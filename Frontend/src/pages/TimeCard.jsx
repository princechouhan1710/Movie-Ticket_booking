import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function TimeCard({ time,
  selectedDate,
  movieId,
  movieName,
  theatre,
  duration,
  language,
  genre,
  poster }) {
  const [timePop, setTimePop] = useState(false)
  const navigate = useNavigate()
  const handleBooking = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to your account first!");
      return;
    }

    navigate(`/booking/${movieId}`, {
      state: {
        movieId,
        movieName,
        theatre,
        duration,
        language,
        genre,
        poster,
        selectedDate,
        selectedTime: time.time,
      },
    });
  };

  return (
    <div className='border relative border-gray-500  px-8 py-2 rounded cursor-pointer ' onMouseLeave={() => { setTimePop(false) }} onMouseEnter={(e) => {
      e.preventDefault();
      setTimePop(true)
    }}
      onClick={handleBooking} >
      <p className='font-semibold'> {new Date(time.time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
      {timePop && <div className='absolute flex gap-2 bg-gray-200 z-10 bottom-11 left-5 sm:-left-5 flex-col sm:flex-row cursor-pointer'>
        {time.seatCategories.map((v, i) => {
          return <div


            className="top-11 px-3 py-2"
            key={i}
          >
            <p className=' font-thin'>{v.categoryName}</p>
            <p className=' font-medium'> ₹{v.price}</p>
          </div>
        })}
      </div>}
    </div>
  )
}

