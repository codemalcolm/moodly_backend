const StatusCodes = require("http-status-codes");
const DailyTask = require("../models/DailyTask");
const DayEntry = require("../models/DayEntry");
const { BadRequestError, NotFoundError } = require("../errors");

const createDailyTask = async (req, res) => {
  const { name } = req.body;
  const { dayId } = req.params;

  if (!name && !dayId) {
    BadRequestError("Name of daily task missing");
  }

  const dailyTask = await DailyTask.create({ ...req.body });

  await DayEntry.findOneAndUpdate(
    { _id: dayId },
    { $push: { dailyTasks: dailyTask._id } },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ dailyTask });
};

const updateDailyTask = async (req, res) => {
  const { dailyTaskId, dayId } = req.params;
  const { name, isDone } = req.body;

  if (!dailyTaskId && !dayId) {
    throw new BadRequestError("Day id or task id missing");
  }

  if (!name && isDone == undefined) {
    throw new BadRequestError("Name of Daily task or isDone field is missing");
  }

  const updatedDailyTask = await DailyTask.findOneAndUpdate(
    { _id: dailyTaskId },
    { ...req.body },
    { runValidators: true, new: true }
  );

  if (!updatedDailyTask) {
    throw new NotFoundError(`Now daily task with that id : ${dailyTaskId}`);
  }

  res.status(StatusCodes.OK).json({ updatedDailyTask });
};

const deleteDailyTask = async (req, res) => {
  const { dayId, dailyTaskId } = req.params;

  const deletedDailyTask = await DailyTask.findOneAndDelete({
    _id: dailyTaskId,
  });

  await DayEntry.findByIdAndUpdate(
    dayId,
    { $pull: { dailyTasks: dailyTaskId } },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ deletedDailyTask });
};

module.exports = {
  createDailyTask,
  updateDailyTask,
  deleteDailyTask,
};
