const express = require("express");
const router = express.Router();

const { getEntries, createEntry, updateEntry, deleteEntry } = require("../controllers/entries");

router.route("/").get(getEntries).post(createEntry);
router.route("/:journalEntryId").put(updateEntry).delete(deleteEntry);

module.exports = router;
