import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useContext } from 'react'
import { moviecontext, theatrescontext } from '../App';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import History from '../pages/History'
function Navbar() {
  const [open, setOpen] = useState(false)
  const [opent, setOpent] = useState(false)
  const [order, setOrder] = useState(false)
  const [search, setSearch] = useState(false)
  const [profile, setProfile] = useState(false)
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
  return (
    <div className='sticky top-0 z-40 bg-white' >

      <nav className=" top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

          <div
            className="text-amber-800 text-3xl font-extrabold cursor-pointer hover:scale-105 transition"
            onClick={() => navigate('/')}
          >
            Ticket Wala
          </div>
          {!isHistoryPage ? (
            <>
              <div className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-700">
                <NavLink className="hover:text-amber-700 cursor-pointer transition"
                  // onClick={() => navigate('/')}
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
                  onClick={() => setOrder(true)}>Orders
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
        onClose={() => {
          setOpen(false);

        }}

        onMous
        className="relative z-10"
      >
        <div
          className="fixed backdrop-blur-md inset-0 flex my-20 justify-center p-4 pointer-events-none h-screen"
        >
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

                {/* {releasedmov.map((v, i) => { */}

                {Mov.map((v, i) => {
                  return (
                    <div className="flex w-[45%] gap-3 items-center" onClick={() => {
                      navigate(`/movies/${v.id}`)
                    }}>
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
        onClose={() => {
          setOpent(false);

        }
        }

        onMous
        className="relative z-10"
      >
        <div
          className="fixed inset-0 flex my-20 justify-center p-4 pointer-events-none backdrop-blur-md h-full"
        >
          <div
            className="pointer-events-auto"
            onMouseEnter={() => {
              setOpent(true);

            }

            }
            onMouseLeave={() => setOpent(false)}
          >
            <DialogPanel className="bg-white rounded-lg w-screen max-w-4xl p-6">
              <DialogTitle className="text-xl font-bold mb-4">Theatres </DialogTitle>
              <div className="flex flex-wrap gap-10 justify-center">
                {theatres.map((v, i) => {
                  return (
                    <div className='w-[45%]'>
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
        open={order}
        onClose={() => setOrder(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setOrder(false)}
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl transform transition-all duration-300 scale-100 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h1
              className="text-4xl text-amber-950 font-bold text-center mb-3"
              style={{ fontFamily: "Pacifico" }}
            >
              Ticket Wala
            </h1>

            <p className="text-center text-gray-600 mb-6">
              Enter your email to continue. If you don’t have an account, we'll create one!
            </p>

            <form className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="mt-1 w-full px-3 py-2 bg-gray-100 border rounded-lg text-sm focus:ring-2 focus:ring-amber-800 outline-none"
                  placeholder="example@company.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 w-full px-3 py-2 bg-gray-100 border rounded-lg text-sm focus:ring-2 focus:ring-amber-800 outline-none"
                  placeholder="•••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  Remember me
                </label>

                <a className="text-amber-800 hover:underline cursor-pointer">
                  Lost password?
                </a>
              </div>

              <button
                type="submit"
                onClick={() => {
                  navigate("/history");
                  setOrder(false);
                }}
                className="w-full py-2.5 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition font-semibold"
              >
                Continue
              </button>

              <p className="text-sm text-center text-gray-600">
                Not registered?
                <a className="text-amber-900 font-semibold hover:underline ml-1 cursor-pointer">
                  Create account
                </a>
              </p>
            </form>
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

              {/* Search Input */}
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
                      onClick={() => navigate(`/movies/${v.id}`)}
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
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={() => setProfile(false)}
        />

        <div className="fixed inset-0 flex justify-end">
          <DialogPanel
            className="w-[340px] h-full bg-white shadow-2xl p-6 rounded-l-3xl 
                 transform transition-all duration-300 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
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

    </div>
  )
}

export default Navbar



