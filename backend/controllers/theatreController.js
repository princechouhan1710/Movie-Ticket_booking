let Theatre = require("../models/theatreModel");
let Show = require("../models/showModel");
let createTheatre = async (req, res) => {
    try {
        let image = {
            filename: req.files["image"][0].filename,
            url: process.env.BASEURL + req.files["image"][0].filename
            // url: `${process.env.BASEURL}/uploads/${req.files.image[0].filename}`

        }
        let newtheatre = await Theatre({ ...req.body, image });
        await newtheatre.save();
        res.json({ success: true, message: "theatre Created Successfully", data: newtheatre })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}
let getTheatre = async (req, res) => {
    try {
        let theatres = await Theatre.find({});
        res.status(200).json({ success: true, data: theatres })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}
let updateTheatre = async (req, res) => {
    try {
        let {id}=req.params;
        
        let theatres = await Theatre.findByIdAndUpdate(
            id,
            {"$set":{...req.body}},
            
        );
        if(!updateTheatre){
            return res.status(404).json({success:false,message:"Theatre not found"})
        }
        res.status(200).json({ success: true, data: theatres })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}
let deleteTheatre = async (req, res) => {
    try {
        let {id}=req.params;
         await Theatre.findByIdAndDelete(id);
        
        res.status(200).json({ success: true, message:"Theater detail deleted" })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}
let filterTheatre = async (req, res) => {
    try {
        let { name } = req.params;
        let theatre = await Theatre.findOne({ name })
        if (!theatre) {
            return res.status(400).json({ success: false, message: "Theatre not founnd" })
        }
        let theatres = await Show.find({ theatre: theatre._id  }).populate("movie").populate("theatre");
        res.status(200).json({ success: true, data: theatres })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}
 

module.exports = { createTheatre, getTheatre,updateTheatre ,deleteTheatre,filterTheatre}
