const StatusCodes = require("http-status-codes");
const DailyTask = require("../models/DailyTask");
const DayEntry = require("../models/DayEntry")
const { BadRequestError } = require("../errors");

const createDailyTask = async (req, res) => {
  const { name } = req.body;
  const { dayId } = req.params;

  if (!name && !dayId) {
    BadRequestError("Name of daily task missing");
  }

  const dailyTask = await DailyTask.create({ ...req.body });

  const updatedDayEntry = await DayEntry.findOneAndUpdate(
    { _id: dayId },
    { $push: { dailyTasks: dailyTask._id } },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ updatedDayEntry });
};

const updateDailyTask = async (req, res) => {
  const { dailyTaskId } = req.params;
  const { name, isDone } = req.body;
  res.send(dailyTaskId);
};
const deleteDailyTask = async (req, res) => {
  const { dailyTaskId } = req.params;
  res.send(dailyTaskId);
};

module.exports = {
  createDailyTask,
  updateDailyTask,
  deleteDailyTask,
};
