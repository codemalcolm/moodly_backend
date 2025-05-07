const StatusCodes = require("http-status-codes");
const DayEntry = require("../models/DayEntry");
const JournalEntry = require("../models/JournalEntry");

const getJournalEntries = async (req, res) => {
  const { dayId } = req.params;

  const journalEntries = await JournalEntry.find({dayId : dayId});

  res.status(StatusCodes.OK).json({ journalEntries });
};

// FIXME is this even needed if we use date for finding the DayEntry ?
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

  const dayEntry = await DayEntry.findOne({ dayEntryDate: date });

  res.status(StatusCodes.OK).json({ dayEntry });
};

const createDay = async (req, res) => {
  const { dayEntryDate } = req.body;
  if (!dayEntryDate) throw new Error("entryDate not provided");

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

module.exports = { getDay, createDay, updateDay, getDayByDate, getJournalEntries };
