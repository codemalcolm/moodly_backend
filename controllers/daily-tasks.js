const StatusCodes = require("http-status-codes");
const DailyTask = require("../models/DailyTask");
const DayEntry = require("../models/DayEntry");
const { BadRequestError } = require("../errors");

const createDailyTask = async (req, res) => {
  const { name } = req.body;
  const { dayId } = req.params;

  console.log(name, dayId);

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
  const { dailyTaskId, dayId } = req.params;
  const { name, isDone } = req.body;

  if (!dailyTaskId && !dayId) {
    BadRequestError("Day id or task id missing");
  }

  if (!name && !isDone) {
    BadRequestError("Name of daily task missing");
  }

  console.log(req.body);

  const updatedDailyTask = await DailyTask.findByIdAndUpdate(
    { _id : dailyTaskId },
    { ...req.body },
    { runValidators: true, new: true }
  );

  res.status(StatusCodes.OK).json({ updatedDailyTask });
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
