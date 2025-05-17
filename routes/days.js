const express = require("express");
const router = express.Router();

const { getDay, createDay, updateDay, getDayByDate,getJournalEntries } = require("../controllers/days");

router.route("/").post(createDay).get(getDayByDate);
router.route("/:dayId").patch(updateDay);
router.route("/:dayId/entries").get(getJournalEntries);

module.exports = router;
