
let Movie = require("../models/movieModel")
let fs = require("fs");
let path = require("path")

let createMovie = async (req, res) => {
  try {
    const posterFile = req.files?.poster?.[0];
    const videoFile = req.files?.video?.[0];

    if (!posterFile || !videoFile) {
      return res.status(400).json({
        success: false,
        message: "Poster and video files are required"
      });
    }

    const poster = {
      filename: posterFile.filename,
      url: process.env.BASEURL + posterFile.filename
    };

    const video = {
      filename: videoFile.filename,
      url: process.env.BASEURL + videoFile.filename
    };

    const newMovie = new Movie({
      ...req.body,
      poster,
      video
    });

    await newMovie.save();

    res.json({
      success: true,
      message: "Movie Created Successfully",
      data: newMovie
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

let getMovies = async (req, res) => {
    try {
        let movies = await Movie.find();
        res.json({ success: true, message: "Movie Get Successfully", data: movies })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

let getMovie = async (req, res) => {
    try {
        let { encodeName } = req.params;
        let movie = await Movie.findOne({ encodeName });
        if (!movie) {
            return res.json({ success: false, message: "Movie not found" })
        }
        res.status(200).json({ success: true, message: "found", data: movie })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
let updateMovies = async (req, res) => {
    let { id } = req.params;
    let movie = await Movie.findByIdAndUpdate(
        id,
        { "$set": { ...req.body } },
    )
    if (!updateMovies) {
        return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Blog Update Successfully", data: movie })
}
let deleteMovies = async (req, res) => {
    try {
        let { id } = req.params;
        let movie = await Movie.findById(id);
        if (!movie) {
            res.status(404).json({ success: false, message: "Movie not found" })
        }
        if (movie.poster.filename) {
            let imgpath = path.resolve(__dirname, "../uploads/" + movie.poster.filename)
            fs.unlinkSync(imgpath);
             console.log("poster deleted",imgpath)
        }
        if (movie.video.filename) {
            let imgpath = path.resolve(__dirname, "../uploads/" + movie.video.filename)
            fs.unlinkSync(imgpath);
            console.log("video deleted",imgpath)
        }
        let deletemovie = await Movie.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Movie Details Deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }

}
let FilterMovie = async (req, res) => {
    try {
        let { key, value } = req.params;
        let movie = await Movie.find({
            [key]: {
                "$in": value
            }
        });
        if (!movie) {
            return res.json({ success: false, message: "Movie not found" })
        }
        res.status(200).json({ success: true, message: "found", data: movie })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
let FilterMovieQuery = async (req, res) => {
    try {
        const { langauage, category } = req.query;

        let filter = [];
        if (langauage != "null" && langauage) {
            filter.push({ langauage: { $in: langauage.split(",").map(l => new RegExp(`^${l}$`, "i")) } })
            // {langauage:[hindi,english]}
        }

        if (category != "null" && category) {
            filter.push({ category: { $in: category.split(",").map(l => new RegExp(`^${l}$`, "i")) } })

        }

        const movies = await Movie.find({
            "$and": [...filter]
        });
        res.status(200).json({ success: true, message: "filter", data: movies, });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

let getlanguage = async (req, res) => {
    try {
        let movies = await Movie.find().distinct("langauage");
        res.json({ success: true, message: "Movie Get Successfully", data: movies })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

let getcategory = async (req, res) => {
    try {
        let movies = await Movie.find().distinct("category");
        res.json({ success: true, message: "Movie Get Successfully", data: movies })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
module.exports = { createMovie, getMovies, getMovie, updateMovies, deleteMovies, FilterMovie, FilterMovieQuery, getlanguage, getcategory }
