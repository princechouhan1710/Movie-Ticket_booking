import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useContext } from 'react'
import { moviecontext, theatrescontext } from '../App';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const [open, setOpen] = useState(false)
  const [opent, setOpent] = useState(false)
  const [order, setOrder] = useState(false)
  const [search, setSearch] = useState(false)
  const [profile, setProfile] = useState(false)
  const [otp, setOtp] = useState(false)
  const [login, setLogin] = useState(false)
  let [showMenu,setshowMenu] =useState(false)
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

  // Registration
   const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
    interest: ""
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/register",
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
  const inputhandler = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  //Otp 
   const [otpform, setOtpForm] = useState({
    email: "",
    otp: ""
  })
  const otpsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/verify-otp",
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
  const otpinputhandler = (e) => {
    setOtpForm({ ...otpform, [e.target.name]: e.target.value });
  };

  //Otp Resend
  const [Resendotpform, setResendOtpForm] = useState({
    email: "",
  })
  const otpResendHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/api/user/resend-otp",
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
  const resendotpinputhandler = (e) => {
    setResendOtpForm({ ...Resendotpform, [e.target.name]: e.target.value });
  };

  // Login 
   const [loginform, setLoginForm] = useState({
    email: "",
    password: ""
  })
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/login",
        { ...loginform }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setLogin(false);
        navigate("/history");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };
   const logininputhandler = (e) => {
    setLoginForm({ ...loginform, [e.target.name]: e.target.value });
  };

  let ordercheck = async () => {
    console.log("order")
    try {
      let token =await localStorage.getItem("token");
      console.log(token)
      let { data } = await axios.get("/api/user/profile", {
        headers: {
          token: token
        }
      })
      console.log(data)
      if (data.response.success) {
        console.log("Ddd")
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
    <div className='sticky top-0 z-40 bg-white mb-15' >
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md border-b border-gray-200">
  <div className="mx-auto flex items-center justify-between py-4 px-7">
    <div
      className="text-amber-800 text-2xl font-extrabold cursor-pointer hover:scale-105 transition"
      onClick={() => navigate("/")}
    >
      Ticket Wala{" "}
      <span className="text-gray-400 font-light hidden lg:inline">|</span>{" "}
      <span className="text-blue-500 hidden lg:inline text-xl">
        <FontAwesomeIcon icon={faLocationDot} /> Indore
      </span>
    </div>

    {!isHistoryPage ? (
      <>
        <div className="hidden md:flex items-center gap-10 text-lg font-medium text-zinc-600">
          <NavLink to="/" className="hover:text-amber-700 transition">
            Home
          </NavLink>
          <NavLink
            className="hover:text-amber-700 transition"
            onMouseEnter={() => {
              setOpent(false);
              setOpen(true);
            }}
          >
            Movies
          </NavLink>
          <button
            className="hover:text-amber-700 transition"
            onMouseEnter={() => {
              setOpen(false);
              setOpent(true);
            }}
          >
            Theatres
          </button>
          <button
            className="hover:text-amber-700 transition"
            onClick={ordercheck}
          >
            Orders
          </button>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <input
            type="search"
            placeholder="🔍 Search movies or cinemas"
            onClick={() => setSearch(true)}
            className="border border-gray-300 pl-4 lg:px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none w-15 lg:w-65 xl:w-72 "
          />
          <div
            className="w-11 h-11 rounded-full bg-gray-200 flex justify-center items-center text-2xl cursor-pointer hover:bg-gray-300 transition"
            onClick={() => setProfile(true)}
          >
            🧑🏻
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <input
            type="search"
            placeholder="🔍"
            onClick={() => setSearch(true)}
            className="border border-gray-300 py-1 text-xs rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none w-9 pl-2"
          />

          <div
            className="text-2xl"
            onClick={(e) => {
              e.stopPropagation();
              setshowMenu(!showMenu);
            }}
          >
            {!showMenu ? <IoMdMenu /> : <IoClose />}
          </div>

          <div
            className={`absolute right-3 top-16 w-32 rounded-xl bg-gray-500 text-white transition-all duration-300 ${
              showMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="flex flex-col gap-2 p-3 items-center text-sm">
              <NavLink to="/" className="hover:text-amber-300">
                Home
              </NavLink>
              <NavLink
                className="hover:text-amber-300"
                onMouseEnter={() => {
                  setOpent(false);
                  setOpen(true);
                }}
              >
                Movies
              </NavLink>
              <button
                className="hover:text-amber-300"
                onMouseEnter={() => {
                  setOpen(false);
                  setOpent(true);
                }}
              >
                Theatres
              </button>
              <button className="hover:text-amber-300" onClick={ordercheck}>
                Orders
              </button>
              <div
                className="cursor-pointer hover:text-amber-300"
                onClick={() => setProfile(true)}
              >
                Profile
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <h2 className="text-2xl font-bold text-gray-700 tracking-wide">
          Review Your Orders
        </h2>
        <div
          className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-3xl cursor-pointer hover:bg-gray-200 transition"
          onClick={() => setProfile(true)}
        >
          🧑🏻
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
                    <div className="flex w-[45%] gap-3 items-center" key={i} onClick={() => {
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
                        <p>{v.genre} </p>
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
        <div className="fixed backdrop-blur-md inset-0 flex my-20 justify-center p-4 pointer-events-none "  >
          <div className="pointer-events-auto"
            onMouseEnter={() => {
              setOpent(true);
            }}
            onMouseLeave={() => setOpent(false)}
          >
            <DialogPanel className="bg-white rounded-lg w-screen max-w-4xl p-6 ">
              <DialogTitle className="text-xl font-bold mb-4 ">Theatres </DialogTitle>
              <div className="flex flex-wrap gap-10 justify-center ">
                {theatres.map((v, i) => {
                  return (
                    <NavLink to={"/theatre/list/" + v.name} onClick={() => { setOpent(false) }} className='w-[45%]'  >
                      {v.name},{v.location},{v.city}
                      <hr />
                    </NavLink>

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



