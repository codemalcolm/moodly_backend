const express = require("express");
const router = express.Router();
const DayEntry = require("../models/DayEntry.js");

const {
  getDay,
  createDay,
  updateDay,
  getDayByDate,
  getJournalEntries,
  getAllDayEntries,
  getDayMoodByDate,
} = require("../controllers/days");
const {
  createDailyTask,
  updateDailyTask,
  deleteDailyTask,
} = require("../controllers/daily-tasks");
const paginatedResults = require("../middleware/paginated-results.js");

router.route("/").post(createDay).get(getDayByDate);
router.route("/mood").get(getDayMoodByDate);
router.route("/all").get(
  paginatedResults(DayEntry, [
    {
      path: "journalEntries",
      populate: {
        path: "images",
        model: "SingleImage", 
      },
    },
  ]),
  getAllDayEntries
);
router.route("/:dayId").patch(updateDay).get(getDay);
router.route("/:dayId/entries").get(getJournalEntries);
router.route("/:dayId/daily-tasks").post(createDailyTask);
router
  .route("/:dayId/daily-tasks/:dailyTaskId")
  .patch(updateDailyTask)
  .delete(deleteDailyTask);

module.exports = router;
