const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  uploadPhoto,
  fetchPhotosFromJournalEntryId,
  deletePhoto
} = require("../controllers/images.js");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.route("/").post(upload.single("file"), uploadPhoto);

router.route("/:journalEntryId").get(fetchPhotosFromJournalEntryId);
router.route("/:imageId").delete(deletePhoto)

module.exports = router;
