import React, { useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";



const rows = 6;
const cols = 8;

const generateSeats = () => {
  let seats = [];

  for (let i = 0; i < rows; i++) {
    const rowLetter = String.fromCharCode(65 + i);

    for (let j = 1; j <= cols; j++) {
      const seatType = i < 2 ? "Platinum" : "Gold";
      const price = seatType === "Platinum" ? 400 : 250;

      seats.push({
        id: `${rowLetter}${j}`,
        type: seatType,
        price,
        status: Math.random() < 0.15 ? "occupied" : "available",
      });
    }
  }
  return seats;
};

const TheatreSeats = ({ movieName, theatre, selectedTime, moviePoster,movieGenre,movieLength,movieLang }) => {
 
  const navigate = useNavigate();
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    const updatedSeats = seats.map((seat) => {
      if (seat.id !== seatId) return seat;
      if (seat.status === "occupied") return seat;

      return {
        ...seat,
        status:
          seat.status === "selected" ? "available" : "selected",
      };
    });

    setSeats(updatedSeats);
    setSelectedSeats(
      updatedSeats.filter((seat) => seat.status === "selected")
    );
  };

  const platinumSeats = seats.filter((s) => s.type === "Platinum");
  const goldSeats = seats.filter((s) => s.type === "Gold");

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((acc, curr) => acc + curr.price, 0);
  }, [selectedSeats]);

  const renderSeats = (seatArray) => (
    <div className="grid grid-cols-8 gap-4 justify-center">
      {seatArray.map((seat) => (
        <div
          key={seat.id}
          onClick={() => handleSeatClick(seat.id)}
          className={`
            w-12 h-12 flex items-center justify-center 
            rounded-lg text-xs font-semibold 
            transition-all duration-300 transform
            ${
              seat.status === "available"
                ? seat.type === "Platinum"
                  ? "bg-linear-to-br from-purple-400 to-purple-600 hover:scale-110 shadow-lg"
                  : "bg-linear-to-br from-yellow-400 to-yellow-600 hover:scale-110 shadow-lg"
                : seat.status === "selected"
                ? "bg-green-500 scale-110 shadow-2xl ring-2 ring-white"
                : "bg-gray-600 cursor-not-allowed opacity-50"
            }
          `}
        >
          {seat.id}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center p-8 pb-40">

      <h1 className="text-4xl font-extrabold mb-8 tracking-wide text-center">
         Choose Your Seats
      </h1>

      <div className="w-full max-w-4xl mb-12">
        <div className="bg-linear-to-r from-gray-400 to-white h-6 rounded-t-full shadow-lg"></div>
        <p className="text-center text-gray-400 mt-2 tracking-widest">
          SCREEN
        </p>
      </div>

      <div className="mb-12 w-full max-w-4xl">
        <h2 className="text-lg font-bold mb-4 text-purple-400 tracking-wide">
           Platinum — ₹400
        </h2>
        {renderSeats(platinumSeats)}
      </div>

      <div className="mb-12 w-full max-w-4xl">
        <h2 className="text-lg font-bold mb-4 text-yellow-400 tracking-wide">
           Gold — ₹250
        </h2>
        {renderSeats(goldSeats)}
      </div>

      <div className="flex gap-8 flex-wrap justify-center text-sm mb-6">
        <Legend color="bg-purple-500" label="Platinum" />
        <Legend color="bg-yellow-500" label="Gold" />
        <Legend color="bg-green-500" label="Selected" />
        <Legend color="bg-gray-600" label="Occupied" />
      </div>

      <div className="fixed bottom-6 w-[95%] max-w-5xl 
                      bg-white/10 backdrop-blur-lg 
                      border border-white/20 
                      rounded-2xl px-8 py-4 
                      flex justify-between items-center shadow-2xl">

        <div>
          <p className="text-sm text-gray-300">
            Seats Selected:
            <span className="ml-2 font-bold text-white">
              {selectedSeats.length}
            </span>
          </p>

          <p className="text-sm text-gray-300 mt-1">
            {selectedSeats.length > 0
              ? selectedSeats.map((seat) => seat.id).join(", ")
              : "No seats selected"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl pr-2 mb-2 font-bold text-green-400">
            ₹{totalPrice}
          </p>

        <button
  disabled={selectedSeats.length === 0}
  onClick={() => {
    const bookingData = {
      movieName,
      theatreName: theatre?.name,
      theatreLocation: theatre?.location,
      theatreCity: theatre?.city,
      moviePoster,
      movieGenre,
      movieLength,
      movieLang,
      

      date: new Date(selectedTime).toLocaleDateString("en-IN"),
      time: new Date(selectedTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),

      seats: selectedSeats.map(seat => seat.id),
      category:
        selectedSeats.length > 0 ? selectedSeats[0].type : "",

      totalTickets: selectedSeats.length, 
      totalAmount: totalPrice ,
    };

    navigate("/payment", { state: bookingData
     });
  }}
  className={`mt-2 px-8 py-2 rounded-full font-semibold transition-all duration-300
    ${
      selectedSeats.length === 0
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600 hover:scale-105 shadow-lg"
    }
  `}
>
  Proceed →
</button>


        </div>
      </div>
    </div>
  );
};

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-4 h-4 ${color} rounded`}></div>
    <span>{label}</span>
  </div>
);

export default TheatreSeats; 