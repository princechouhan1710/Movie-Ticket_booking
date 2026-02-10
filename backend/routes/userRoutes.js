const express = require("express");
const router = express.Router();
const { register, verifyOtp, resendOtp, login, profile ,getUser} = require("../controllers/movieuserController.js")
let { auth } = require("../middlewares/auth.js")
router.post("/register", register);
router.post("/verify-otp", verifyOtp)
router.post("/resend-otp", resendOtp)
router.post("/login", login);
router.get("/profile", auth, profile);
router.get("/getuser", getUser);

module.exports = router

