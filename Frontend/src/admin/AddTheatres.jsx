import axios from "axios";
import React, { useState } from "react";

function AddTheatres() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    location: "",
    screens: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      city: "",
      location: "",
      screens: "",
      image: null,
    });
    setPreview(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please select an image");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("city", formData.city);
    data.append("location", formData.location);
    data.append("screens", formData.screens);
    data.append("image", formData.image);

    try {
      const res = await axios.post(
        "theatres/createtheatre",
        data
      );

      if (res.status === 201 || res.data.success) {
        alert("Theatre added successfully!");
        resetForm();
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto mb-10">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="bg-blue-600 text-white text-center font-bold py-3 rounded-t-xl">
            Add Theatre
          </div>

          <form onSubmit={submitHandler} className="p-6 space-y-4">
            <input
              name="name"
              value={formData.name}
              onChange={inputHandler}
              placeholder="Theatre Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="city"
              value={formData.city}
              onChange={inputHandler}
              placeholder="City"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="location"
              value={formData.location}
              onChange={inputHandler}
              placeholder="Location"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="screens"
              value={formData.screens}
              onChange={inputHandler}
              placeholder="Number of screens"
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={fileHandler}
              className="w-full border rounded-lg p-2"
            />

            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            )}

            <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTheatres;
