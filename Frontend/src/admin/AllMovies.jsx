import axios from "axios";
import React, { useEffect, useState } from "react";

function AllMovies() {
  const [movie, setMovie] = useState([]);

  const getMovie = async () => {
    try {
      const res = await axios.get("/api/movie/getmovies");
      if (res.data.success) {
        setMovie(res.data.data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch movies");
    }
  };

  const deleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await axios.delete(`/api/movie/deletemovie/${id}`);
      if (res.status === 200 || res.data.success) {
        alert("Movie deleted successfully!");
        getMovie();
      } else {
        alert("Failed to delete movie");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete movie");
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white text-center font-semibold py-3 text-xl">
          Movie Management
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 border-b">
              <tr>
                <th className="px-4 py-3">Poster</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Genre</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Language</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Cast</th>
                <th className="px-4 py-3">Length</th>
                <th className="px-4 py-3">Trailer</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {movie.length === 0 && (
                <tr>
                  <td colSpan="11" className="text-center py-6 text-gray-500">
                    No movies found
                  </td>
                </tr>
              )}

              {movie.map((v) => (
                <tr key={v._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">
                    <img
                      src={v?.poster?.url}
                      alt={v?.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900">{v?.name}</td>
                  <td className="px-4 py-2">{v?.genre}</td>
                  <td
                    className="px-4 py-2 text-gray-700 cursor-help"
                    title={v?.description}
                  >
                    {v?.description?.split(" ").slice(0, 4).join(" ")}
                    {v?.description?.split(" ").length > 4 && " ..."}
                  </td>
                  <td className="px-4 py-2">{v?.langauage?.join(", ")}</td>
                  <td className="px-4 py-2">{v?.category?.join(", ")}</td>
                  <td className="px-4 py-2">{v?.castNames?.join(", ")}</td>
                  <td className="px-4 py-2">{v?.length} hr</td>
                  <td className="px-4 py-2">
                    {v?.video?.url ? (
                      <a
                        href={v.video.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${v?.released
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {v?.released ? "Released" : "Not Released"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteMovie(v._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                    >
                      Delete
                    </button>
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

export default AllMovies;
