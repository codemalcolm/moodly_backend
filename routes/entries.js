const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const BadRequestError = require("../errors/bad-request.js");

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError(
        "Only image files (jpg, jpeg, png, webp) are allowed!"
      ),
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const {
  createEntry,
  updateEntry,
  deleteEntry,
} = require("../controllers/entries");

const {
  uploadPhoto,
  fetchPhotosFromJournalEntryId,
  deletePhoto,
  uploadMultiplePhotos,
} = require("../controllers/images.js");

router.route("/").post(createEntry);
router
  .route("/:journalEntryId")
  .put(updateEntry)
  .delete(deleteEntry)
  .get(fetchPhotosFromJournalEntryId);
router
  .route("/:journalEntryId/images")
  .post(upload.array("file", 3), uploadMultiplePhotos)
  .delete(deleteEntry);
router.route("/:journalEntryId/images/:imageId").delete(deletePhoto);

module.exports = router;
