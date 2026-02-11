import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from "axios";

function Footer() {
  const navigate = useNavigate();  
    const [login, setLogin] = useState(false)
     const [loginform, setLoginForm] = useState({
        email: "",
        password: ""
      })
      const loginHandler = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.post(
            "/api/user/login",
            { ...loginform }
          );
    
          if (data.success) {
            localStorage.setItem("token", data.token);
            setLogin(false);
            navigate("/history");
          } else {
            alert(data.message);
          }
        } catch (err) {
          console.error(err);
          alert("Login failed ❌");
        }
      };
      const logininputhandler = (e) => {
        setLoginForm({ ...loginform, [e.target.name]: e.target.value });
      };
     const ordercheck = async () => {
    try {
      const token = await localStorage.getItem("token");
      const { data } = await axios.get("/api/user/profile", {
        headers: {
          token: token
        }
      })
      if (data.success) {
        navigate("/history")
      } else {
         
        setLogin(true)
      }
    } catch (error) {
      console.log(error?.response?.data)
      setLogin(true)
    }
  }
  return (
    <div>
    <footer className="bg-white mt-10 border-t border-gray-300 shadow-inner">
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute end-4 top-4 bg-amber-700 text-white p-3 rounded-full shadow-lg 
                     hover:bg-amber-800 transition cursor-pointer" >
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
              className="text-3xl font-extrabold text-amber-800 tracking-wide cursor-pointer"
              style={{ fontFamily: "Pacifico" }}
             onClick={() =>{navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" })}}>
              Ticket Wala
            </h2>
            <p className="mt-4 max-w-md text-gray-600 leading-relaxed">
              Book your favorite movies, shows & events quickly and easily with Ticket Wala.
              Fast, simple & secure ticket booking.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="flex flex-wrap gap-10 text-gray-700">

              <p onClick={() =>{navigate("/");
               window.scrollTo({ top: 0, behavior: "smooth" })}} className="cursor-pointer flex items-center gap-2 hover:text-amber-700 transition">
                Home
              </p>

              <p onClick={() =>{navigate("/");
               window.scrollTo({ top: 0, behavior: "smooth" })}} className="cursor-pointer flex items-center gap-2 hover:text-amber-700 transition">
                Movies
              </p>

              <p onClick={() => navigate("/theatres")} className="cursor-pointer flex items-center gap-2 hover:text-amber-700 transition">
                Theatres
              </p>

              <p  onClick={ordercheck} className=" cursor-pointer flex items-center gap-2 hover:text-amber-700 transition">
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

  <Dialog
        open={login}
        onClose={() => setLogin(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={() => setLogin(false)}
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200"
          >
            <h1 className="text-center text-3xl font-extrabold text-amber-700 mt-6">
              Login
            </h1>
            <p className="text-center text-gray-500 text-sm mb-6">
              Enter your email and password to login.
            </p>
            <form
              onSubmit={loginHandler}
              className="px-6 space-y-4"
            >
              <input
                type="email"
                name="email"
                value={loginform.email}
                onChange={logininputhandler}
                placeholder="Enter Email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <input
                type="password"
                name="password"
                value={loginform.password}
                onChange={logininputhandler}
                placeholder="Enter Password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6 mb-6">
              
              <span
                className="text-amber-600 cursor-pointer font-semibold"
               
              >
               
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>
</div>
  );
}

export default Footer;




