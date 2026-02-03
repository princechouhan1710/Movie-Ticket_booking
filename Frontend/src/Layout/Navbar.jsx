import React, { useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useContext } from 'react'
import { moviecontext, theatrescontext } from '../App';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false)
  const [opent, setOpent] = useState(false)
  const [search, setSearch] = useState(false)
  const [profile, setProfile] = useState(false)
  const [user, setUser] = useState(false)
  const [otp, setOtp] = useState(false)
  const [login, setLogin] = useState(false)
  const [showMenu, setshowMenu] = useState(false)
  const [resendOtp, setResendOtp] = useState(false)
  const { Mov, setMovie } = useContext(moviecontext)
  const [filter, setFilter] = useState("");
  const { theatres, setMovietheatres } = useContext(theatrescontext)
  const [userProfile,setUserProfile]=useState([]);
  const navigate = useNavigate();
  const releasedmov = Mov.filter(movie => movie.released === true)
  const filtermovie = Mov.filter((m) =>
    m.name.toLowerCase().includes(filter.toLowerCase())

  );
  const location = useLocation();
  const isHistoryPage = location.pathname === "/history";

const getUser =async ()=>{
  const {data } =await axios('/api/user/profile')
  setUserProfile(data.data);
  console.log(data.data)
};
useEffect(()=>{
getUser()
},[])

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
        otp: ""
      })
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

  const orderLogin =async () =>{
    try {
       const token = await localStorage.getItem("token");
      const { data } = await axios.get("/api/user/profile", {
        headers: {
          token: token
        }
      })
      if (data.success) {
        setProfile(false)
        setUser(true)
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
      <nav className=" top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md border-b border-gray-200">
        <div className=" max-w-10xl mx-auto flex items-center justify-between py-2 px-3 sm:px-8">

          {!isHistoryPage ? (
            <>
              <div
                className="text-amber-800 text-lg font-extrabold cursor-pointer  transition"
                onClick={() => navigate("/")}
              >
                <p>Ticket Wala | Indore</p>
              </div>
              <div className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-700">
                <NavLink to="/" className="hover:text-amber-700 transition text-xs">
                  Home
                </NavLink>
                <NavLink
                  className="hover:text-amber-700 cursor-pointer transition text-xs"
                  onMouseEnter={() => {
                    setOpent(false);
                    setOpen(true);
                  }}
                >
                  Movies
                </NavLink>
                <button
                  className="hover:text-amber-700 cursor-pointer transition text-xs"
                  onMouseEnter={() => {
                    setOpen(false);
                    setOpent(true);
                  }}
                >
                  Theatres
                </button>
                <button
                  className="hover:text-amber-700 cursor-pointer transition text-xs"
                  onClick={ordercheck}
                >
                  Orders
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-5">
                <input
                  type="search"
                  placeholder="🔍 Search movies or cinemas"
                  onClick={() => setSearch(true)}
                  className="border   border-gray-300 pl-4 lg:px-4 py-2 rounded-lg shadow-sm focus:ring-2 text-xs focus:ring-amber-500 focus:outline-none w-12 lg:w-65 xl:w-72 "
                />
                <div
                  className="w-11 h-11 rounded-full flex bg-gray-200  justify-center items-center text-2xl cursor-pointer hover:bg-gray-300 transition"
                  // onClick={() => setProfile(true)}
                  onClick={orderLogin}
                >
                  🧑🏻
                </div>
              </div>

              <div className="flex items-center gap-4 sm:hidden">
                <input
                  type="search"
                  placeholder="🔍"
                  onClick={() => setSearch(true)}
                  className="border border-gray-300 py-1 flex lg:hidden rounded-lg shadow-sm text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none w-9 pl-2"
                />

                <div
                  className="text-2xl flex sm:hidden "
                  onClick={(e) => {
                    e.stopPropagation();
                    setshowMenu(!showMenu);
                  }}
                >
                  {!showMenu ? <IoMdMenu /> : <IoClose />}
                </div>

                <div
                  className={`absolute right-3 top-16 w-32 rounded-xl bg-gray-500 text-white transition-all duration-300 ${showMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
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
              <div
                className="text-amber-800 hidden sm:flex text-lg font-extrabold cursor-pointer  transition"
                onClick={() => navigate("/")}
              >
                <p>Ticket Wala | Indore</p>

              </div>
              <div className="text-amber-800 sm:hidden flex text-lg font-extrabold cursor-pointer  transition"
                onClick={() => navigate("/")}
              ><FaArrowLeft /></div>
              <h2 className="text-lg font-bold flex text-amber-800 tracking-wide ">
                Review  Your Orders
              </h2>
              <div
                className="sm:w-11 sm:/h-11 rounded-full flex bg-gray-200  justify-center items-center text-xl sm:text-2xl cursor-pointer hover:bg-gray-300 transition"
                // onClick={() => setProfile(true)}
                onClick={orderLogin}
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
        <div className="fixed backdrop-blur-md inset-0 flex my-20 justify-center p-4 pointer-events-none  h-fit"  >
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
                    <div className="flex w-[45%] gap-3 items-center  cursor-pointer" key={i} onClick={() => {
                      navigate(`/movies/${v.encodeName}`)
                      setOpen(false);
                    }}
                    >
                      <img
                        src={v.poster.url}
                        alt="Teri Ishk Mein"
                        className="hidden sm:block w-20 rounded size-fit h-10"
                      />
                      <div>
                        <p className="font--medium text-sm">{v.name}</p>
                        <p className='text-xs font-light'>{v.genre}, {v.langauage?.slice(0, 1).join(" ")} </p>
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
        <div className="fixed backdrop-blur-md inset-0 flex my-20 justify-center p-4 pointer-events-none h-full "  >
          <div className="pointer-events-auto"
            onMouseEnter={() => {
              setOpent(true);
            }}
            onMouseLeave={() => setOpent(false)}
          >
            <DialogPanel className="bg-white rounded-lg w-screen max-w-4xl p-6 ">
              <DialogTitle className="text-xl font-bold mb-4 ">Theatres </DialogTitle>
              <div className="flex flex-wrap  gap-x-10 gap-y-7 justify-center ">
                {theatres.map((v, i) => {
                  return (
                    <NavLink to={"/theatre/list/" + v.name} onClick={() => { setOpent(false) }} className='w-[45%]'  >
                      <p className='mb-1 text-[11px] font-medium'>{v.name},{v.location},{v.city}</p>  
                      <hr className='text-gray-300' />
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
                        className="hidden sm:block w-20 h-10 rounded object-cover"
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

      {/* User */}
     <Dialog
             open={user}
             onClose={() => setUser(false)}
             className="relative z-50"
           >
             <div
               className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
               onClick={() => setUser(false)}
             />
     
             <div className="fixed inset-0 flex justify-end">
               <DialogPanel
                 className="w-[340px] h-full bg-white shadow-2xl p-6 rounded-l-3xl 
                             transform transition-all duration-300 animate-slideIn"
                 onClick={(e) => e.stopPropagation()}
               >
                {/* <div className='border '>
                {
                  
                  userProfile.map((v,i)=>{
                    return(
                      <p>{v.name}</p>
                    )
                  })
                }
                </div> */}

                 <h1 className="text-3xl font-semibold mb-6">Profile</h1>
     
                 <div className="flex items-center gap-4 mb-8">
                   <p className="w-14 h-14 rounded-full bg-indigo-500 flex justify-center 
                                  items-center text-white text-2xl font-semibold">
                     U
                   </p>
     
                   <div>
                     <h2 className="text-lg font-bold">User</h2>
                     <h3 className="text-gray-600 text-sm">Email</h3>
                   </div>
                 </div>
     
                 <div className="shadow-md rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">
                   <div className="flex justify-between items-center text-sm">
                     <h3 className="font-medium">View All Booking</h3>
                     <span>➪</span>
                   </div>
                 </div>
     
                 <p className="mt-8 mb-2 text-sm font-bold text-gray-700">Support</p>
     
                 <div className="shadow-md rounded-xl">
                   <div className="flex justify-between items-center h-12 px-4 cursor-pointer hover:bg-gray-50">
                     <h3>Frequently Asked Questions</h3>
                     <span>➪</span>
                   </div>
                   <hr />
                   <div className="flex justify-between items-center h-12 px-4 cursor-pointer hover:bg-gray-50">
                     <h3>Contact Us</h3>
                     <span>➪</span>
                   </div>
                 </div>
     
                 <p className="mt-8 mb-2 text-sm font-bold text-gray-700">More</p>
     
                 <div className="shadow-md rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                   <h3>Terms and Conditions</h3>
                   <span>➪</span>
                 </div>
     
                 <div className="shadow-md rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 mt-3">
                   <h3 className="text-red-600 font-semibold">Logout</h3>
                 </div>
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
              Please enter the OTP sent to your email to compconste registration.
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
              Enter your email below and we will send you a new OTP to compconste registration.
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



