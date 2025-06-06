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

  res.status(StatusCodes.OK).json({
    journalEntries:
      journalEntriesDocuments == null ? [] : journalEntriesDocuments,
  });
};

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

  const dayEntry = await DayEntry.findOne({ dayEntryDate: date })
    .populate({
      path: "journalEntries",
      populate: {
        path: "images",
        model: "SingleImage",
      },
    })
    .populate("dailyTasks")
    .lean();

  if (dayEntry && dayEntry.journalEntries) {

    dayEntry.journalEntries.forEach((journalEntry) => {
      if (journalEntry.images && Array.isArray(journalEntry.images)) {
        journalEntry.images.forEach((image) => {

          if (image.imageData instanceof Buffer) {
            image.base64Image = image.imageData.toString("base64");

            delete image.imageData;
          }

          else if (image.imageData && image.imageData.data && Array.isArray(image.imageData.data)) {
             image.base64Image = Buffer.from(image.imageData.data).toString("base64");
             delete image.imageData; 
          }
        });
      }
    });

    dayEntry.journalEntries.sort((a, b) => {
      const dateA = new Date(a.entryDateAndTime);
      const dateB = new Date(b.entryDateAndTime);

      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;

      return dateB.getTime() - dateA.getTime();
    });
  }

  res.json({ dayEntry });
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

const getDayMoodByDate = async (req, res) => {
  let { date } = req.query;

  date = date.replace(" ", "+");

  const dayEntry = await DayEntry.findOne({ dayEntryDate: date });
  res.status(StatusCodes.OK).json({ dayEntry });
};

module.exports = {
  getDay,
  createDay,
  updateDay,
  getDayByDate,
  getJournalEntries,
  getAllDayEntries,
  getDayMoodByDate,
};
