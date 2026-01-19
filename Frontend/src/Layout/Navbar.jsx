import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useContext } from 'react'
import { moviecontext, theatrescontext } from '../App';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import History from '../pages/History'
function Navbar() {

  const [open, setOpen] = useState(false)
  const [opent, setOpent] = useState(false)
  const [order, setOrder] = useState(false)
  const [search, setSearch] = useState(false)
  const [profile, setProfile] = useState(false)
  const [otp, setOtp] = useState(false)
  const [login, setLogin] = useState(false)
  const [resendOtp, setResendOtp] = useState(false)
  let { Mov, setMovie } = useContext(moviecontext)
  let [filter, setFilter] = useState("");
  let { theatres, setMovietheatres } = useContext(theatrescontext)
  const navigate = useNavigate();
  const releasedmov = Mov.filter(movie => movie.released === true)
  const filtermovie = Mov.filter((m) =>
    m.name.toLowerCase().includes(filter.toLowerCase())

  );
  const location = useLocation();

  const isHistoryPage = location.pathname === "/history";

  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
    interest: ""
  });
  const [otpform, setOtpForm] = useState({
    email: "",
    otp: ""
  })
  const [loginform, setLoginForm] = useState({
    email: "",
    password: ""
  })
  const [Resendotpform, setResendOtpForm] = useState({
    email: "",
  })

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/register",
        { ...formData }
      );
      if (response.data.success) {
        alert("Registration successful ✅ OTP sent to your email.");
        setProfile(false);
        setOtp(true);
        setFormdata({
          name: "",
          email: "",
          password: "",
          mobileNumber: "",
          address: "",
          interest: ""
        });
      } else {
        alert("Registration failed ❌: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed ❌: " + (err.response?.data?.message || err.message));
    }
  };
  const otpsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/verify-otp",
        { ...otpform }
      );
      alert("OTP verified successfully ✅");
      setOtp(false);
      setLogin(true);
      setOtpForm({ email: "", otp: "" });
    } catch (error) {
      console.error(error);
      alert("OTP verification failed ❌");
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:4000/api/user/login",
        { ...loginform }
      );
      setLogin(false);
      alert("Login successfully ✅");
      setLoginForm({ email: "", password: "" });
    } catch (error) {
      console.error(error);
      alert("Login failed ❌");
    }
  }
  const otpResendHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:4000/api/user/resend-otp",
        { ...Resendotpform }
      )
      setOtp(true)
      setOtpResend(false)
      setLoginForm({
        email: "",
      })
      console.log(data.message)
    } catch (error) {
      console.error(error)
    }
  }
  const inputhandler = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };
  const otpinputhandler = (e) => {
    setOtpForm({ ...otpform, [e.target.name]: e.target.value });
  };
  const logininputhandler = (e) => {
    setLoginForm({ ...loginform, [e.target.name]: e.target.value });
  };
  const resendotpinputhandler = (e) => {
    setResendOtpForm({ ...loginform, [e.target.name]: e.target.value });
  };
  return (
    <div className='sticky top-0 z-40 bg-white' >
      <nav className=" top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <div className="text-amber-800 text-3xl font-extrabold cursor-pointer hover:scale-105 transition"
            onClick={() => navigate('/')}
          >
            Ticket Wala
          </div>
          {!isHistoryPage ? (
            <>
              <div className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-700">
                <NavLink className="hover:text-amber-700 cursor-pointer transition"
                  to={"/"}>
                  Home
                </NavLink>
                <NavLink className="hover:text-amber-700 cursor-pointer transition"
                  onMouseEnter={() => {
                    setOpent(false)
                    setOpen(true)
                  }}
                >
                  Movies
                </NavLink>
                <NavLink className="hover:text-amber-700 cursor-pointer transition"
                  onMouseEnter={() => {
                    setOpen(false)
                    setOpent(true)
                  }}>Theatres
                </NavLink>
                <NavLink className="hover:text-amber-700 cursor-pointer transition"
                  onClick={() => setProfile(true)}>Orders
                </NavLink>
              </div>
              <div className="flex items-center gap-5">
                <input
                  type="search"
                  placeholder="🔍 Search movies or cinemas"
                  onClick={() => setSearch(true)}
                  className="border border-gray-300 px-4 py-2 w-72 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <div
                  className="w-11 h-11 rounded-full bg-gray-200 flex justify-center items-center text-2xl cursor-pointer hover:bg-gray-300 transition"
                  onClick={() => setProfile(true)}>🧑🏻</div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-700 tracking-wide">
                Review Your Orders
              </h2>

              <div
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center 
      text-3xl cursor-pointer hover:bg-gray-200 transition"
                onClick={() => setProfile(true)}
              >🧑🏻
              </div>
            </>
          )}
        </div>
      </nav>

      {/* movies */}
      <Dialog
        open={open}
        onClose={() => { setOpen(false); }}
        className="relative z-10"      >
        <div className="fixed backdrop-blur-md inset-0 flex my-20 justify-center p-4 pointer-events-none "  >
          <div
            className="pointer-events-auto"
            onMouseEnter={() => {
              setOpen(true)

            }}
            onMouseLeave={() => setOpen(false)}
          >
            <DialogPanel className="bg-white rounded-lg w-screen max-w-4xl p-6">
              <DialogTitle className="text-xl font-bold mb-4">Now Playing</DialogTitle>
              <div className="flex flex-wrap gap-4 ">
                {Mov.map((v, i) => {
                  return (
                    <div className="flex w-[45%] gap-3 items-center" onClick={() => {
                      navigate(`/movies/${v.encodeName}`)
                      setOpen(false);
                    }}
                    >
                      <img
                        src={v.poster.url}
                        alt="Teri Ishk Mein"
                        className="w-20 rounded size-fit h-10"
                      />
                      <div>
                        <p className="font-bold">{v.name}</p>
                        <p>{v.genre} {v.langauage}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* theatres */}
      <Dialog
        open={opent}
        onClose={() => { setOpent(false); }}
        className="relative z-10" >
        <div className="fixed inset-0 flex my-20 justify-center p-4 pointer-events-none backdrop-blur-md h-full"        >
          <div className="pointer-events-auto"
            onMouseEnter={() => {
              setOpent(true);
            }}
            onMouseLeave={() => setOpent(false)}
          >
            <DialogPanel className="bg-white rounded-lg w-screen max-w-4xl p-6">
              <DialogTitle className="text-xl font-bold mb-4">Theatres </DialogTitle>
              <div className="flex flex-wrap gap-10 justify-center">
                {theatres.map((v, i) => {
                  return (
                    <div className='w-[45%]' onClick={() => {
                      navigate(`/theater/${v._id}`)
                      setOpent(false);
                    }}>

                      {v.name},{v.location},{v.city}
                      <hr />
                    </div>
                  )
                })}

              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>


      {/* Orders */}
       <Dialog
        open={profile}
        onClose={() => setProfile(false)}
        className="relative z-50"
      >
        <div
          className=" fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={() => setProfile(false)}
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200"
          >
            <h1 className="text-center text-3xl font-extrabold text-amber-700 mt-6">
              Ticket Wala
            </h1>
            <p className="text-center text-gray-500 text-sm mb-6">
              Create your account
            </p>
            <form onSubmit={submitHandler} className="px-6 space-y-4">
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="name"
                value={formData.name}
                onChange={inputhandler}
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="email"
                value={formData.email}
                onChange={inputhandler}
                placeholder="Email Address"
                required
              />
              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="password"
                value={formData.password}
                onChange={inputhandler}
                placeholder="Password"
                required
              />
              <input
                type="number"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={inputhandler}
                placeholder="Mobile Number"
                required
              />
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="address"
                value={formData.address}
                onChange={inputhandler}
                placeholder="Address"
              />
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="interest"
                value={formData.interest}
                onChange={inputhandler}
                required
              >
                <option value="">Favourite Genre</option>
                <option>Action</option>
                <option>Comedy</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Horror</option>
              </select>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
              >
                Register
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6 mb-6">
              Already have an account?{" "}
              <span className="text-amber-600 cursor-pointer font-semibold"
                onClick={() => {
                  setProfile(false);
                  setOtp(false);
                  setOrder(false);
                  setLogin(true);
                }}>
                Login
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>

      {/* search */}
      <Dialog
        open={search}
        onClose={() => setSearch(false)}
        className="relative z-10"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="pointer-events-auto">
            <DialogPanel className="bg-white rounded-lg w-screen max-w-4xl p-6">
              <input
                type="search"
                className="border w-[90%] p-2 rounded-md"
                placeholder="🔍 Search for movies, cinemas and more"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <DialogTitle className="text-xl font-bold my-4">
                Trending
              </DialogTitle>
              <div className="flex flex-wrap gap-4">
                {filtermovie.length === 0 ? (
                  <p className="text-gray-500">No results found</p>
                ) : (
                  filtermovie.map((v) => (
                    <div
                      key={v.id}
                      className="flex w-[45%] gap-3 items-center cursor-pointer"
                      onClick={() => navigate(`/movies/${v.encodeName}`)}
                    >
                      <img
                        src={v.poster.url}
                        className="w-20 h-10 rounded object-cover"
                        alt={v.name}
                      />
                      <div>
                        <p className="font-bold">{v.name}</p>
                        <p className="text-sm">{v.genre} • {v.language}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* profile */}
      <Dialog
        open={profile}
        onClose={() => setProfile(false)}
        className="relative z-50"
      >
        <div
          className=" fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={() => setProfile(false)}
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200"
          >
            <h1 className="text-center text-3xl font-extrabold text-amber-700 mt-6">
              Ticket Wala
            </h1>
            <p className="text-center text-gray-500 text-sm mb-6">
              Create your account
            </p>
            <form onSubmit={submitHandler} className="px-6 space-y-4">
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="name"
                value={formData.name}
                onChange={inputhandler}
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="email"
                value={formData.email}
                onChange={inputhandler}
                placeholder="Email Address"
                required
              />
              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="password"
                value={formData.password}
                onChange={inputhandler}
                placeholder="Password"
                required
              />
              <input
                type="number"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={inputhandler}
                placeholder="Mobile Number"
                required
              />
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="address"
                value={formData.address}
                onChange={inputhandler}
                placeholder="Address"
              />
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="interest"
                value={formData.interest}
                onChange={inputhandler}
                required
              >
                <option value="">Favourite Genre</option>
                <option>Action</option>
                <option>Comedy</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Horror</option>
              </select>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
              >
                Register
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6 mb-6">
              Already have an account?{" "}
              <span className="text-amber-600 cursor-pointer font-semibold"
                onClick={() => {
                  setProfile(false);
                  setOtp(false);
                  setOrder(false);
                  setLogin(true);
                }}>
                Login
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>

      {/* otp  */}
      <Dialog
        open={otp}
        onClose={() => setOtp(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={() => setOtp(false)}
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200"
          >
            <h1 className="text-center text-3xl font-extrabold text-amber-700 mt-6">
              Verify OTP
            </h1>
            <p className="text-center text-gray-500 text-sm mb-6">
              Please enter the OTP sent to your email to complete registration.
            </p>
            <form onSubmit={otpsubmitHandler} className="px-6 space-y-4">
              <input
                type="email"
                name="email"
                value={otpform.email}
                onChange={otpinputhandler}
                placeholder="Enter Email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <input
                type="text"
                name="otp"
                value={otpform.otp}
                onChange={otpinputhandler}
                placeholder="Enter OTP"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
              >
                Verify OTP
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6 mb-6">
              Didn't receive the OTP?{" "}
              <span
                className="text-amber-600 cursor-pointer font-semibold"
                onClick={() => {
                  setOtp(false);
                  setProfile(false);
                  setOrder(false);
                  setResendOtp(true);
                }}
              >
                Resend OTP
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Resend Otp  */}
      <Dialog
        open={resendOtp}
        onClose={() => setResendOtp(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={() => setResendOtp(false)}
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200"
          >
            <h1 className="text-center text-3xl font-extrabold text-amber-700 mt-6">
              Resend OTP
            </h1>
            <p className="text-center text-gray-500 text-sm mb-6">
              Enter your email below and we will send you a new OTP to complete registration.
            </p>
            <form onSubmit={otpResendHandler} className="px-6 space-y-4">
              <input
                type="email"
                name="email"
                value={Resendotpform.email}
                onChange={resendotpinputhandler}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
              >
                Resend OTP
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6 mb-6">
              Already received OTP?{" "}
              <span
                className="text-amber-600 cursor-pointer font-semibold"
                onClick={() => {
                  setResendOtp(false);
                  setOtp(true);
                }}
              >
                Enter OTP
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>



      {/* Login  */}
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
              Don't have an account?{" "}
              <span
                className="text-amber-600 cursor-pointer font-semibold"
                onClick={() => {
                  setLogin(false);
                  setProfile(true);
                }}
              >
                Create account
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>


    </div>
  )
}

export default Navbar



