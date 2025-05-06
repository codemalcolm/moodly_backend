const express = require("express");
const router = express.Router();

const { getDay, createDay, updateDay, getDayByDate,getJournalEntries } = require("../controllers/days");

router.route("/").post(createDay).get(getDayByDate);
router.route("/:dayId").get(getJournalEntries).put(updateDay);

module.exports = router;
