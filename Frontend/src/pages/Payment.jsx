import React from "react";

function Payment() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="w-[90%] max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-6">
          
          <div className="flex gap-6 bg-white rounded-2xl shadow-md p-6">
            <img
              src="https://via.placeholder.com/150"
              alt="movie"
              className="w-28 h-40 object-cover rounded-lg shadow"
            />

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-2xl font-bold">Movie Name</p>
                <p className="text-gray-500 text-sm mt-1">
                  Hindi, English
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  2h 30m | Action, Drama
                </p>
              </div>

              <div className="text-green-600 font-semibold text-sm">
                UA 13+
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b pb-3">
              Booking Details
            </h2>

            <div className="flex justify-between text-gray-600">
              <p>Date</p>
              <p className="font-medium text-black">12 Feb 2026</p>
            </div>

            <div className="flex justify-between text-gray-600">
              <p>Time</p>
              <p className="font-medium text-black">07:30 PM</p>
            </div>

            <div className="flex justify-between text-gray-600">
              <p>Seats</p>
              <p className="font-medium text-black">
                A1, A2 (Platinum)
              </p>
            </div>

            <div className="flex justify-between text-gray-600">
              <p>Tickets</p>
              <p className="font-medium text-black">2</p>
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
              <p>₹1050</p>
            </div>

            <div className="flex justify-between">
              <p>Taxes & Fees</p>
              <p>₹120</p>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg text-black">
              <p>Total Payable</p>
              <p>₹1170</p>
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
              <p>📱 +91 9876543210</p>
              <p>📍 Gujarat, India</p>
            </div>
          </div>

          <button className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg">
            Proceed to Pay ₹1170
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
