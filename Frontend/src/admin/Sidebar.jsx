import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    let { data } = await axios.get(
      "/api/admin/logout"
    );
    if (data.success) {
      nav("/loginadmin");
    }
  };

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 text-lg font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white";

  const activeStyle = "bg-blue-500 text-white shadow";

  const links = (
    <div className="flex flex-col  items-center gap-6 ">
      <NavLink
        to="addmovie"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `${linkStyle} w-[90%] justify-center ${
            isActive ? activeStyle : ""
          }`
        }
      >
        Add Movie
      </NavLink>

      <NavLink
        to="allmovies"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `${linkStyle} w-[90%] justify-center ${
            isActive ? activeStyle : ""
          }`
        }
      >
        All Movies
      </NavLink>

      <NavLink
        to="addtheatre"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `${linkStyle} w-[90%] justify-center ${
            isActive ? activeStyle : ""
          }`
        }
      >
        Add Theatre
      </NavLink>

      <NavLink
        to="alltheatres"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `${linkStyle} w-[90%] justify-center ${
            isActive ? activeStyle : ""
          }`
        }
      >
        All Theatres
      </NavLink>

      <NavLink
        to="createshow"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `${linkStyle} w-[90%] justify-center ${
            isActive ? activeStyle : ""
          }`
        }
      >
        Create Show
      </NavLink>
    </div>
  );

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-blue-700 p-4 ">
        <h1 className="text-white text-xl  font-bold">Ticket Wala</h1>
        <button
          onClick={() => setOpen(true)}
          className="text-white text-xl"
        >
          ☰
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-screen w-72 bg-blue-700 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full p-6 py-10">
          <NavLink
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="text-white text-3xl font-bold tracking-wide text-center md:text-2xl lg:text-3xl"
          >
            Ticket Wala
          </NavLink>

          {links}

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 text-white text-lg font-medium hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </>
  );
}
