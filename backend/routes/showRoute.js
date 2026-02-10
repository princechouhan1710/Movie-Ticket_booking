let router = require("express").Router();
let { createShow, getShows, getShow,getAllShow } = require("../controllers/showController.js");
 
router.post("/createshow", createShow);
router.get("/getshow/:movieId", getShows);
// router.get("/getshow/:name", getShow);
router.get("/getallshow", getAllShow);

 
module.exports = router
 