import React from "react";
import { useLocation } from "react-router-dom";
function Payment() {
   
  const location = useLocation();
  const data = location.state;
  if (!data) {
    return (
      <div className="text-center mt-20 text-xl">
        No booking data received
      </div>
    );
  }
  {console.log(data)}

  const taxes = 20;
  const totalPayable = data.totalAmount + taxes;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="w-[90%] max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-6">
          
          <div className="flex gap-6 bg-white rounded-2xl shadow-md p-6">
            <img
              src={data.moviePoster}
              alt="movie"
              className="w-28 h-40 object-cover rounded-lg shadow"
            />

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-2xl font-bold">{data.movieName}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {data.theatreName}, {data.theatreLocation}, {data.theatreCity}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {data.movieLength} | {data.movieLang}
                </p>
              </div>

              <div className="text-green-600 font-semibold text-sm">
                {data.movieGenre}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b pb-3">
              Booking Details
            </h2>

            <div className="flex justify-between text-gray-600">
              <p>Date</p>
              <p className="font-medium text-black">{data.date}</p>
            </div>

            <div className="flex justify-between text-gray-600">
              <p>Time</p>
              <p className="font-medium text-black">{data.time}</p>
            </div>

            <div className="flex justify-between text-gray-600">
              <p>Seats</p>
              <p className="font-medium text-black">
                {data.seats.join(", ")}
              </p>
            </div>

            <div className="flex justify-between text-gray-600">
              <p>Tickets</p>
              <p className="font-medium text-black">{data.totalTickets}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
          
          <h2 className="text-xl font-semibold mb-6">
            Payment Summary
          </h2>

          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <p>Order Amount</p>
              <p>{data.totalAmount}</p>
            </div>

            <div className="flex justify-between">
              <p>Taxes & Fees</p>
              <p>{taxes}</p>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg text-black">
              <p>Total Payable</p>
              <p>₹{totalPayable}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3 flex justify-between">
              Your Details
              <span className="text-sm text-blue-600 cursor-pointer">
                Edit
              </span>
            </h2>

            <div className="text-gray-600 text-sm space-y-1">
              <p> +91 9876543210</p>
              <p> Indore, India</p>
            </div>
          </div>

          <button className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg">
            Proceed to Pay ₹{totalPayable}
          </button>

          <p className="text-xs text-gray-400 mt-4 text-center">
            By proceeding, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;



// import React from "react";
// import { useLocation } from "react-router-dom";

// function Payment() {
//   const location = useLocation();
//   const data = location.state;

//   if (!data) {
//     return (
//       <div className="text-center mt-20 text-xl">
//         No booking data received
//       </div>
//     );
//   }

//   const taxes = 120;
//   const totalPayable = data.totalAmount + taxes;

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="w-[90%] max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">

//         {/* Movie Section */}
//         <div className="flex gap-6 mb-6">
//           <img
//             src={data.movieImage}
//             alt="movie"
//             className="w-28 h-40 rounded-lg shadow"
//           />

//           <div>
//             <h2 className="text-2xl font-bold">
//               {data.movieName}
//             </h2>
//             <p className="text-gray-500 mt-1">
//               {data.theatreName}, {data.theatreLocation}, {data.theatreCity}
//             </p>
//             <p className="text-gray-500 mt-1">
//               {data.date} | {data.time}
//             </p>
//           </div>
//         </div>

//         {/* Booking Details */}
//         <div className="space-y-3 mb-6">
//           <p><strong>Seats:</strong> {data.seats.join(", ")}</p>
//           <p><strong>Total Tickets:</strong> {data.totalTickets}</p>
//         </div>

//         {/* Payment Summary */}
//         <div className="border-t pt-4 space-y-2">
//           <div className="flex justify-between">
//             <span>Order Amount</span>
//             <span>₹{data.totalAmount}</span>
//           </div>

//           <div className="flex justify-between">
//             <span>Taxes & Fees</span>
//             <span>₹{taxes}</span>
//           </div>

//           <div className="flex justify-between font-bold text-lg">
//             <span>Total Payable</span>
//             <span>₹{totalPayable}</span>
//           </div>
//         </div>

//         <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold">
//           Proceed to Pay ₹{totalPayable}
//         </button>

//       </div>
//     </div>
//   );
// }

// export default Payment;

