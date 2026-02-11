import React, { useContext, useEffect, useState } from "react";
import { moviecontext, theatrescontext } from "../App";
import axios from "axios";

export default function Dash() {
  let { Mov } = useContext(moviecontext);
  let { theatres } = useContext(theatrescontext);

  let [admin, setAdmin] = useState([]);
  let [user, setUser] = useState([]);
  let [userCount ,setUserCount]=useState([])
  let [show,setShow]=useState([])
  let getAdmin = async () => {
    try {
      let { data } = await axios("admin/getadmin");
      setAdmin(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let getUser = async () => {
    try {
      const { data } = await axios("/api/admin/profile", {
        withCredentials: true,
      });
      if (data.success) setUser(data.data);
    } catch (error) {
      console.log(error?.response?.data || error.message);
    }
  };
let getCount =async ()=>{
  try {
    let {data} =await axios("/api/user/getuser");
    setUserCount(data.data);
  } catch (error) {
          console.log(error);
  }
}
let getShow =async ()=>{
  try {
    let {data} =await axios("/api/show/getallshow")
    setShow(data.data)
  } catch (error) {
    console.log(error);
  }
}
  useEffect(() => {
    getAdmin();
    getUser();
    getCount();
    getShow();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Welcome, <span className="text-blue-600">{user.name || "Admin"}</span>
        </h1>
        <p className="text-gray-500 mt-2">Here’s an overview of Ticket Wala dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center hover:shadow-xl transition">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{userCount.length}</h3>
          </div>
          <div className="text-3xl bg-purple-100 text-purple-600 p-4 rounded-xl">👥</div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center hover:shadow-xl transition">
          <div>
            <p className="text-sm text-gray-500">Total Movies</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{Mov?.length || 0}</h3>
          </div>
          <div className="text-3xl bg-blue-100 text-blue-600 p-4 rounded-xl">🎬</div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center hover:shadow-xl transition">
          <div>
            <p className="text-sm text-gray-500">Total Theatres</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{theatres?.length || 0}</h3>
          </div>
          <div className="text-3xl bg-green-100 text-green-600 p-4 rounded-xl">🏢</div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center hover:shadow-xl transition">
          <div>
            <p className="text-sm text-gray-500">Total Shows</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{show.length}</h3>
          </div>
          <div className="text-3xl bg-orange-100 text-orange-600 p-4 rounded-xl">🎟️</div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {admin.map((v, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{v.name}</td>
                  <td className="py-3 px-4">{v.email}</td>
                  <td
                    className={`py-3 px-4 font-medium ${
                      user?.name === v.name ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {user?.name === v.name ? "Active" : "Blocked"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
