const express = require("express");
const router = express.Router();
const { register, login, profile, logout,getadmin } = require("../controllers/adminController.js")
const { authAdmin } = require("../middlewares/auth.js")
router.post("/register", register);
router.get("/getadmin", getadmin);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", authAdmin, profile);
module.exports = router;
 
 
 