const StatusCodes = require("http-status-codes");
const DayEntry = require("../models/DayEntry");
const JournalEntry = require("../models/JournalEntry");
const { NotFoundError } = require("../errors");

const getJournalEntries = async (req, res) => {
  const { dayId } = req.params;

  const dayEntry = await DayEntry.findById({ _id: dayId });
  const { journalEntries } = dayEntry;

  const journalEntriesDocuments = (
    await Promise.all(
      journalEntries.map((journalEntryId) =>
        JournalEntry.findById({ _id: journalEntryId })
      )
    )
  ).filter(Boolean);

  console.log(journalEntriesDocuments);

  res.status(StatusCodes.OK).json({
    journalEntries:
      journalEntriesDocuments == null ? [] : journalEntriesDocuments,
  });
};

// FIXME is this even needed if we use date for finding the DayEntry ?
const getDay = async (req, res) => {
  const { dayId } = req.params;
  const dayEntry = await DayEntry.findOne({ _id: dayId }).populate(
    "dailyTasks"
  );

  if (!dayEntry) {
    throw new Error(`Day with id : ${dayId} not found`);
  }

  res.status(StatusCodes.OK).json({ dayEntry });
};

const getDayByDate = async (req, res) => {
  let { date } = req.query;

  date = date.replace(" ", "+");
  console.log(date);

  const dayEntry = await DayEntry.findOne({ dayEntryDate: date })
    .populate({
      path: "journalEntries",
      populate: { path: "images", model: "SingleImage" },
    })
    .populate("dailyTasks");

  if (!dayEntry) {
    throw new NotFoundError(`Day Entry with the date : ${date} not found`);
  }
  console.log(dayEntry);

  res.status(StatusCodes.OK).json({ dayEntry });
};

const createDay = async (req, res) => {
  const { dayEntryDate } = req.body;
  if (!dayEntryDate) throw new Error("dayEntryDate not provided");

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

const getAllDayEntries = async (req, res) => {
  res.json(res.paginatedResults);
};

module.exports = {
  getDay,
  createDay,
  updateDay,
  getDayByDate,
  getJournalEntries,
  getAllDayEntries,
};
