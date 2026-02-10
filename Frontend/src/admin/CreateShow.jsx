import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddShow() {
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [form, setForm] = useState({
    movie: "",
    theatre: "",
    showDates: [{ date: "" }],
    showTimings: [{ time: "", seatCategories: [{ categoryName: "", price: "" }] }],
    totalSeats: "",
    bookedSeats: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const m = await axios.get("/api/movie/getmovies");
        const t = await axios.get("/api/theatres/gettheatres");
        setMovies(m.data.movies || m.data.data || []);
        setTheatres(t.data.theatres || t.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const addDate = () => setForm({ ...form, showDates: [...form.showDates, { date: "" }] });
  const changeDate = (i, val) => {
    const arr = [...form.showDates];
    arr[i].date = val;
    setForm({ ...form, showDates: arr });
  };

  const addTiming = () =>
    setForm({
      ...form,
      showTimings: [...form.showTimings, { time: "", seatCategories: [{ categoryName: "", price: "" }] }],
    });
  const changeTiming = (i, val) => {
    const arr = [...form.showTimings];
    arr[i].time = val;
    setForm({ ...form, showTimings: arr });
  };

  const addCategory = (ti) => {
    const arr = [...form.showTimings];
    arr[ti].seatCategories.push({ categoryName: "", price: "" });
    setForm({ ...form, showTimings: arr });
  };

  const changeCategory = (ti, ci, field, val) => {
    const arr = [...form.showTimings];
    arr[ti].seatCategories[ci][field] = val;
    setForm({ ...form, showTimings: arr });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        movie: form.movie,
        theatre: form.theatre,
        showDates: form.showDates.map((d) => ({ date: new Date(d.date) })),
        showTimings: form.showTimings.map((t) => ({
          time: new Date(t.time),
          seatCategories: t.seatCategories.map((s) => ({ categoryName: s.categoryName, price: Number(s.price) })),
        })),
        totalSeats: Number(form.totalSeats),
        bookedSeats: Number(form.bookedSeats),
      };

      await axios.post("/api/show/createshow", payload);
      setAlert({ type: "success", message: "Show created successfully!" });

      // Reset form
      setForm({
        movie: "",
        theatre: "",
        showDates: [{ date: "" }],
        showTimings: [{ time: "", seatCategories: [{ categoryName: "", price: "" }] }],
        totalSeats: "",
        bookedSeats: 0,
      });

      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: err.response?.data?.message || "Failed to create show" });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl">
        <div className="bg-blue-600 text-white text-center py-3 font-bold text-xl rounded-t-xl">
          Add Show
        </div>

        {alert.message && (
          <div
            className={`text-center py-2 font-medium ${
              alert.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={submit} className="p-6 space-y-4">

          {/* Movie & Theatre */}
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={form.movie}
              onChange={(e) => setForm({ ...form, movie: e.target.value })}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Movie</option>
              {movies.map((m) => (
                <option key={m._id} value={m._id}>{m.name}</option>
              ))}
            </select>

            <select
              value={form.theatre}
              onChange={(e) => setForm({ ...form, theatre: e.target.value })}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Theatre</option>
              {theatres.map((t) => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Show Dates */}
          <div className="space-y-2">
            <h3 className="font-semibold">Show Dates</h3>
            {form.showDates.map((d, i) => (
              <input
                key={i}
                type="date"
                value={d.date}
                onChange={(e) => changeDate(i, e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            ))}
            <button type="button" onClick={addDate} className="border px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
              Add Date
            </button>
          </div>

          {/* Show Timings */}
          <div className="space-y-4">
            <h3 className="font-semibold">Show Timings</h3>
            {form.showTimings.map((t, ti) => (
              <div key={ti} className="border p-3 rounded space-y-2">
                <input
                  type="datetime-local"
                  value={t.time}
                  onChange={(e) => changeTiming(ti, e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />

                {t.seatCategories.map((c, ci) => (
                  <div key={ci} className="flex gap-2">
                    <input
                      placeholder="Category"
                      value={c.categoryName}
                      onChange={(e) => changeCategory(ti, ci, "categoryName", e.target.value)}
                      className="border p-2 rounded w-1/2"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={c.price}
                      onChange={(e) => changeCategory(ti, ci, "price", e.target.value)}
                      className="border p-2 rounded w-1/2"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addCategory(ti)}
                  className="border px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Add Category
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTiming}
              className="border px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              Add Timing
            </button>
          </div>

          {/* Total Seats */}
          <input
            type="number"
            placeholder="Total Seats"
            value={form.totalSeats}
            onChange={(e) => setForm({ ...form, totalSeats: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded font-semibold"
          >
            Create Show
          </button>
        </form>
      </div>
    </div>
  );
}
