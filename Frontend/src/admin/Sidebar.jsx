import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  let nav = useNavigate();

  let logout = async () => {
    let { data } = await axios.get("/api/admin/logout");
    if (data.success) {
      nav("/loginadmin");
    }
  };

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 text-lg font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white";

  const activeStyle =
    "bg-blue-500 text-white shadow";

  return (
    <div className="w-72 bg-blue-700 h-screen flex flex-col justify-between p-6 py-10">
      
      <NavLink
        to="/dashboard"
        className="text-white text-3xl font-bold tracking-wide text-center "
      >
        Ticket Wala
      </NavLink>

      <div className="flex flex-col gap-8">
        <NavLink to="addmovie" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ""}`}>
          Add Movie
        </NavLink>
        <NavLink to="allmovies" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ""}`}>
          All Movies
        </NavLink>
        <NavLink to="addtheatre" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ""}`}>
         Add Theatre
        </NavLink>
        <NavLink to="alltheatres" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ""}`}>
          All Theatres
        </NavLink>
        <NavLink to="createshow" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ""}`}>
          Create Show
        </NavLink>
      </div>

      <button
        onClick={logout}
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 text-white text-lg font-medium hover:bg-red-600 transition"
      >
        🚪 Logout
      </button>
    </div>
  );
}
