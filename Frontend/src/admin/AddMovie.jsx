
import React, { useState, useEffect } from "react";
import axios from "axios";

function AddMovie() {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    releasedate: "",
    length: "",
    genre: "",
    released: false,
    description: "",
    langauage: [],
    category: [],
    castNames: [],
    theaters: [],
    poster: null,
    video: null,
    encodeName: "",
  });

  const [langInput, setLangInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [castInput, setCastInput] = useState("");
  const [theaterInput, setTheaterInput] = useState("");

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const addToArray = (key, value, resetFn) => {
    if (!value.trim()) return;
    setFormData({ ...formData, [key]: [...formData[key], value] });
    resetFn("");
  };

  const removeFromArray = (key, index) => {
    setFormData({
      ...formData,
      [key]: formData[key].filter((_, i) => i !== index),
    });
  };


  const submitHandler = async (e) => {
  e.preventDefault();

  const data = new FormData();

  const languages = langInput.trim()
    ? [...formData.langauage, langInput.trim()]
    : formData.langauage;

  const categories = categoryInput.trim()
    ? [...formData.category, categoryInput.trim()]
    : formData.category;

  const castNames = castInput.trim()
    ? [...formData.castNames, castInput.trim()]
    : formData.castNames;

  const theaters = theaterInput.trim()
    ? [...formData.theaters, theaterInput.trim()]
    : formData.theaters;
  data.append("name", formData.name);
  data.append("releasedate", formData.releasedate);
  data.append("length", formData.length);
  data.append("genre", formData.genre);
  data.append("released", formData.released);
  data.append("description", formData.description);
  data.append("encodeName", formData.encodeName);

  languages.forEach(v => data.append("langauage", v));
  categories.forEach(v => data.append("category", v));
  castNames.forEach(v => data.append("castNames", v));
  theaters.forEach(v => data.append("theaters", v));

 
  if (formData.poster) data.append("poster", formData.poster);
  if (formData.video) data.append("video", formData.video);

  try {
    await axios.post(
      "/api/movie/createmovie",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Movie Added Successfully");
    resetForm();

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Submit failed");
  }
};



  const resetForm = () => {
    setFormData({
      name: "",
      releasedate: "",
      length: "",
      genre: "",
      released: false,
      description: "",
      langauage: [],
      category: [],
      castNames: [],
      theaters: [],
      poster: null,
      video: null,
      encodeName: "",
    });
    setLangInput("");
    setCategoryInput("");
    setCastInput("");
    setTheaterInput("");
  };

 

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
  <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="bg-blue-600 text-white text-center font-bold py-3 text-xl">
      Add Movie
    </div>

    <form className="p-6 space-y-4" onSubmit={submitHandler}>
      <input
        name="name"
        value={formData.name}
        onChange={inputHandler}
        placeholder="Movie Name"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      <input
        type="date"
        name="releasedate"
        value={formData.releasedate}
        onChange={inputHandler}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      <input
        type="number"
        name="length"
        placeholder="Length (min)"
        value={formData.length}
        onChange={inputHandler}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      <input
        name="genre"
        placeholder="Genre / Age"
        value={formData.genre}
        onChange={inputHandler}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="released"
          checked={formData.released}
          onChange={inputHandler}
          className="form-checkbox"
        />
        <label>Released</label>
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={inputHandler}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        name="encodeName"
        placeholder="Encode Name"
        value={formData.encodeName}
        onChange={inputHandler}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="file"
          name="poster"
          onChange={fileHandler}
          className="border rounded-lg p-2 w-full"
        />
        <input
          type="file"
          name="video"
          onChange={fileHandler}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      <DynamicInput
        label="Language"
        value={langInput}
        setValue={setLangInput}
        list={formData.langauage}
        addItem={() => addToArray("langauage", langInput, setLangInput)}
        removeItem={(i) => removeFromArray("langauage", i)}
      />

      <DynamicInput
        label="Category"
        value={categoryInput}
        setValue={setCategoryInput}
        list={formData.category}
        addItem={() => addToArray("category", categoryInput, setCategoryInput)}
        removeItem={(i) => removeFromArray("category", i)}
      />

      <DynamicInput
        label="Cast Names"
        value={castInput}
        setValue={setCastInput}
        list={formData.castNames}
        addItem={() => addToArray("castNames", castInput, setCastInput)}
        removeItem={(i) => removeFromArray("castNames", i)}
      />

      <DynamicInput
        label="Theaters"
        value={theaterInput}
        setValue={setTheaterInput}
        list={formData.theaters}
        addItem={() => addToArray("theaters", theaterInput, setTheaterInput)}
        removeItem={(i) => removeFromArray("theaters", i)}
      />

      <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
        Submit
      </button>
    </form>
  </div>
</div>


  );
}

const DynamicInput = ({
  label,
  value,
  setValue,
  list,
  addItem,
  removeItem,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>

    <div className="flex gap-2">
      <input
        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        type="button"
        onClick={addItem}
        className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
      >
        Add
      </button>
    </div>

    <div className="flex flex-wrap gap-2">
      {list.map((item, i) => (
        <span
          key={i}
          className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
        >
          {item}
          <button
            type="button"
            onClick={() => removeItem(i)}
            className="text-red-600 font-bold"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  </div>
);


export default AddMovie;

