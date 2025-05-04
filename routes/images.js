const express = require("express");
const router = express.Router();

// add controllers
const {uploadPhoto} = require("../controllers/images.js")

router.route("/").post(uploadPhoto)


module.exports = router;