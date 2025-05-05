const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadPhoto } = require("../controllers/images.js");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.route("/").post(upload.single("file"), uploadPhoto);

module.exports = router;
