const StatusCodes = require("http-status-codes");
const DayEntry = require("../models/DayEntry");

const getDay = async (req, res) => {
  const { dayId } = req.params;
  const dayEntry = await DayEntry.findOne({ _id: dayId });

  if (!dayEntry) {
    throw new Error(`Day with id : ${dayId} not found`);
  }

  res.status(StatusCodes.OK).json({ dayEntry });
};

const getDayByDate = async (req, res) => {
  const { date } = req.body;

  const dayEntry = await DayEntry.findOne({ entryDate: date });

  res.status(StatusCodes.OK).json({ dayEntry });
};

const createDay = async (req, res) => {
  const { entryDate } = req.body;
  if (!entryDate) throw new Error("entryDate not provided");

  const dayEntry = await DayEntry.create({ ...req.body });

  res.status(StatusCodes.OK).json({ dayEntry });
};

const updateDay = async (req, res) => {
  const { dayId } = req.params;

  const { mood, dailyTasks, journalEntries } = req.body;

  if (!mood && !dailyTasks && !journalEntries) {
    throw new BadRequestError("No changes made");
  }

  const dayEntry = await DayEntry.findByIdAndUpdate(
    { _id: dayId },
    { ...req.body },
    { runValidators: true, new: true }
  );

  res.status(StatusCodes.OK).json({ dayEntry });
};

module.exports = { getDay, createDay, updateDay, getDayByDate };
