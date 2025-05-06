const express = require("express");
const router = express.Router();

const { createEntry, updateEntry, deleteEntry } = require("../controllers/entries");

router.route("/").post(createEntry);
router.route("/:journalEntryId").put(updateEntry).delete(deleteEntry);

module.exports = router;
