let router = require("express").Router();
let { createTheatre, getTheatre,updateTheatre,deleteTheatre } = require("../controllers/theatreController.js");
const upload = require("../middlewares/upload.js");

router.post("/createtheatre", upload.fields([{ name: "image", maxCount: 1 }]), createTheatre);
router.get("/gettheatres", getTheatre);
router.put("/updatetheatre/:id", updateTheatre);
router.delete("/deletetheatre/:id", deleteTheatre);

module.exports = router
