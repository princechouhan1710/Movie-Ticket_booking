import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-white mt-10 border-t border-gray-300 shadow-inner">
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute end-4 top-4 bg-amber-700 text-white p-3 rounded-full shadow-lg 
                     hover:bg-amber-800 transition" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <div className="lg:flex lg:items-start lg:justify-between gap-10">
          <div>
            <h2
              className="text-3xl font-extrabold text-amber-800 tracking-wide"
              style={{ fontFamily: "Pacifico" }}
             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Ticket Wala
            </h2>
            <p className="mt-4 max-w-md text-gray-600 leading-relaxed">
              Book your favorite movies, shows & events quickly and easily with Ticket Wala.
              Fast, simple & secure ticket booking.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="flex flex-wrap gap-10 text-gray-700">

              <p onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 hover:text-amber-700 transition">
                Home
              </p>

              <p onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 hover:text-amber-700 transition">
                Movies
              </p>

              <p onClick={() => navigate("/theatres")} className="flex items-center gap-2 hover:text-amber-700 transition">
                Theatres
              </p>

              <p onClick={() => navigate("/history")} className="flex items-center gap-2 hover:text-amber-700 transition">
                Orders
              </p>


            </div>
          </div>
        </div>
        <p className="mt-12 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Ticket Wala — All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
