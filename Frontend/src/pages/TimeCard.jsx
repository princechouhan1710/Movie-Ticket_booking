import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

//   return (
//     <div
//       className={`relative px-8 py-2 rounded-lg text-center cursor-pointer transition-all duration-300
//   ${
//     selected
//       ? "bg-linear-to-br from-purple-300 via-pink-200 to-yellow-200 text-gray-900 shadow-2xl scale-105 ring-1 ring-purple-400"
//       : "border border-gray-300 bg-white hover:bg-linear-to-br hover:from-purple-100 hover:via-pink-50 hover:to-yellow-50 shadow-md"
//   }
// `}

//       onMouseLeave={() => setTimePop(false)}
//       onMouseEnter={() => setTimePop(true)}
//       onClick={handleClick}
//     >
//       <p className="font-semibold text-sm">
//         {new Date(time.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//       </p>

//       <p className="text-xs mt-1">
//         {new Date(time.time).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
//       </p>

//       {timePop && (
//         <div className="absolute flex gap-2 bg-gray-200 z-10 -bottom-16 left-0 flex-col sm:flex-row rounded shadow-lg p-2">
//           {time.seatCategories.map((v, i) => (
//             <div className="px-3 py-1" key={i}>
//               <p className="font-thin text-xs">{v.categoryName}</p>
//               <p className="font-medium text-sm">₹{v.price}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )

