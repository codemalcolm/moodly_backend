const express = require("express");
const router = express.Router();

const { getDay, createDay, updateDay, getDayByDate,getJournalEntries } = require("../controllers/days");
const { createDailyTask,updateDailyTask,deleteDailyTask } = require("../controllers/daily-tasks");

router.route("/").post(createDay).get(getDayByDate);
router.route("/:dayId").patch(updateDay);
router.route("/:dayId/entries").get(getJournalEntries);
router.route("/:dayId/daily-tasks").post(createDailyTask);
router.route("/:dayId/daily-tasks/:dailyTaskId").patch(updateDailyTask);

module.exports = router;
