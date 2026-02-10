import axios from "axios";
import React, { useEffect, useState } from "react";

function AllTheatres() {


  const [theatres, setTheatres] = useState([]);

 
  

  const getTheatres = async () => {
    const res = await axios.get(
      "/api/theatres/gettheatres"
    );
    if (res.data.success) {
      setTheatres(res.data.data);
    }
  };

  

  const deleteTheatre = async (id) => {
    if (!window.confirm("Are you sure you want to delete this theatre?")) return;

     try {
      const res = await axios.delete(
      `/api/theatres/deletetheatre/${id}`
    );
     if (res.status === 200 || res.data.success) {
        alert("Theatre deleted successfully!");
    getTheatres();
  } else {
        alert("Failed to delete movie");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete movie");
    }}

  useEffect(() => {
    getTheatres();
  }, []);

  return (
     <div className="min-h-fit bg-gray-100 p-6 flex justify-center">
  <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="bg-blue-600 text-white text-center font-bold py-3 text-xl">
      ALL Theatres
    </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-center text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Screens</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {theatres.map((t) => (
                <tr key={t._id} className="border-t">
                  <td className="py-2">
                    <img
                      src={t?.image?.url}
                      alt="theatre"
                      className="w-10 h-10 rounded-full mx-auto object-cover"
                    />
                  </td>
                  <td>{t.name}</td>
                  <td>{t.city}</td>
                  <td>{t.location}</td>
                  <td>{t.screens}</td>
                  <td>
                    <button
                      onClick={() => deleteTheatre(t._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-xs hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {theatres.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-gray-500">
                    No theatres found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllTheatres;
