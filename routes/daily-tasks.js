const express = require("express");
const router = express.Router();

const { createDailyTask,updateDailyTask,deleteDailyTask } = require("../controllers/daily-tasks");

router.route("/").post(createDailyTask);
router.route("/:dailyTaskId").patch(updateDailyTask).delete(deleteDailyTask);

module.exports = router;
